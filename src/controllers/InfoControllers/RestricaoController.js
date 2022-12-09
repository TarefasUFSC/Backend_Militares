const connection = require("../../database/connection");

module.exports = {
    async getTipoRestricao(req, res) {
        const tiporestricao = await connection('TipoRestricao')
            .select('TipoRestricao.nm_tipo_restricao')
            .select('TipoRestricao.id_tipo_restricao');
        return res.json({ tiporestricao: tiporestricao });
    }
}