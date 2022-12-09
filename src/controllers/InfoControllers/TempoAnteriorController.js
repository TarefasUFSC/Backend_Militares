const connection = require("../../database/connection");

module.exports = {
    async getTempoAnterior(req, res) {
        const TempoAnterior = await connection('TipoTempoAnterior')
            .select('TipoTempoAnterior.nm_tipo_tempo')
            .select('TipoTempoAnterior.id_tipo_tempo');
        return res.json({ TempoAnterior: TempoAnterior });
    },
    async createTempoAnterior(req, res) {
        // nm_tipo_tempo: string (obrigatorio)
        // is_militar: boolean (obrigatorio)
        const { nm_tipo_tempo, is_militar } = req.body;
        // verifica se ja existe um tempo anterior com o mesmo nome
        const tempoAnterior = await connection('TipoTempoAnterior').where('nm_tipo_tempo', nm_tipo_tempo).select('TipoTempoAnterior.nm_tipo_tempo').first();
        if (tempoAnterior) {
            return res.status(400).json({ msg: 'Tempo anterior com o mesmo nome ja existe' });
        }
        // cria o tempo anterior
        const id_tipo_tempo = await connection('TipoTempoAnterior').insert({
            nm_tipo_tempo,
            is_militar,
        });
        if(!id_tipo_tempo){
            return res.status(400).json({ msg: 'Erro ao criar tempo anterior' });
        }
        return res.json({ TempoAnterior: {
            id_tipo_tempo: id_tipo_tempo[0],
            nm_tipo_tempo: nm_tipo_tempo,
            is_militar: is_militar,
        } });
    }
}