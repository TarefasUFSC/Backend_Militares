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

routes.get('/info/comportamento', InfoController.ComportamentoController.getComportamento);

// isso aqui, como estamos nfalando sobre informações do sistema, diz respeito ao TIPO de tempo anterior
// então são rotas para listar, adicionar, atualizar e deletar o tipo de tempo anterior
routes.get('/info/tempo_anterior', InfoController.TempoAnteriorController.getTempoAnterior);
// routes.post('/info/tempo_anterior', InfoController.TempoAnteriorController.createTempoAnterior);
// routes.put('/info/tempo_anterior/:id', InfoController.TempoAnteriorController.updateTempoAnterior);
// routes.delete('/info/tempo_anterior/:id', InfoController.TempoAnteriorController.deleteTempoAnterior);

routes.get('/info/postos', InfoController.PostoController.getPostos);


routes.get('/info/tipo_restricao', InfoController.RestricaoController.getTipoRestricao);

// routes.put('/info/lotacao/:id', InfoController.updateLotacao);
// routes.delete('/info/lotacao/:id', InfoController.deleteLotacao);

routes.post('/info/batalhao', InfoController.BatalhaoController.createBatalhao);
routes.put('/info/batalhao/:id_batalhao', InfoController.BatalhaoController.updateBatalhao);
routes.delete('/info/batalhao/:id_batalhao', InfoController.BatalhaoController.deleteBatalhao);



module.exports = routes;