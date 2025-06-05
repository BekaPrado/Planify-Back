const nodemailer = require('nodemailer');
require('dotenv').config();

async function enviarEmailTeste() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"Planify 👋" <${process.env.EMAIL_USER}>`,
      to: "seu-email-pessoal@gmail.com", // coloque aqui seu e-mail real para testar
      subject: "Teste de Recuperação",
      text: "Esse é um teste de envio com nodemailer!"
    });

    console.log("✅ E-mail enviado com sucesso:", info.response);
  } catch (error) {
    console.error("❌ Erro ao enviar:", error);
  }
}

enviarEmailTeste();
