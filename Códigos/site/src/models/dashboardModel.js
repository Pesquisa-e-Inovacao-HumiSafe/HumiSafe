var database = require("../database/config")

function buscarUltimasMedidasUTI() {

    var instrucaoSql = `SELECT nomeSetor, registroUmidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM Registro
                            JOIN sensorDHT11
                                ON Registro.fksensorDHT11_idumidade = sensorDHT11.idSensor
							JOIN setor
								ON sensorDHT11.fksetor_sensorDHT11 = setor.idSetor
							WHERE dtRegistro >= CURDATE() - INTERVAL 100 DAY AND nomeSetor = 'UTI' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro LIMIT 6;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasUnidadeDeQueimadas() {

    var instrucaoSql = `SELECT nomeSetor, registroUmidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM Registro
                            JOIN sensorDHT11
                                ON Registro.fksensorDHT11_idumidade = sensorDHT11.idSensor
							JOIN setor
								ON sensorDHT11.fksetor_sensorDHT11 = setor.idSetor
							WHERE dtRegistro >= CURDATE() - INTERVAL 100 DAY AND nomeSetor = 'Unidades de Queimados' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro LIMIT 6;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasNeoNatal() {

    var instrucaoSql = `SELECT nomeSetor, registroUmidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM Registro
                            JOIN sensorDHT11
                                ON Registro.fksensorDHT11_idumidade = sensorDHT11.idSensor
							JOIN setor
								ON sensorDHT11.fksetor_sensorDHT11 = setor.idSetor
							WHERE dtRegistro >= CURDATE() - INTERVAL 100 DAY AND nomeSetor = 'NeoNatal' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro LIMIT 6;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasCentroCirurgico() {

    var instrucaoSql = `SELECT nomeSetor, registroUmidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM Registro
                            JOIN sensorDHT11
                                ON Registro.fksensorDHT11_idumidade = sensorDHT11.idSensor
							JOIN setor
								ON sensorDHT11.fksetor_sensorDHT11 = setor.idSetor
							WHERE dtRegistro >= CURDATE() - INTERVAL 100 DAY AND nomeSetor = 'Centro Cirurgico' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro LIMIT 6;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarQuantAlertas() {

    var instrucaoSql = `SELECT COUNT(registroUmidade) AS 'Quantidade' FROM Registro
                        WHERE (registroUmidade > 60 OR registroUmidade < 40) AND DATE(dtRegistro) = CURDATE();`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function topSetoresMaisAlertas() {

    var instrucaoSql = `SELECT s.nomeSetor, COUNT(u.idUmidade) AS qtd_alertas,
                        MAX(TIME(u.dtRegistro)) AS ultimo_horario FROM Registro u
                        JOIN sensorDHT11 sen ON u.fksensorDHT11_idumidade = sen.idSensor
                        JOIN setor s ON sen.fksetor_sensorDHT11 = s.idSetor
                        WHERE u.dtRegistro >= CURDATE() -- registros de hoje
                          AND (u.umidade < 40 OR u.umidade > 60)
                        GROUP BY s.idSetor
                        ORDER BY qtd_alertas DESC
                        LIMIT 3;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function regiaoForaFaixa() {

    var instrucaoSql = `SELECT s.nomeSetor, u.umidade FROM Registro u
                        JOIN sensorDHT11 sen ON u.fksensorDHT11_idumidade = sen.idSensor
                        JOIN setor s ON sen.fksetor_sensorDHT11 = s.idSetor
                        WHERE u.dtRegistro = (
                            SELECT MAX(dtRegistro)
                            FROM Registro
                            WHERE umidade < 40 OR umidade > 60
                        LIMIT 1
                        );`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function percentualMedicoesCriticas() {

    var instrucaoSql = `SELECT s.nomeSetor,
                        ROUND(
                            (SUM(CASE WHEN u.umidade < 40 OR u.umidade > 60 THEN 1 ELSE 0 END) * 100.0) / COUNT(*),
                            2
                        ) AS percentual_fora, COUNT(*) AS total_medicoes
                    FROM Registro u
                    JOIN sensorDHT11 sen ON u.fksensorDHT11_idumidade = sen.idSensor
                    JOIN setor s ON sen.fksetor_sensorDHT11 = s.idSetor
                    WHERE s.idSetor = (
                        SELECT sen.fksetor_sensorDHT11
                        FROM Registro u2
                        JOIN sensorDHT11 sen ON u2.fksensorDHT11_idumidade = sen.idSensor
                        WHERE u2.dtRegistro >= CURDATE()
                        AND (u2.umidade < 40 OR u2.umidade > 60)
                        GROUP BY sen.fksetor_sensorDHT11
                        ORDER BY COUNT(*) DESC
                        LIMIT 1
                    )
                    AND u.dtRegistro >= CURDATE()
                    GROUP BY s.nomeSetor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comparacaoDados6Dias() {

    var instrucaoSql = `SELECT s.nomeSetor, DATE(u.dtRegistro) AS data, ROUND(AVG(u.umidade), 2) AS media_umidade
                        FROM Registro u
                        JOIN sensorDHT11 sen ON u.fksensorDHT11_idumidade = sen.idSensor
                        JOIN setor s ON sen.fksetor_sensorDHT11 = s.idSetor
                        WHERE s.nomeSetor IN ('Centro Cirurgico', 'UTI')
                        AND u.dtRegistro >= CURDATE() - INTERVAL 6 DAY
                        GROUP BY s.nomeSetor, DATE(u.dtRegistro)
                        ORDER BY data, nomeSetor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comparacaoUmidadeAlertas() {

    var instrucaoSql = `SELECT CASE 
        WHEN umidade BETWEEN 40 AND 60 THEN 'Normal'
        ELSE 'Alerta'
        END AS status,
        COUNT(*) AS total
        FROM Registro
        WHERE dtRegistro = CURDATE()
        GROUP BY status;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidasUTI,
    buscarUltimasMedidasUnidadeDeQueimadas,
    buscarUltimasMedidasNeoNatal,
    buscarUltimasMedidasCentroCirurgico,
    buscarQuantAlertas,
    topSetoresMaisAlertas,
    regiaoForaFaixa,
    percentualMedicoesCriticas,
    comparacaoDados6Dias,
    comparacaoUmidadeAlertas
}