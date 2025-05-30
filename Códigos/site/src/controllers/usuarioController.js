var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                        //     .then((resultadoAquarios) => {
                        //         if (resultadoAquarios.length > 0) {
                        //             res.json({
                        //                 id: resultadoAutenticar[0].id,
                        //                 email: resultadoAutenticar[0].email,
                        //                 nome: resultadoAutenticar[0].nome,
                        //                 senha: resultadoAutenticar[0].senha,
                        //                 aquarios: resultadoAquarios
                        //             });
                        //         } else {
                        //             res.status(204).json({ aquarios: [] });
                        //         }
                            // })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razao = req.body.razaoServer;
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;
    var TipoLogradouro = req.body.TipoLogradouroServer;
    var Logradouro = req.body.LogradouroServer;
    var NumLogadrouro = req.body.NUmLogradouroServer;
    var Bairro = req.body.BairroServer;
    var Cidade = req.body.CidadeServer;
    var UF = req.body.UFServer;
    var CEP = req.body.CEPServer;
   

    // Faça as validações dos valores
    if (razao == undefined) {
        res.status(400).send("Sua Razão Social está indefinida!");
    } else if (nome == undefined) {
        res.status(400).send("Seu Nome Fantasia está indefinido!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (TipoLogradouro == undefined) {
        res.status(400).send("Seu Logradouro está undefined!");
    } else if (Logradouro == undefined) {
        res.status(400).send("Seu Logradouro está undefined!");
    } else if (NumLogadrouro == undefined) {
        res.status(400).send("Seu Numero do Logradouro está undefined!");
    } else if (Bairro == undefined) {
        res.status(400).send("Seu Bairro está undefined!");
    } else if (Cidade == undefined) {
        res.status(400).send("Sua Cidade está undefined!");
    } else if (UF == undefined) {
        res.status(400).send("Sua UF está undefined!");
    } else if (CEP == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(razao, nome, cnpj, email, telefone, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}