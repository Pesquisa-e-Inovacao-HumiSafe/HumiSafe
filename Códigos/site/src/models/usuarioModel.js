var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
<<<<<<< HEAD
    var instrucaoSql = `
        SELECT idHospital, razaoSocial, email, senha FROM Hospital WHERE email = '${email}' AND senha = '${senha}';
=======
    let instrucaoSql = `
        SELECT id, nome, email, senha FROM Hospital WHERE email = '${email}' AND senha = '${senha}';
>>>>>>> 9796838ef7311f52b96eb060c60a8d8a6490cf3b
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(razaoSocial, nomeFantasia, cnpj, email, senha, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",  nomeFantasia, email, senha);


    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    let instrucaoSql = `
        INSERT INTO Hospital (razaoSocial, nomeFantasia, cnpj, email, senha, telefone) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${email}', '${senha}', '${telefone}');
        `



    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    autenticar,
    cadastrar
};