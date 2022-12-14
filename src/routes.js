const express = require('express');
const routes = express.Router();

const InfoController = require('./controllers/InfoController');
const MilitaresController = require('./controllers/MilitaresController');
const AlocacaoController = require('./controllers/AlocacaoController');

// rotas dos MILITARES (pessoas)
routes.get("/militares/aposentadoria", MilitaresController.getAposentadoriaMilitares); // aqui vai passar os filtros na query
routes.get("/militares/:matricula", MilitaresController.getMilitarPorMatricula);
routes.post("/militares", MilitaresController.createMilitar);
routes.post('/militares/tempo_anterior/:matricula', MilitaresController.addTempoAnterior);
routes.put('/militares/tempo_anterior/:id_militar_tempo_anterior', MilitaresController.updateTempoAnterior);
routes.get('/militares/tempo_anterior/:matricula', MilitaresController.getTempoAnterior);
routes.delete('/militares/tempo_anterior/:id_militar_tempo_anterior', MilitaresController.deleteTempoAnterior);
routes.post('/militares/restricao/:matricula', MilitaresController.addRestricao);
routes.put('/militares/restricao/:id_militar_restricao', MilitaresController.updateRestricao);
routes.delete('/militares/restricao/:id_militar_restricao', MilitaresController.deleteRestricao);

// rotas de Alocação
routes.post("/alocacao", AlocacaoController.getSugestaoAlocacao); // aqui vai passar os filtros na query
routes.get("/alocacao", AlocacaoController.getListagemAlocacao);

// rotas de informações gerais do sistema
routes.get('/info/resumo', InfoController.ResumoController.getResumo);

routes.get("/info/idioma", InfoController.IdiomaController.getIdiomas);
routes.post("/info/idioma", InfoController.IdiomaController.addIdiomas);
routes.put('/info/idioma/:id_idioma', InfoController.IdiomaController.atualizarIdioma);
routes.delete('/info/idioma/:id_idioma', InfoController.IdiomaController.deleteIdioma);

routes.get('/info/curso', InfoController.CursoController.getCursos);
routes.post("/info/curso", InfoController.CursoController.createCursos);

routes.get('/info/curso', InfoController.CursoController.getCursos);
routes.delete('/info/curso/:id_curso', InfoController.CursoController.deleteCurso);
routes.put('/info/curso/:id_curso', InfoController.CursoController.atualizarCurso);

routes.get('/info/curso/tipo', InfoController.CursoController.getTipoCurso);
routes.post('/info/curso/tipo', InfoController.CursoController.createTipoCurso);
routes.delete('/info/curso/tipo/:id', InfoController.CursoController.deleteTipoCurso);
routes.put('/info/curso/tipo/:id', InfoController.CursoController.updateTipoCurso);



routes.get('/info/comportamento', InfoController.ComportamentoController.getComportamento);
routes.post('/info/comportamento', InfoController.ComportamentoController.createComportamento);
routes.put('/info/comportamento/:id', InfoController.ComportamentoController.updateComportamento);
routes.delete('/info/comportamento/:id', InfoController.ComportamentoController.deleteComportamento);

// routes.get('/info/comportamento', InfoController.ComportamentoController.getComportamento);
// routes.get('/info/comportamento', InfoController.ComportamentoController.getComportamento);

// isso aqui, como estamos nfalando sobre informações do sistema, diz respeito ao TIPO de tempo anterior
// então são rotas para listar, adicionar, atualizar e deletar o tipo de tempo anterior
routes.get('/info/tempo_anterior', InfoController.TempoAnteriorController.getTempoAnterior);
routes.post('/info/tempo_anterior', InfoController.TempoAnteriorController.createTempoAnterior);
routes.put('/info/tempo_anterior/:id_tipo_tempo', InfoController.TempoAnteriorController.updateTempoAnterior);
routes.delete('/info/tempo_anterior/:id_tipo_tempo', InfoController.TempoAnteriorController.deleteTempoAnterior);


routes.post("/info/posto", InfoController.PostoController.createPosto);
routes.get('/info/posto', InfoController.PostoController.getPostos);
routes.delete('/info/posto/:id', InfoController.PostoController.deletePosto);
routes.put('/info/posto/:id', InfoController.PostoController.updatePosto);


routes.get('/info/tipo_restricao', InfoController.RestricaoController.getTipoRestricao);
routes.put('/info/tipo_restricao/:id_tipo_restricao', InfoController.RestricaoController.updateTipoRestricao);
routes.post('/info/tipo_restricao', InfoController.RestricaoController.createTipoRestricao);
routes.delete('/info/tipo_restricao/:id_tipo_restricao', InfoController.RestricaoController.deleteTipoRestricao);

routes.get('/info/lotacao', InfoController.LotacaoController.getAllLotacao)
routes.post('/info/lotacao', InfoController.LotacaoController.createLotacao);
routes.put('/info/lotacao/:id_lotacao', InfoController.LotacaoController.updateLotacao);
routes.delete('/info/lotacao/:id_lotacao', InfoController.LotacaoController.deleteLotacao);

routes.post('/info/batalhao', InfoController.BatalhaoController.createBatalhao);
routes.put('/info/batalhao/:id_batalhao', InfoController.BatalhaoController.updateBatalhao);
routes.delete('/info/batalhao/:id_batalhao', InfoController.BatalhaoController.deleteBatalhao);
routes.get('/info/batalhao', InfoController.BatalhaoController.getBatalhoes);


module.exports = routes;