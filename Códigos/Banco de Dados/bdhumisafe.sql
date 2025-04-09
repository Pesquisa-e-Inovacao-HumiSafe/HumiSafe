-- GRUPO 3 - HUMISAFE - BEATRIZ RIBEIRO, ISMAEL WECSLEY, KEVIN SILVA, MARCOS HIDEYUKI, PAULO CESAR E PAULO JÚNIOR.

create database humisafe;

use humisafe;

CREATE TABLE cliente(
idCliente INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(45) NOT NULL,
nomeFantasia VARCHAR(45) NOT NULL,
cnpj CHAR(14) NOT NULL,
dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
email VARCHAR(45) NOT NULL, -- Confirmando se o email possui @, mas sem verificar o domínio pois cada empresa pode ter seu próprio domínio
CONSTRAINT checkEmail CHECK(email LIKE '%@%'),
senha VARCHAR(45) NOT NULL,
telefone VARCHAR(14) NOT NULL
);

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(45) NOT NULL,
numEndereco INT NOT NULL,
bairro VARCHAR(45) NOT NULL,
cidade VARCHAR(45) NOT NULL,
uf CHAR(2) NOT NULL,
cep CHAR(8) NOT NULL,
fkcliente_endereco INT,
CONSTRAINT fkcliente_endereco FOREIGN KEY (fkcliente_endereco)
REFERENCES cliente (idCliente)
);

CREATE TABLE setor(
idSetor INT PRIMARY KEY AUTO_INCREMENT,
nomeSetor VARCHAR(45),
numSetor CHAR(4),
qtdPacienteSetor INT,
qtdFuncionarioSetor INT,
CONSTRAINT chkSetor CHECK(nomeSetor IN ('UTI', 'Centro Cirurgico', 'Pronto socorro', 'Unidades de Queimados', 'NeoNatal', 'Oncologia')),
dtInstalacao  DATETIME,
fkcliente_setor INT,
CONSTRAINT fkcliente_setor FOREIGN KEY (fkcliente_setor)
REFERENCES cliente (idCliente)
);

CREATE TABLE sensorDHT11(
idSensor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
numSerie VARCHAR(100) UNIQUE NOT NULL,
dtFabricacao  DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
dtCompra DATETIME NOT NULL,
statusManutencao VARCHAR(10) DEFAULT "Inativo" NOT NULL,
CONSTRAINT checkManutencao CHECK(statusManutencao IN("Ativo","Inativo","Manutencao")),
dtManutencao DATETIME NOT NULL,
fkcliente_sensor INT,
CONSTRAINT fkcliente_sensor FOREIGN KEY (fkcliente_sensor)
REFERENCES cliente (idCliente)
);

CREATE TABLE umidade(
idUmidade INT PRIMARY KEY AUTO_INCREMENT,
umidade FLOAT(4,2) NOT NULL,
dtRegistro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fksensorDHT11_idsensor INT,
CONSTRAINT fksensorDHT11_idsensor FOREIGN KEY (fksensorDHT11_idsensor)
REFERENCES sensorDHT11 (idSensor)
);

INSERT INTO cliente (razaoSocial, nomeFantasia, cnpj, email, senha, telefone) VALUES
('Hospital Vida e Saúde Ltda', 'Vida e Saúde', '12345678000190', 'contato@vidaesaude.com', 'senha123', '11999998888'),
('Centro Médico São Lucas S.A.', 'São Lucas', '23456789000101', 'sac@saolucasmed.com', 'lucas2024', '21988887777'),
('Clínica Bem Estar ME', 'Bem Estar', '34567890000112', 'atendimento@bemestar.com', 'bem123estar', '31977776666'),
('Instituto Cuidar da Vida Ltda', 'Cuidar da Vida', '45678901000123', 'info@cuidardavida.org', 'cuidar456', '41966665555'),
('Hospital Santa Clara S.A.', 'Santa Clara', '56789012000134', 'contato@santaclara.med', 'santaclara@1', '51955554444'),
('Clínica Reviver Ltda', 'Reviver Saúde', '67890123000145', 'reviver@clinicareviver.com', 'reviver2025', '11944443333'),
('Hospital Esperança ME', 'Esperança', '78901234000156', 'contato@esperanca.com.br', 'esperanca01', '21933332222'),
('Centro Médico Horizonte Ltda', 'Horizonte', '89012345000167', 'horizonte@medhorizonte.net', 'horizonte99', '31922221111'),
('Instituto Novo Ser S.A.', 'Novo Ser', '90123456000178', 'faleconosco@novoser.org', 'novoser2025', '41911110000'),
('Clínica Renova ME', 'Renova', '01234567000189', 'renova@clinicarenova.com', 'renova@321', '51900009999');

INSERT INTO endereco (rua, numEndereco, bairro, cidade, uf, cep, fkcliente_endereco) VALUES
('Rua das Palmeiras', 123, 'Centro', 'São Paulo', 'SP', '01001000', 1),
('Av. Brasil', 456, 'Copacabana', 'Rio de Janeiro', 'RJ', '22041001', 2),
('Rua da Saúde', 789, 'Savassi', 'Belo Horizonte', 'MG', '30140120', 3),
('Rua das Acácias', 321, 'Água Verde', 'Curitiba', 'PR', '80240010', 4),
('Av. das Flores', 654, 'Menino Deus', 'Porto Alegre', 'RS', '90150000', 5),
('Rua do Sol', 987, 'Centro', 'São Paulo', 'SP', '01002000', 6),
('Rua Esperança', 159, 'Boa Vista', 'Recife', 'PE', '50060900', 7),
('Av. Horizonte Azul', 753, 'Cidade Nova', 'Belo Horizonte', 'MG', '31170110', 8),
('Rua Nova Era', 258, 'Centro', 'Joinville', 'SC', '89201010', 9),
('Rua Renascença', 147, 'Jardins', 'Aracaju', 'SE', '49010000', 10);

INSERT INTO setor (nomeSetor, numSetor, qtdPacienteSetor, qtdFuncionarioSetor, dtInstalacao, fkcliente_setor) VALUES
('UTI', '0001', 12, 25, '2024-01-15 08:00:00', 1),
('Centro Cirurgico', '0002', 8, 20, '2023-12-10 09:30:00', 2),
('Pronto socorro', '0003', 20, 18, '2024-02-01 07:45:00', 3),
('Unidades de Queimados', '0004', 6, 12, '2024-03-12 10:00:00', 4),
('NeoNatal', '0005', 10, 15, '2024-01-20 06:30:00', 5),
('Oncologia', '0006', 14, 22, '2024-02-18 11:00:00', 6),
('Centro Cirurgico', '0007', 7, 19, '2024-03-25 08:30:00', 7),
('UTI', '0008', 11, 23, '2024-01-08 07:15:00', 8),
('NeoNatal', '0009', 9, 14, '2024-02-27 10:45:00', 9),
('Pronto socorro', '0010', 18, 21, '2024-03-05 09:00:00', 10);

INSERT INTO sensorDHT11 (numSerie, dtFabricacao, dtCompra, statusManutencao, dtManutencao, fkcliente_sensor) VALUES
('DHT11-SN-0001', '2023-01-10 10:00:00', '2023-03-15 09:00:00', 'Ativo', '2024-12-01 08:30:00', 1),
('DHT11-SN-0002', '2023-02-12 11:00:00', '2023-04-20 10:00:00', 'Inativo', '2025-01-05 10:00:00', 2),
('DHT11-SN-0003', '2022-12-01 08:00:00', '2023-01-25 14:00:00', 'Manutencao', '2025-02-20 09:30:00', 3),
('DHT11-SN-0004', '2023-03-05 09:30:00', '2023-05-10 11:30:00', 'Ativo', '2024-11-15 07:45:00', 4),
('DHT11-SN-0005', '2023-01-20 12:00:00', '2023-06-01 13:00:00', 'Ativo', '2025-03-01 08:00:00', 5),
('DHT11-SN-0006', '2023-04-18 15:30:00', '2023-07-12 12:45:00', 'Inativo', '2025-01-20 09:15:00', 6),
('DHT11-SN-0007', '2023-02-28 14:00:00', '2023-06-25 08:30:00', 'Ativo', '2025-02-01 10:30:00', 7),
('DHT11-SN-0008', '2023-03-10 10:30:00', '2023-08-08 10:00:00', 'Manutencao', '2025-03-10 07:00:00', 8),
('DHT11-SN-0009', '2023-05-01 09:00:00', '2023-09-01 09:45:00', 'Inativo', '2025-01-10 11:00:00', 9),
('DHT11-SN-0010', '2023-06-15 11:45:00', '2023-10-10 13:15:00', 'Ativo', '2025-04-01 08:00:00', 10);

INSERT INTO umidade (umidade, dtRegistro, fksensorDHT11_idsensor) VALUES
(45.75, '2025-04-09 08:00:00', 1),  -- dentro da faixa ideal
(37.40, '2025-04-09 08:05:00', 2),  -- abaixo
(62.10, '2025-04-09 08:10:00', 3),  -- acima
(55.00, '2025-04-09 08:15:00', 4),  -- dentro da faixa ideal
(29.90, '2025-04-09 08:20:00', 5),  -- abaixo
(66.80, '2025-04-09 08:25:00', 6),  -- acima
(50.25, '2025-04-09 08:30:00', 7),  -- dentro da faixa ideal
(39.95, '2025-04-09 08:35:00', 8),  -- abaixo
(60.05, '2025-04-09 08:40:00', 9),  -- acima
(42.60, '2025-04-09 08:45:00', 10); -- dentro da faixa ideal

    
SELECT
idCliente AS "Número de identificação da Empresa",
razaoSocial AS "Nome da Empresa",
nomeFantasia AS "Nome Fantasia",
cnpj AS "CNPJ",
dtCadastro AS "Data de Cadastro",
email AS "E-Mail",
senha AS "Senha",
CONCAT("+", telefone) AS "Telefone (XXYYZZZZZZZZZ)" FROM Cliente;

SELECT * FROM umidade WHERE umidade >40 AND umidade <60;

SELECT 
idSensor AS 'Identificação do Sensor',
numSerie AS 'Número de série',
dtFabricacao AS 'Data de Fabricação do Sensor', 
dtCompra AS 'Data de compra', 
dtManutencao AS 'Data de manutenção do Sensor',
statusManutencao AS "Status do Sensor" FROM sensorDHT11;

SELECT
idSetor AS 'Identificação do Setor',
nomeSetor AS 'Nome do Setor',
numSetor AS 'Número do Setor',
qtdPacienteSetor AS 'Quantidade de Pacientes no Setor',
qtdFuncionarioSetor AS 'Quantidade de Funcionários no Setor' FROM setor;

SELECT 
idUmidade as "Identificação",
CONCAT(umidade,'%') AS 'Umidade',
CASE WHEN umidade > 60 OR umidade < 40 
THEN "ALERTA" 
ELSE "Valor Ideal" END AS Controle,
dtRegistro AS 'Data de Registro' FROM umidade;

SELECT * FROM umidade WHERE umidade > 60 OR umidade < 40;

UPDATE sensorDHT11 SET statusManutencao = "Ativo" WHERE idSensor = 9;

SELECT c.idCliente, c.nomeFantasia, c.email,
	e.rua, e.numEndereco, e.bairro, e.cidade, e.uf,
    u.umidade, u.dtRegistro
FROM cliente c JOIN endereco e ON c.idCliente = e.fkcliente_endereco
JOIN sensorDHT11 s ON c.idCliente = s.fkcliente_sensor
JOIN umidade u ON s.idSensor = u.fksensorDHT11_idsensor WHERE u.umidade < 40 OR u.umidade > 60;
