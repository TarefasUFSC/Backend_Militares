const connection = require("../../database/connection");

module.exports = {
    async getComportamento(req, res) {
        const comportamento = await connection('Comportamento')
            .select('Comportamento.nm_comportamento')
            .select('Comportamento.id_comportamento');
        return res.json({ comportamento: comportamento });
    },
}