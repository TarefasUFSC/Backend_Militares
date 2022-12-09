const connection = require("../database/connection");

const ResumoController = require("./InfoControllers/ResumoController");
const CursoController = require("./InfoControllers/CursoController");
const IdiomaController = require("./InfoControllers/IdiomaController");
const PostoController = require("./InfoControllers/PostoController");
const ComportamentoController = require("./InfoControllers/ComportamentoController");
const TempoAnteriorController = require("./InfoControllers/TempoAnteriorController");
const RestricaoController = require("./InfoControllers/RestricaoController");
module.exports = {

    ResumoController,
    CursoController,
    IdiomaController,
    PostoController,
    ComportamentoController,
    TempoAnteriorController,
    RestricaoController

}