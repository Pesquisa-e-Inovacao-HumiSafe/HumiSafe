var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.get("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// router.get("/cadastrarsession/:email/:senha", function (req, res) {
//     usuarioController.cadastrarsession(req, res);
// });

module.exports = router;