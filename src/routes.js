const express = require('express');
const routes = express.Router();

const InfoController = require('./controllers/InfoController');
const MilitaresController = require('./controllers/MilitaresController');
const AlocacaoController = require('./controllers/AlocacaoController');

// rotas dos MILITARES (pessoas)
routes.get("/militares/aposentadoria", MilitaresController.gerAposentadoriaMilitares); // aqui vai passar os filtros na query
routes.get("/militares/:matricula", MilitaresController.getMilitarPorMatricula);

// rotas de Alocação
routes.get("/alocacao", AlocacaoController.getSugestaoAlocacao); // aqui vai passar os filtros na query

// rotas de informações gerais do sistema
routes.get('/info/resumo', InfoController.getResumo);
routes.get('/info/curso', InfoController.getCursos);
routes.get("/info/idioma", InfoController.getLinguas);
routes.post("/info/curso", InfoController.addCursos);

module.exports = routes;