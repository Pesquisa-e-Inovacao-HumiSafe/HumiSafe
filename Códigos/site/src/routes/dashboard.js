var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarUltimasMedidasUTI", function (req, res) {
    dashboardController.buscarUltimasMedidasUTI(req, res);
});

router.get("/buscarQuantAlertas", function (req, res) {
    dashboardController.buscarQuantAlertas(req, res);
});

router.get("/topSetoresMaisAlertas", function (req, res) {
    dashboardController.topSetoresMaisAlertas(req, res);
});

router.get("/regiaoForaFaixa", function (req, res) {
    dashboardController.regiaoForaFaixa(req, res);
});

router.get("/percentualMedicoesCriticas", function (req, res) {
    dashboardController.percentualMedicoesCriticas(req, res);
});

router.get("/comparacaoDados6Dias", function (req, res) {
    dashboardController.comparacaoDados6Dias(req, res);
});

router.get("/comparacaoUmidadeAlertas", function (req, res) {
    dashboardController.comparacaoUmidadeAlertas(req, res);
});

router.get("/buscarMedidasEmTempoReal", function (req, res) {
    dashboardController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;