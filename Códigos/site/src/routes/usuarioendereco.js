let express = require("express");
let router = express.Router();

let usuarioenderecoController = require("../controllers/usuarioenderecoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioenderecoController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
    usuarioenderecoController.listar(req, res);
});

module.exports = router;