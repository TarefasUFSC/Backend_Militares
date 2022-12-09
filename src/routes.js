const express = require('express');
const routes = express.Router();

const InfoController = require('./controllers/InfoController');
const MilitaresController = require('./controllers/MilitaresController');
const AlocacaoController = require('./controllers/AlocacaoController');

// rotas dos MILITARES (pessoas)
routes.get("/militares/aposentadoria", MilitaresController.getAposentadoriaMilitares); // aqui vai passar os filtros na query
routes.get("/militares/:matricula", MilitaresController.getMilitarPorMatricula);
routes.post("/militares", MilitaresController.createMilitar);
// routes.post('militares/tempo_anterior/:matricula', MilitaresController.addTempoAnterior);
// routes.post('militares/restricao/:matricula', MilitaresController.addRestricao);
// routes.put('militares/restricao/:id', MilitaresController.updateRestricao);
// routes.delete('militares/restricao/:id', MilitaresController.deleteRestricao);

// rotas de Alocação
routes.post("/alocacao", AlocacaoController.getSugestaoAlocacao); // aqui vai passar os filtros na query
routes.get("/alocacao", AlocacaoController.getListagemAlocacao);

// rotas de informações gerais do sistema
routes.get('/info/resumo', InfoController.ResumoController.getResumo);

routes.get("/info/idioma", InfoController.IdiomaController.getIdiomas);
routes.post("/info/idioma", InfoController.IdiomaController.addIdiomas);

routes.get('/info/curso', InfoController.CursoController.getCursos);
routes.post("/info/curso", InfoController.CursoController.createCursos);
routes.get('/info/curso', InfoController.CursoController.getCursos);
routes.get('/info/curso/tipo', InfoController.CursoController.getTipoCurso);
routes.post('/info/curso/tipo', InfoController.CursoController.createTipoCurso);

routes.get('/info/comportamento', InfoController.getComportamento);

routes.get('/info/tempo_anterior', InfoController.getTempoAnterior);
// routes.post('/info/tempo_anterior', InfoController.createTempoAnterior);
// routes.put('/info/tempo_anterior/:id', InfoController.updateTempoAnterior);
// routes.delete('/info/tempo_anterior/:id', InfoController.deleteTempoAnterior);

routes.get('/info/postos', InfoController.getPostos);


routes.get('/info/tipo_restricao', InfoController.getTipoRestricao);

// routes.put('/info/lotacao/:id', InfoController.updateLotacao);
// routes.delete('/info/lotacao/:id', InfoController.deleteLotacao);

//routes.post('/info/batalhao', InfoController.createBatalhao);
// routes.put('/info/batalhao/:id', InfoController.updateBatalhao);
// routes.delete('/info/batalhao/:id', InfoController.deleteBatalhao);



module.exports = routes;