const connection = require("../../database/connection");

module.exports = {
    async getComportamento(_, res) {
        const comportamentos = await connection('Comportamento')
            .select('*')
        return res.json({ comportamentos });
    },

    async createComportamento(req, res) {
        const id = await connection('Comportamento').insert(req.body)
        const novoComportamento = await connection('Comportamento').select('*').where('Comportamento.id_comportamento', '=', id)

        return res.json({ novoComportamento });
    },


    async deleteComportamento(req, res){
        const { id } = req.params;
        const deletedComportamento = await connection('Comportamento').select('*').where('Comportamento.id_comportamento', '=', id)
        await connection('Comportamento').where('Comportamento.id_comportamento', '=', id).del()
    
        return res.json({ deletedComportamento });
    },
    
    async updateComportamento(req, res){
        const { id } = req.params;
        const updatedInfos = req.body;
    
        await connection('Comportamento').select('*').where('Comportamento.id_comportamento', '=', id).update(updatedInfos)
        const updatedComportamento = await connection('Comportamento').select('*').where('Comportamento.id_comportamento', '=', id).select('*')
    
        return res.status(201).json({ updatedComportamento });
    }
}