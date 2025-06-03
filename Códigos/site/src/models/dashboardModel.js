var database = require("../database/config")

function buscarUltimasMedidasUTI() {

    var instrucaoSql = `SELECT nomeSetor, umidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM umidade
                            JOIN sensorDHT11
                                ON umidade.fksensorDHT11_idumidade = sensorDHT11.idSensor
							JOIN setor
								ON sensorDHT11.fksetor_sensorDHT11 = setor.idSetor
							WHERE dtRegistro >= CURDATE() - INTERVAL 100 DAY AND nomeSetor = 'UTI' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro LIMIT 6;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasUnidadeDeQueimadas() {

    var instrucaoSql = `SELECT nomeSetor, umidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM umidade
                            JOIN sensorDHT11
                                ON umidade.fksensorDHT11_idumidade = sensorDHT11.idSensor
							JOIN setor
								ON sensorDHT11.fksetor_sensorDHT11 = setor.idSetor
							WHERE dtRegistro >= CURDATE() - INTERVAL 100 DAY AND nomeSetor = 'Unidades de Queimados' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro LIMIT 6;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasNeoNatal() {

    var instrucaoSql = `SELECT nomeSetor, umidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM umidade
                            JOIN sensorDHT11
                                ON umidade.fksensorDHT11_idumidade = sensorDHT11.idSensor
							JOIN setor
								ON sensorDHT11.fksetor_sensorDHT11 = setor.idSetor
							WHERE dtRegistro >= CURDATE() - INTERVAL 100 DAY AND nomeSetor = 'NeoNatal' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro LIMIT 6;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasCentroCirurgico() {

    var instrucaoSql = `SELECT nomeSetor, umidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM umidade
                            JOIN sensorDHT11
                                ON umidade.fksensorDHT11_idumidade = sensorDHT11.idSensor
							JOIN setor
								ON sensorDHT11.fksetor_sensorDHT11 = setor.idSetor
							WHERE dtRegistro >= CURDATE() - INTERVAL 100 DAY AND nomeSetor = 'Centro Cirurgico' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro LIMIT 6;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidasUTI,
    buscarUltimasMedidasUnidadeDeQueimadas,
    buscarUltimasMedidasNeoNatal,
    buscarUltimasMedidasCentroCirurgico
}