const connection = require("../../database/connection");

module.exports = {
    async getPostos(req, res) {
        const Postos = await connection('Posto')
            .select('Posto.nm_posto')
            .select('Posto.id_posto');
        return res.json({ Postos: Postos });
    },
    async createPosto(req, res) {
        const { nm_posto } = req.body;
        // ta ok, talvez seja melhor tirar a parada de nivel de rank ou usar uma ideia tipo lista encadeada p falar quem é acima e abaixo de quem (o que permite ranks de mesmo nivel)
    },
}