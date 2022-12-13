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

    async deletePosto(req, res){
        const { id } = req.params;
        const deletedPosto = await connection('Posto').select('*').where('Posto.id_posto', '=', id)
        await connection('Posto').where('Posto.id_posto', '=', id).del()
    
        return res.json({ deletedPosto });
    },
    
    async updatePosto(req, res){
        const { id } = req.params;
        const updatedInfos = req.body;
    
        await connection('Posto').select('*').where('Posto.id_posto', '=', id).update(updatedInfos)
        const updatedPosto = await connection('Posto').select('*').where('Posto.id_posto', '=', id).select('*')
    
        return res.status(201).json({ updatedPosto });
    }
}