CREATE DATABASE humisafe;
USE humisafe;

CREATE TABLE Hospital(
idHospital INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(45) NOT NULL,
nomeFantasia VARCHAR(45) NOT NULL,
cnpj CHAR(14) NOT NULL,
dtCadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
email VARCHAR(45) NOT NULL,
-- Confirmando se o email possui @, mas sem verificar o domínio pois cada empresa pode ter seu próprio domínio
CONSTRAINT checkEmail CHECK(email LIKE '%@%'),
senha VARCHAR(30) NOT NULL,
telefone CHAR(11) NOT NULL
);

-- CREATE TABLE Usuario(
-- idUsuario INT PRIMARY KEY AUTO_INCREMENT,
-- nome VARCHAR(45) NOT NULL,
-- senha VARCHAR(45) NOT NULL,
-- email VARCHAR(45) NOT NULL,
-- CONSTRAINT checkEmail CHECK(email LIKE '%@%'),
-- telefone VARCHAR(14) NOT NULL,
-- dtCadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- fkEmpresa INT,
-- CONSTRAINT fkUsuario_Empresa FOREIGN KEY (fkEmpresa) REFERENCES Hospital(idHospital),
-- CONSTRAINT pk_composta PRIMARY KEY (idUsuario, fkEmpresa)
-- );

CREATE TABLE Endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
tipoLogradouro VARCHAR(45) NOT NULL,
logradouro VARCHAR(45),
numLogradouro INT NOT NULL,
bairro VARCHAR(45) NOT NULL,
cidade VARCHAR(45) NOT NULL,
uf CHAR(2) NOT NULL,
cep CHAR(8) NOT NULL,
fkHospital INT UNIQUE,
CONSTRAINT fkEnderecoHospital FOREIGN KEY (fkHospital)
REFERENCES Hospital (idHospital)
);

CREATE TABLE Setor(
idSetor INT PRIMARY KEY AUTO_INCREMENT,
nomeSetor VARCHAR(45) NOT NULL,
qtdPacienteSetor INT NOT NULL,
qtdFuncionarioSetor INT NOT NULL,
CONSTRAINT chkSetor CHECK(nomeSetor IN ('UTI', 'Centro Cirurgico', 'Pronto socorro', 'Unidades de Queimados', 'NeoNatal', 'Oncologia')),
dtInstalacao  DATETIME NOT NULL,
fkHospital INT,
CONSTRAINT fkHospitalSetor FOREIGN KEY (fkHospital)
REFERENCES Hospital (idHospital)
);

CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
numSerie VARCHAR(100) UNIQUE NOT NULL,
statusSensor VARCHAR(10) NOT NULL DEFAULT "Inativo",
CONSTRAINT checkStatusSensor CHECK(statusSensor IN("Ativo","Inativo","Manutencao")),
dtInstalacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
dtManutencao DATETIME,
fkSetor INT,
CONSTRAINT fkSetorSensor FOREIGN KEY (fkSetor)
REFERENCES Setor (idSetor)
);

CREATE TABLE Registro(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
registroUmidade DECIMAL(4,2) NOT NULL,
dtRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
fkSensor INT,
CONSTRAINT fkSensorRegistro FOREIGN KEY (fkSensor)
REFERENCES Sensor (idSensor)
);

INSERT INTO Hospital (razaoSocial, nomeFantasia, cnpj, email, senha, telefone) VALUES
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

INSERT INTO Endereco (tipoLogradouro, logradouro, numLogradouro, bairro, cidade, uf, cep, fkHospital) VALUES
('Rua', 'das Palmeiras', 123, 'Centro', 'São Paulo', 'SP', '01001000', 1),
('Av.', 'Brasil', 456, 'Copacabana', 'Rio de Janeiro', 'RJ', '22041001', 2),
('Rua', 'da Saúde', 789, 'Savassi', 'Belo Horizonte', 'MG', '30140120', 3),
('Rua', 'das Acácias', 321, 'Água Verde', 'Curitiba', 'PR', '80240010', 4),
('Av.', 'das Flores', 654, 'Menino Deus', 'Porto Alegre', 'RS', '90150000', 5),
('Rua', 'do Sol', 987, 'Centro', 'São Paulo', 'SP', '01002000', 6),
('Rua', 'Esperança', 159, 'Boa Vista', 'Recife', 'PE', '50060900', 7),
('Av.', 'Horizonte Azul', 753, 'Cidade Nova', 'Belo Horizonte', 'MG', '31170110', 8),
('Rua', 'Nova Era', 258, 'Centro', 'Joinville', 'SC', '89201010', 9),
('Rua', 'Renascença', 147, 'Jardins', 'Aracaju', 'SE', '49010000', 10);

INSERT INTO Setor (nomeSetor, qtdPacienteSetor, qtdFuncionarioSetor, dtInstalacao, fkHospital) VALUES
('UTI', 12, 25, '2024-01-15 08:00:00', 1),
('Centro Cirurgico', 8, 20, '2023-12-10 09:30:00', 2),
('Pronto socorro', 20, 18, '2024-02-01 07:45:00', 3),
('Unidades de Queimados', 6, 12, '2024-03-12 10:00:00', 4),
('NeoNatal', 10, 15, '2024-01-20 06:30:00', 5),
('Oncologia', 14, 22, '2024-02-18 11:00:00', 6),
('Centro Cirurgico', 7, 19, '2024-03-25 08:30:00', 7),
('UTI', 11, 23, '2024-01-08 07:15:00', 8),
('NeoNatal', 9, 14, '2024-02-27 10:45:00', 9),
('Pronto socorro', 18, 21, '2024-03-05 09:00:00', 10);


INSERT INTO Sensor (numSerie, dtInstalacao, statusSensor, dtManutencao, fkSetor) VALUES
('DHT11-SN-0001', '2023-03-15 09:00:00', 'Ativo', '2024-12-01 08:30:00', 1),
('DHT11-SN-0002', '2023-04-20 10:00:00', 'Inativo', '2025-01-05 10:00:00', 2),
('DHT11-SN-0003', '2023-01-25 14:00:00', 'Manutencao', '2025-02-20 09:30:00', 3),
('DHT11-SN-0004', '2023-05-10 11:30:00', 'Ativo', '2024-11-15 07:45:00', 4),
('DHT11-SN-0005', '2023-06-01 13:00:00', 'Ativo', '2025-03-01 08:00:00', 5),
('DHT11-SN-0006', '2023-07-12 12:45:00', 'Inativo', '2025-01-20 09:15:00', 6),
('DHT11-SN-0007', '2023-06-25 08:30:00', 'Ativo', '2025-02-01 10:30:00', 7),
('DHT11-SN-0008', '2023-08-08 10:00:00', 'Manutencao', '2025-03-10 07:00:00', 8),
('DHT11-SN-0009', '2023-09-01 09:45:00', 'Inativo', '2025-01-10 11:00:00', 9),
('DHT11-SN-0010', '2023-10-10 13:15:00', 'Ativo', '2025-04-01 08:00:00', 10);


INSERT INTO Registro (registroUmidade, dtRegistro, fkSensor) VALUES
(45.75, '2025-06-04 08:00:00', 1),  -- dentro da faixa ideal
(37.40, '2025-06-04 08:05:00', 2),  -- abaixo
(62.10, '2025-06-04 08:10:00', 3),  -- acima
(55.00, '2025-06-04 08:15:00', 4),  -- dentro da faixa ideal
(29.90, '2025-06-04 08:20:00', 5),  -- abaixo
(66.80, '2025-06-05 08:25:00', 6),  -- acima
(50.25, '2025-06-05 08:30:00', 7),  -- dentro da faixa ideal
(39.95, '2025-06-05 08:35:00', 8),  -- abaixo
(60.05, '2025-06-05 08:40:00', 9),  -- acima
(42.60, '2025-06-05 08:45:00', 10); -- dentro da faixa ideal

INSERT INTO Registro (registroUmidade, dtRegistro, fkSensor) VALUES
(39.95, '2025-06-06 08:35:00', 8),  -- abaixo
(60.05, '2025-06-06 08:40:00', 9),  -- acima
(42.60, '2025-06-06 08:45:00', 10); -- dentro da faixa ideal