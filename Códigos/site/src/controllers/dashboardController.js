var dashboardModel = require("../models/dashboardModel");
// var aquarioModel = require("../models/aquarioModel");

function buscarUltimasMedidasUTI(req, res) {
    dashboardModel.buscarUltimasMedidasUTI().then((resultado) => { 
        res.status(200).json(resultado);
        console.log(resultado[0].umidade)
    });
}

function buscarQuantAlertas(req, res) {
    dashboardModel.buscarQuantAlertas().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
            console.log(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a quantidade de alertas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
};

function topSetoresMaisAlertas(req, res) {
    dashboardModel.topSetoresMaisAlertas().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
            console.log(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os setores com mais alertas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
};

function regiaoForaFaixa(req, res) {
    dashboardModel.regiaoForaFaixa().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
            console.log(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a regiao mais fora da faixa: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
};

function percentualMedicoesCriticas(req, res) {
    dashboardModel.percentualMedicoesCriticas().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
            console.log(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o percentual da regiao mais critica: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
};

function comparacaoDados6Dias(req, res) {
    dashboardModel.comparacaoDados6Dias().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
            console.log(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a comparacao de dados de 6 dias: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
};

function comparacaoUmidadeAlertas(req, res) {
    dashboardModel.comparacaoUmidadeAlertas().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
            console.log(resultado)  
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a comparacao de umidades: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
};


function buscarMedidasEmTempoReal(req, res) {
    dashboardModel.buscarMedidasEmTempoReal().then((resultado) => { 
        res.status(200).json(resultado);
    });
}

module.exports = {
    buscarUltimasMedidasUTI,
    buscarQuantAlertas,
    topSetoresMaisAlertas,
    regiaoForaFaixa,
    percentualMedicoesCriticas,
    comparacaoDados6Dias,
    comparacaoUmidadeAlertas,
    buscarMedidasEmTempoReal
}