const connection = require("../../database/connection");

module.exports = {
    // async getBatalhoes(req, res) {
    //     return res.json({ batalhoes: await connection('Batalhao').select('Batalhao.nm_batalhao', 'Batalhao.id_batalhao').select('Batalhao.id_batalhao') });
    // },
    async createBatalhao(req, res) {
        const { nm_batalhao } = req.body;

        if(!nm_batalhao){
            return res.status(400).json({ msg: 'Nome do batalhao nao informado' });
        }

        // verifica se ja existe um batalhao com o mesmo nome
        const batalhao = await connection('Batalhao').where('nm_batalhao', nm_batalhao).select('Batalhao.nm_batalhao').first();
        if (batalhao) {
            return res.status(400).json({ msg: 'Batalhao com o mesmo nome ja existe' });
        }
        // cria o batalhao
        const id_batalhao = await connection('Batalhao').insert({
            nm_batalhao,
        });
        if(!id_batalhao){
            return res.status(400).json({ msg: 'Erro ao criar batalhao' });
        }
        return res.json({ Batalhao: {
            id_batalhao: id_batalhao[0],
            nm_batalhao: nm_batalhao,
        } });

    },
    async updateBatalhao(req, res) {
        const { id_batalhao } = req.params;

        // nm_batalhao: string (obrigatorio)
        const { nm_batalhao } = req.body;

        if(!nm_batalhao){
            return res.status(400).json({ msg: 'Nome do batalhao nao informado' });
        }


        // verifica se o batalhao existe
        const batalhao = await connection('Batalhao').where('id_batalhao', id_batalhao).select('Batalhao.nm_batalhao').first();
        if (!batalhao) {
            return res.status(400).json({ msg: 'Batalhao nao existe' });
        }
        // verifica se ja existe um batalhao com o mesmo nome
        const batalhao2 = await connection('Batalhao').where('nm_batalhao', nm_batalhao).select('Batalhao.nm_batalhao').first();    
        if (batalhao2) {
            return res.status(400).json({ msg: 'Batalhao com o mesmo nome ja existe' });
        }
        // atualiza o batalhao
        const id_batalhao2 = await connection('Batalhao').where('id_batalhao', id_batalhao).update({
            nm_batalhao,
        });
        if(!id_batalhao2){
            return res.status(400).json({ msg: 'Erro ao atualizar batalhao' });
        }
        return res.json({ Batalhao: {
            id_batalhao: id_batalhao,
            nm_batalhao: nm_batalhao,
        } });
    },
    async deleteBatalhao(req, res) {
        const { id_batalhao } = req.params;
        // verifica se o batalhao existe
        const batalhao = await connection('Batalhao').where('id_batalhao', id_batalhao).select('Batalhao.nm_batalhao').first();
        if (!batalhao) {
            return res.status(400).json({ msg: 'Batalhao nao existe' });
        }
        // deleta o batalhao
        const id_batalhao2 = await connection('Batalhao').where('id_batalhao', id_batalhao).delete();
        if(!id_batalhao2){
            return res.status(400).json({ msg: 'Erro ao deletar batalhao' });
        }
        return res.json({ Batalhao: {
            id_batalhao: id_batalhao,
            nm_batalhao: batalhao.nm_batalhao,
        } });
    }

}