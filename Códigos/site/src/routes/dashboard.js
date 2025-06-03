var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarUltimasMedidasUTI", function (req, res) {
    dashboardController.buscarUltimasMedidasUTI(req, res);
});

router.get("/buscarUltimasMedidasUnidadeDeQueimadas", function (req, res) {
    dashboardController.buscarUltimasMedidasUnidadeDeQueimadas(req, res);
});

router.get("/buscarUltimasMedidasNeoNatal", function (req, res) {
    dashboardController.buscarUltimasMedidasNeoNatal(req, res);
});

router.get("/buscarUltimasMedidasCentroCirurgico", function (req, res) {
    dashboardController.buscarUltimasMedidasCentroCirurgico(req, res);
});

// router.get("/tempo-real/:idSensor", function (req, res) {
//     dashboardController.buscarMedidasEmTempoReal(req, res);
// })

module.exports = router;