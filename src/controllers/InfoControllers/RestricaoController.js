const connection = require("../../database/connection");

module.exports = {
    async getTipoRestricao(req, res) {
        const tiporestricao = await connection('TipoRestricao')
            .select('TipoRestricao.nm_tipo_restricao')
            .select('TipoRestricao.id_tipo_restricao');
        return res.json({ tiporestricao: tiporestricao });
    },
    async updateTipoRestricao(req, res) {
        const { id_tipo_restricao } = req.params;
        const { nm_tipo_restricao } = req.body;
        if (nm_tipo_restricao === undefined) {
            return res.status(400).json({ msg: "O campo nome da restrição não pode ser vazio" });
        }

        // Verifica se o tipo de restrição existe
        const restriExistente = await connection('TipoRestricao')
            .where('id_tipo_restricao', id_tipo_restricao)  
            .select('TipoRestricao.nm_tipo_restricao')
            .first();
        
        if (!restriExistente) {
            return res.status(400).json({ msg: "Tipo de restrição não existe" });
        }
        // verifica se ja existe alguma resrição com o novo nome
        const restriExistente2 = await connection('TipoRestricao')
            .where('nm_tipo_restricao', nm_tipo_restricao)
            .select('TipoRestricao.nm_tipo_restricao')
            .first();
        if (restriExistente2) {
            return res.status(400).json({ msg: "Já existe uma restrição com esse nome" });
        }


        const tiporestricao = await connection('TipoRestricao')
            .where('id_tipo_restricao', id_tipo_restricao)
            .update({ nm_tipo_restricao: nm_tipo_restricao });
        
        if(tiporestricao === 0) {
            return res.status(400).json({ msg: "Não foi possível atualizar o tipo de restrição" });
        }
        const restrAtt = await connection('TipoRestricao')
            .where('id_tipo_restricao', id_tipo_restricao)
            .select("*");
        

        return res.json({ TipoeRestricao: restrAtt[0] });
    },
    async createTipoRestricao(req, res) {
        const { nm_tipo_restricao } = req.body;
        if (nm_tipo_restricao === undefined) {
            return res.status(400).json({ msg: "O campo nome da restrição não pode ser vazio" });
        }
        // verifica se ja existe alguma resrição com o novo nome
        const restriExistente = await connection('TipoRestricao')
            .where('nm_tipo_restricao', nm_tipo_restricao)
            .select('TipoRestricao.nm_tipo_restricao')
            .first();
        if (restriExistente) {
            return res.status(400).json({ msg: "Já existe uma restrição com esse nome" });
        }

        // Cria o tipo de restrição
        const tiporestricao = await connection('TipoRestricao')
            .insert({ nm_tipo_restricao: nm_tipo_restricao });
        if (tiporestricao === 0) {
            return res.status(400).json({ msg: "Não foi possível criar o tipo de restrição" });
        }
        const restrCriada = await connection('TipoRestricao')
            .where('nm_tipo_restricao', nm_tipo_restricao)
            .select("*");
        return res.json({ TipoeRestricao: restrCriada[0] });
    },
    async deleteTipoRestricao(req, res) {
        const { id_tipo_restricao } = req.params;

        // Verifica se o tipo de restrição existe
        const restriExistente = await connection('TipoRestricao')
            .where('id_tipo_restricao', id_tipo_restricao)
            .select('*')
            .first();
        
        if (!restriExistente) {
            return res.status(400).json({ msg: "Tipo de restrição não existe" });
        }

        // deleta o tipo de restrição
        const tipoRestDel = await connection('TipoRestricao')
            .where('id_tipo_restricao', id_tipo_restricao)
            .delete();
        if (tipoRestDel === 0) {
            return res.status(400).json({ msg: "Não foi possível deletar o tipo de restrição" });
        }
        return res.json({ TipoRestricao:restriExistente });

    }
}