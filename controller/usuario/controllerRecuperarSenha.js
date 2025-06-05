require('dotenv').config(); // <- ESSENCIAL!

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const DAOUser = require('../../model/DAO/usuarioDAO.js');
const DAOCodigo = require('../../model/DAO/codigoRecuperaçãoDAO.js');


console.log('Email do .env:', process.env.EMAIL_USER);

exports.enviarCodigo = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email é obrigatório.' });

  const usuario = await DAOUser.selectUsuarioByEmail(email);
  if (!usuario || usuario.length === 0) {
    return res.status(404).json({ message: 'Usuário não encontrado com esse e-mail.' });
  }

  const codigo = crypto.randomInt(100000, 999999).toString();
  const expiracao = new Date(Date.now() + 10 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  const salvar = await DAOCodigo.inserirCodigo(email, codigo, expiracao);
  if (!salvar) return res.status(500).json({ message: 'Erro ao salvar código.' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: 'Planify <noreply@planify.com>',
    to: email,
    subject: 'Código de Recuperação de Senha',
    text: `Seu código de verificação é: ${codigo}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Código enviado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar e-mail.' });
  }
};

exports.validarCodigo = async (req, res) => {
  const { email, codigo } = req.body;

  const codigoValido = await DAOCodigo.buscarCodigoValido(email, codigo);
  if (!codigoValido) {
    return res.status(401).json({ message: 'Código inválido ou expirado.' });
  }

  const usuario = await DAOUser.selectUsuarioByEmail(email);
  if (!usuario || usuario.length === 0) {
    return res.status(404).json({ message: 'Usuário não encontrado com esse e-mail.' });
  }

  await DAOCodigo.excluirCodigo(email);

  // 🔽 ADICIONE ESSE LOG AQUI ANTES DO RETORNO:
  console.log('Usuário encontrado:', usuario[0]);

  res.status(200).json({
    message: 'Código validado com sucesso.',
    id_usuario: usuario[0].id_usuario
  });
};
