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
        if (!id_tipo_tempo) {
            return res.status(400).json({ msg: 'Erro ao criar tempo anterior' });
        }
        return res.json({
            TempoAnterior: {
                id_tipo_tempo: id_tipo_tempo[0],
                nm_tipo_tempo: nm_tipo_tempo,
                is_militar: is_militar,
            }
        });
    },
    async updateTempoAnterior(req, res) {
        const { id_tipo_tempo } = req.params;
        // nm_tipo_tempo: string (opicional)
        // is_militar: boolean (opicional)
        const { nm_tipo_tempo, is_militar } = req.body;
        // verifica se ao menos um dos campos foi passado
        if (!nm_tipo_tempo && is_militar === undefined) {
            return res.status(400).json({ msg: 'Nenhum campo foi passado' });
        }
        // verifica se o tempo anterior existe
        const tempoAnterior = await connection('TipoTempoAnterior').where('id_tipo_tempo', id_tipo_tempo).select('TipoTempoAnterior.id_tipo_tempo').first();
        if (!tempoAnterior) {
            return res.status(400).json({ msg: 'Tempo anterior nao existe' });
        }
        // se passou alteração de nome, verifica se ja existe um tempo anterior com o mesmo nome
        let tipo_tempo = null
        if (nm_tipo_tempo) {
            const tempoAnterior = await connection('TipoTempoAnterior').where('nm_tipo_tempo', nm_tipo_tempo).select('TipoTempoAnterior.nm_tipo_tempo').first();
            if (tempoAnterior) {
                return res.status(400).json({ msg: 'Tempo anterior com o mesmo nome ja existe' });
            }
            // atualiza o nome
            tipo_tempo = await connection('TipoTempoAnterior').where('id_tipo_tempo', id_tipo_tempo).update({
                nm_tipo_tempo,
            });
        }
        // atualiza o tempo anterior se houver passado
        if (is_militar !== undefined) {
            tipo_tempo = await connection('TipoTempoAnterior').where('id_tipo_tempo', id_tipo_tempo).update({
                is_militar,
            });
        }
        const retTipoTempo = await connection('TipoTempoAnterior').where('id_tipo_tempo', id_tipo_tempo).select('*').select('TipoTempoAnterior.is_militar').first();
        return res.json({
            TempoAnterior: retTipoTempo

        });
    },
    async deleteTempoAnterior(req, res) {
        const { id_tipo_tempo } = req.params;
        // verifica se o tempo anterior existe
        const tempoAnterior = await connection('TipoTempoAnterior').where('id_tipo_tempo', id_tipo_tempo).select('TipoTempoAnterior.id_tipo_tempo').first();
        if (!tempoAnterior) {
            return res.status(400).json({ msg: 'Tempo anterior nao existe' });
        }
        // deleta o tempo anterior
        const tipo_tempo = await connection('TipoTempoAnterior').where('id_tipo_tempo', id_tipo_tempo).delete();
        if (!tipo_tempo) {
            return res.status(400).json({ msg: 'Erro ao deletar tempo anterior' });
        }
        return res.json({ msg: 'Tempo anterior deletado com sucesso' });
        
    }
}