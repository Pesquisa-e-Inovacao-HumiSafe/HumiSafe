var usuarioModel = require("../models/usuarioModel");


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

                        res.json({

                            idHospital: resultadoAutenticar[0].idHospital,
                            razaoSocial: resultadoAutenticar[0].razaoSocial,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                        });

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
    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores
    if (razaoSocial == undefined) {
        res.status(400).send("Sua Razão Social está indefinida!");
    } else if (nomeFantasia == undefined) {
        res.status(400).send("Seu Nome Fantasia está indefinido!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }


    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrar(razaoSocial, nomeFantasia, cnpj, email, senha, telefone)
        .then(
            function (resultado) {
                const idHospital = resultado.insertId;

                console.log("ID retornado do insert:", idHospital)
                res.status(201).json({ idHospital });

            }
        )
        .catch(
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



module.exports = {
    autenticar,
    cadastrar
}