var database = require("../database/config")

function buscarUltimasMedidas(idSensor) {

    var instrucaoSql = `SELECT umidade, DATE_FORMAT(dtRegistro,'%H:%i:%s') as 'data Formatada' FROM umidade
                            JOIN sensorDHT11
                                ON umidade.fksensorDHT11_idumidade = sensorDHT11.${idSensor} 
                                ORDER BY dtRegistro LIMIT 3`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fk_sensorDHT11_idumidade) {

    var instrucaoSql = `SELECT umidade, dtRegistro, DATE_FORMAT(dtRegistro,'%H:%i:%s') as momento_grafico, fk_sensorDHT11_idumidade 
                            FROM medida WHERE idSensor = ${idSensor} 
                            ORDER BY idUmidade DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}