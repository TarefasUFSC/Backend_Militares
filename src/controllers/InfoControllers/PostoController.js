const connection = require("../../database/connection");

module.exports = {
    async getPostos(req, res) {
        const Postos = await connection('Posto')
            .select('Posto.nm_posto')
            .select('Posto.id_posto');
        return res.json({ Postos: Postos });
    },
}