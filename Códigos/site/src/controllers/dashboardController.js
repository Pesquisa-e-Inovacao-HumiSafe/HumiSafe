var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function buscarUltimasMedidas(req, res) {
    dashboardModel.buscarUltimasMedidas().then((resultado) => { 
        res.status(200).json(resultado);
        console.log(resultado[0].quantidadeSim)
    });
}


function buscarMedidasEmTempoReal(req, res) {
    dashboardModel.buscarMedidasEmTempoReal().then((resultado) => { 
        res.status(200).json(resultado);
        console.log(resultado[0].quantidadeSim)
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}