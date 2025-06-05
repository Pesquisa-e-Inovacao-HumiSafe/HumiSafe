var usuarioenderecoModel = require("../models/usuarioenderecoModel");


function cadastrar(req, res) {
    var tipoLogradouro = req.body.TipoLogradouroServer;
    var logradouro = req.body.LogradouroServer;
    var numLogradouro = req.body.NumLogradouroServer;
    var bairro = req.body.BairroServer;
    var cidade = req.body.CidadeServer;
    var uf = req.body.UFServer;
    var cep = req.body.CEPServer;
    var idHospital = req.body.idHospital;
   

    
     if (tipoLogradouro == undefined) {
        res.status(400).send("Seu Logradouro está undefined!");
     }
     
     else if (logradouro == undefined) {
        res.status(400).send("Seu Logradouro está undefined!");
    } 
    
    else if (numLogradouro == undefined) {
        res.status(400).send("Seu Numero do Logradouro está undefined!");
    } 
    
    else if (bairro == undefined) {
        res.status(400).send("Seu Bairro está undefined!");
    } 
    
    else if (cidade == undefined) {
        res.status(400).send("Sua Cidade está undefined!");
    } 
    
    else if (uf == undefined) {
        res.status(400).send("Sua UF está undefined!");
    } 
    
    else if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } 

     
        usuarioenderecoModel.cadastrar(tipoLogradouro, logradouro, numLogradouro, bairro, cidade, uf, cep, idHospital)
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
       

           

module.exports = {
    cadastrar
}