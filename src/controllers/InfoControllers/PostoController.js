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
            if (nm_posto === undefined) {
                return res.status(400).json({ msg: "O campo nome do posto não pode ser vazio" });
            }
            // verifica se ja existe algum posto com o novo nome
            const postoExistente = await connection('Posto')
                .where('nm_posto', nm_posto)
                .select('Posto.nm_posto')
                .first();
            if (postoExistente) {
                return res.status(400).json({ msg: "Já existe um posto com esse nome" });
            }
    
            // Cria o posto
            const novoPosto = await connection('Posto')
                .insert({ nm_posto: nm_posto, rank_posto : 0 } );
            if (novoPosto === 0) {
                return res.status(400).json({ msg: "Não foi possível criar o posto" });
            }
            const postoCriado = await connection('Posto')
                .where('nm_posto', nm_posto)
                .select("*");
            return res.json({ Posto: postoCriado[0] });
        
        // ta ok, talvez seja melhor tirar a parada de nivel de rank ou usar uma ideia tipo lista encadeada p falar quem é acima e abaixo de quem (o que permite ranks de mesmo nivel)
    },
}