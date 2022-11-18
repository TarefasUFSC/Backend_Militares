const express = require('express');
const routes = express.Router();

const InfoController = require('./controllers/InfoController');
const MilitaresController = require('./controllers/MilitaresController');

// rotas dos MILITARES (pessoas)
routes.get("/militares/aposentados", MilitaresController.getMilitaresAposentados); // aqui vai passar os filtros na query
routes.get("/militares/:matricula", MilitaresController.getMilitarByMatricula);

// rotas de informações gerais do sistema
routes.get('/info/resumo', InfoController.getResumo);
routes.get('/info/formacoes', InfoController.getFormacoes)
routes.get("/info/linguas", InfoController.getLinguas);

module.exports = routes;