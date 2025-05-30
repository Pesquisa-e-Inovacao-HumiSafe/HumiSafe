var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/ultimas/:idSensor", function (req, res) {
    dashboardController.buscarUltimasMedidas(req, res);
});

router.post("/tempo-real/:idSensor", function (req, res) {
    dashboardController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;