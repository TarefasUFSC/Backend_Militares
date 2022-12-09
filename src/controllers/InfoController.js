const connection = require("../database/connection");

const ResumoController = require("./InfoControllers/ResumoController");
const CursoController = require("./InfoControllers/CursoController");
const IdiomaController = require("./InfoControllers/IdiomaController");

module.exports = {

    ResumoController,
    CursoController,
    IdiomaController,

    async getComportamento(req, res) {
        const comportamento = await connection('Comportamento')
            .select('Comportamento.nm_comportamento')
            .select('Comportamento.id_comportamento');
        return res.json({ comportamento: comportamento });
    },

    async getTempoAnterior(req, res) {
        const TempoAnterior = await connection('TipoTempoAnterior')
            .select('TipoTempoAnterior.nm_tipo_tempo')
            .select('TipoTempoAnterior.id_tipo_tempo');
        return res.json({ TempoAnterior: TempoAnterior });
    },

    async getPostos(req, res) {
        const Postos = await connection('Posto')
            .select('Posto.nm_posto')
            .select('Posto.id_posto');
        return res.json({ Postos: Postos });
    },

   

    async getTipoRestricao(req, res) {
        const tiporestricao = await connection('TipoRestricao')
            .select('TipoRestricao.nm_tipo_restricao')
            .select('TipoRestricao.id_tipo_restricao');
        return res.json({ tiporestricao: tiporestricao });
    }


}