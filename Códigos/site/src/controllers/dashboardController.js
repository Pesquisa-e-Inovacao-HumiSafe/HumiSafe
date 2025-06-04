var dashboardModel = require("../models/dashboardModel");
// var aquarioModel = require("../models/aquarioModel");

function buscarUltimasMedidasUTI(req, res) {
    dashboardModel.buscarUltimasMedidasUTI().then((resultado) => { 
        res.status(200).json(resultado);
        console.log(resultado[0].umidade)
    });
}

function buscarUltimasMedidasUnidadeDeQueimadas(req, res) {
    dashboardModel.buscarUltimasMedidasUnidadeDeQueimadas().then((resultado) => { 
        res.status(200).json(resultado);
        console.log(resultado[0].umidade)
    });
}

function buscarUltimasMedidasNeoNatal(req, res) {
    dashboardModel.buscarUltimasMedidasNeoNatal().then((resultado) => { 
        res.status(200).json(resultado);
        console.log(resultado[0].umidade)
    });
}

function buscarUltimasMedidasCentroCirurgico(req, res) {
    dashboardModel.buscarUltimasMedidasCentroCirurgico().then((resultado) => { 
        res.status(200).json(resultado);
        console.log(resultado[0].umidade)
    });
}



// function buscarMedidasEmTempoReal(req, res) {
//     dashboardModel.buscarMedidasEmTempoReal().then((resultado) => { 
//         res.status(200).json(resultado);
//         console.log(resultado[0].)
//     });
// }

module.exports = {
    buscarUltimasMedidasUTI,
    buscarUltimasMedidasUnidadeDeQueimadas,
    buscarUltimasMedidasNeoNatal,
    buscarUltimasMedidasCentroCirurgico
    // ,
    // buscarMedidasEmTempoReal
}