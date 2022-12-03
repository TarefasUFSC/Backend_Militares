const express = require('express');
const routes = express.Router();

const InfoController = require('./controllers/InfoController');
const MilitaresController = require('./controllers/MilitaresController');
const AlocacaoController = require('./controllers/AlocacaoController');

// rotas dos MILITARES (pessoas)
routes.get("/militares/aposentadoria", MilitaresController.gerAposentadoriaMilitares); // aqui vai passar os filtros na query
routes.get("/militares/:matricula", MilitaresController.getMilitarPorMatricula);
routes.post("/militares", MilitaresController.createMilitar);

// rotas de Alocação
routes.post("/alocacao", AlocacaoController.getSugestaoAlocacao); // aqui vai passar os filtros na query
routes.get("/alocacao", AlocacaoController.getListagemAlocacao);

// rotas de informações gerais do sistema
routes.get('/info/resumo', InfoController.getResumo);
;
routes.get("/info/idioma", InfoController.getLinguas);
// routes.post('/info/idioma', InfoController.createIdiomas);

routes.get('/info/curso', InfoController.getCursos);
routes.post("/info/curso", InfoController.createCursos);
// routes.post('/info/curso/tipo', InfoController.createTipoCurso);


module.exports = routes;