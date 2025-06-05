var database = require("../database/config")



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(tipoLogradouro, logradouro, numLogradouro, bairro, cidade, uf, cep, idHospital) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", tipoLogradouro, logradouro, numLogradouro, bairro, cidade, uf, cep, idHospital);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    let instrucaoSql = 
    
    `INSERT INTO endereco (tipoLogradouro, logradouro, numLogradouro, bairro, cidade, uf, cep, fkhospital_endereco) VALUES ('${tipoLogradouro}', '${logradouro}', '${numLogradouro}', '${bairro}', '${cidade}', '${uf}', '${cep}', ${idHospital});`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    cadastrar
};