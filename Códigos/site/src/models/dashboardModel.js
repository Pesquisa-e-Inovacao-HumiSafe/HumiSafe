var database = require("../database/config")

function buscarUltimasMedidasUTI() {

    var instrucaoSql = `SELECT nomeSetor, registroUmidade, DATE_FORMAT(dtRegistro,  '%d/%m/%Y %H:%i') as 'dataFormatada' FROM Registro
                            JOIN Sensor
                                ON Registro.fkSensor = Sensor.idSensor
							JOIN Setor
								ON Sensor.fkSetor = Setor.idSetor
							WHERE nomeSetor = 'UTI' AND statusSensor = 'Ativo'
                            ORDER BY dtRegistro DESC LIMIT 6;`;

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

    var instrucaoSql = `SELECT st.nomeSetor, COUNT(ru.idRegistro) AS qtd_alertas,
                        MAX(TIME(ru.dtRegistro)) AS ultimo_horario FROM Registro ru
                        JOIN Sensor ss ON ru.fkSensor = ss.idSensor
                        JOIN Setor st ON ss.fkSetor = st.idSetor
                        WHERE ru.dtRegistro >= CURDATE() -- registros de hoje
                          AND (ru.registroUmidade < 40 OR ru.registroUmidade > 60)
                        GROUP BY st.idSetor
                        ORDER BY qtd_alertas DESC
                        LIMIT 3;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function regiaoForaFaixa() {

    var instrucaoSql = `SELECT st.nomeSetor, ru.registroUmidade FROM Registro ru
                        JOIN Sensor ss ON ru.fkSensor = ss.idSensor
                        JOIN Setor st ON ss.fkSetor = st.idSetor
                        WHERE ru.dtRegistro = (
                            SELECT MAX(dtRegistro)
                            FROM Registro ru
                            WHERE registroUmidade < 40 OR registroUmidade > 60
                        LIMIT 1
                        );`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function percentualMedicoesCriticas() {

    var instrucaoSql = `SELECT st.nomeSetor,
                        ROUND(
                            (SUM(CASE WHEN ru.registroUmidade < 40 OR ru.registroUmidade > 60 THEN 1 ELSE 0 END) * 100.0) / COUNT(*),
                            2
                        ) AS percentual_fora, COUNT(*) AS total_medicoes
                    FROM Registro ru
                    JOIN Sensor ss ON ru.fkSensor = ss.idSensor
                    JOIN Setor st ON ss.fkSetor = st.idSetor
                    WHERE st.idSetor = (
                        SELECT ss.fkSetor
                        FROM Registro ru2
                        JOIN Sensor ss ON ru2.fkSensor = ss.idSensor
                        WHERE ru2.dtRegistro >= CURDATE()
                        AND (ru2.registroUmidade < 40 OR ru2.registroUmidade > 60)
                        GROUP BY ss.fkSetor
                        ORDER BY COUNT(*) DESC
                        LIMIT 1
                    )
                    AND ru.dtRegistro >= CURDATE()
                    GROUP BY st.nomeSetor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comparacaoDados6Dias() {

    var instrucaoSql = `SELECT st.nomeSetor, DATE(ru.dtRegistro) AS data, ROUND(AVG(ru.registroUmidade), 2) AS media_umidade
                        FROM Registro ru
                        JOIN Sensor ss ON ru.fkSensor = ss.idSensor
                        JOIN Setor st ON ss.fkSetor = st.idSetor
                        WHERE st.nomeSetor IN ('Centro Cirurgico', 'UTI')
                        AND ru.dtRegistro >= CURDATE() - INTERVAL 6 DAY
                        GROUP BY st.nomeSetor, DATE(ru.dtRegistro)
                        ORDER BY data, nomeSetor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comparacaoUmidadeAlertas() {

    var instrucaoSql = `SELECT CASE 
        WHEN registroUmidade BETWEEN 40 AND 60 THEN 'Normal'
        ELSE 'Alerta'
        END AS status,
        COUNT(*) AS total
        FROM Registro
        WHERE dtRegistro BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 DAY)
        GROUP BY status;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidasUTI,
    buscarQuantAlertas,
    topSetoresMaisAlertas,
    regiaoForaFaixa,
    percentualMedicoesCriticas,
    comparacaoDados6Dias,
    comparacaoUmidadeAlertas
}