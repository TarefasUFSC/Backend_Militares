const express = require('express');
const routes = express.Router();

const InfoController = require('./controllers/InfoController');
const MilitaresController = require('./controllers/MilitaresController');
const AlocacaoController = require('./controllers/AlocacaoController');

// rotas dos MILITARES (pessoas)
routes.get("/militares/aposentadoria", MilitaresController.getAposentadoriaMilitares); // aqui vai passar os filtros na query
routes.get("/militares/:matricula", MilitaresController.getMilitarPorMatricula);
routes.post("/militares", MilitaresController.createMilitar);

// rotas de Alocação
routes.post("/alocacao", AlocacaoController.getSugestaoAlocacao); // aqui vai passar os filtros na query
routes.get("/alocacao", AlocacaoController.getListagemAlocacao);

// rotas de informações gerais do sistema
routes.get('/info/resumo', InfoController.getResumo);

routes.get("/info/idioma", InfoController.getLinguas);
routes.post("/info/idioma", InfoController.addLinguas);
//routes.put("/info/idioma/:id", InfoController.putIdIdioma);

routes.get('/info/curso', InfoController.getCursos);
routes.post("/info/curso", InfoController.createCursos);
routes.get('/info/curso', InfoController.getCursos);
routes.post('/info/curso/tipo', InfoController.createTipoCurso);

routes.get('/info/compartamento', InfoController.getComportamento);

routes.get('/info/tempo_anterior', InfoController.getTempoAnterior);

routes.get('/info/postos', InfoController.getPostos);
routes.post("/info/posto", InfoController.addPosto);

routes.get('/info/tipo_curso', InfoController.getTipoCurso);

routes.get('/info/tipo_restricao', InfoController.getTipoRestricao);

routes.get('/info/batalhoes', InfoController.getBatalhoes);

module.exports = routes;