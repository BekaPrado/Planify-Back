create database db_planify;

use db_planify;

CREATE TABLE tbl_usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    data_nascimento DATE NOT NULL,
    foto_perfil VARCHAR(500),
    palavra_chave VARCHAR(15) NOT NULL
);

CREATE TABLE tbl_categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE tbl_estado (
    id_estado INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tbl_evento (
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    descricao TEXT,
    data_evento DATE NOT NULL,
    horario TIME NOT NULL,
    local VARCHAR(70) NOT NULL,
    imagem VARCHAR(500),
    limite_participante DECIMAL(10,2),
    valor_ingresso DECIMAL(10,2),
    id_usuario INT NOT NULL,
    id_estado INT NOT NULL,
    CONSTRAINT fk_usuario_evento
        FOREIGN KEY (id_usuario)
        REFERENCES tbl_usuario(id_usuario)
        ON DELETE CASCADE,
    CONSTRAINT fk_estado_evento
        FOREIGN KEY (id_estado)
        REFERENCES tbl_estado(id_estado)
        ON DELETE CASCADE
);



CREATE TABLE tbl_evento_categoria (
    id_evento_categoria INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    id_evento INT NOT NULL,
    CONSTRAINT fk_evento_categoria_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES tbl_categoria(id_categoria)
        ON DELETE CASCADE,
    CONSTRAINT fk_evento_categoria_evento
        FOREIGN KEY (id_evento)
        REFERENCES tbl_evento(id_evento)
        ON DELETE CASCADE
);

CREATE TABLE tbl_participar_evento (
    id_participar_evento INT NOT NULL PRIMARY KEY auto_increment,
    id_evento INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT fk_participar_evento_evento FOREIGN KEY (id_evento)
        REFERENCES tbl_evento(id_evento),
    CONSTRAINT fk_participar_evento_usuario FOREIGN KEY (id_usuario)
        REFERENCES tbl_usuario(id_usuario)
);
CREATE TABLE tbl_codigo_recuperacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    expiracao DATETIME NOT NULL
);