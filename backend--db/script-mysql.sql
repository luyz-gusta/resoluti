create database resoluti_db;

use resoluti_db;

create table tbl_usuario(
	id int not null auto_increment primary key,
    username varchar(80) not null,
    email varchar(255) not null,
    telefone varchar(15) not null,
    senha varchar(255) not null,
    imagem varchar(255) not null,
    
    unique index(id)
);

create table tbl_pessoa(
	id int not null auto_increment primary key,
    nome varchar(50) not null,
    sobrenome varchar(50) not null,
    data_nascimento date not null,
    email varchar(255) not null,
    cpf varchar(15) not null,
    rg varchar(14) not null,
    id_usuario int not null,
    
    constraint FK_Usuario_Pessoa
    foreign key (id_usuario)
    references tbl_usuario(id),
    
    unique index(id)
);

create table tbl_enderecos(
	id int not null auto_increment primary key,
	logradouro varchar(80) not null,
    numero int not null,
    cep varchar(10) not null,
    complemento varchar(80) not null,
    cidade varchar(50) not null,
    estado varchar(3) not null,
    id_pessoa int not null,
    
    constraint FK_Pessoa_Endereco
    foreign key (id_pessoa)
    references tbl_pessoa(id),
    
    unique index(id)
);

create table tbl_tipo_contato(
	id int not null auto_increment primary key,
	tipo varchar(50) not null,
    
    unique index(id)
);

create table tbl_contatos(
	id int not null auto_increment primary key,
	nome varchar(50) not null,
    contato varchar(255) not null,
	id_tipo_contato int not null,
	id_pessoa int not null,
    
    constraint FK_Pessoa_Contatos
    foreign key (id_pessoa)
    references tbl_pessoa(id),
    
    constraint FK_TipoContato_Contato
    foreign key (id_tipo_contato)
    references tbl_tipo_contato(id),
    
    unique index(id)
);

insert into tbl_tipo_contato(tipo) values ('Email'), ('Telefone');
insert into tbl_usuario(
	username, 
	email, 
	telefone, 
	senha, 
	imagem
) values (
	'root', 
	'root@resoluti.com', 
	'11921574171', 
	'Senha123@', 
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsutLBIwca81hF6M2V0jIufR1DFmnNRpu0CjhAHL6eIA&s'
);

insert into tbl_pessoa(
	nome, 
	sobrenome, 
	data_nascimento, 
	email,
    cpf,
	rg, 
	id_usuario
)values(
	'Luiz Gustavo',
    'Silva',
    '2006-02-15',
    'luizgustavo.sp2022@gmail.com',
    '20381587406', #ficticio
    '655503245', #ficticio
    1
);

insert into tbl_contatos(
	nome,
    contato,
    id_tipo_contato,
    id_pessoa
)values(
	'Jorge Costa',
    'jorgecosta@gmail.com',
    1,
    1
);

insert into tbl_enderecos(
	logradouro,
    numero,
    cep,
    complemento,
    cidade,
    estado,
    id_pessoa
)values(
	'Praça da Sé',
	777,
	01001000,
    'Casa',
    'São Paulo',
    'SP',
    1
);

DELIMITER //

CREATE TRIGGER trgPessoa_Enderecos_Contatos
BEFORE DELETE ON tbl_pessoa
FOR EACH ROW
BEGIN

    -- Exclua os registros correspondentes na tbl_enderecos
    DELETE FROM tbl_enderecos
    WHERE id_pessoa = OLD.id;
    
    -- Exclua os registros correspondentes na tbl_contatos
    DELETE FROM tbl_contatos
    WHERE id_pessoa = OLD.id;

END;
//

DELIMITER ;




