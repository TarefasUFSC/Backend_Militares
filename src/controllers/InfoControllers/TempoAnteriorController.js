const connection = require("../../database/connection");

module.exports = {
    async getTempoAnterior(req, res) {
        const TempoAnterior = await connection('TipoTempoAnterior')
            .select('TipoTempoAnterior.nm_tipo_tempo')
            .select('TipoTempoAnterior.id_tipo_tempo');
        return res.json({ TempoAnterior: TempoAnterior });
    },
}