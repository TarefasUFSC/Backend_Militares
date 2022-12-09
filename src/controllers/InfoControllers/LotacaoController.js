const connection = require("../../database/connection");


module.exports = {
    async createLotacao(req, res) {
        // id_regiao: int (obrigatorio)
        // id_batalhao: int (obrigatorio)
        // id_companhia: int (obrigatorio)
        // id_pelotao: int (obrigatorio)
        // id_grupo: int (obrigatorio)
        // id_cidade: int (obrigatorio)
        const { id_regiao, id_batalhao, id_companhia, id_pelotao, id_grupo, id_cidade } = req.body;
        // verifica se a regiao existe
        // ainda nao temos a tabela de regiao

        // verifica se o batalhao existe
        const batalhao = await connection('Batalhao').where('id_batalhao', id_batalhao).select('Batalhao.nm_batalhao').first();
        if (!batalhao) {
            return res.status(400).json({ msg: 'Batalhao nao existe' });
        }
        // verifica se a companhia existe
        // ainda nao temos a tabela de companhia

        // verifica se o pelotao existe
        // ainda nao temos a tabela de pelotao

        // verifica se o grupo existe
        // ainda nao temos a tabela de grupo

        // verifica se a cidade existe
        const cidade = await connection('Cidade').where('id_cidade', id_cidade).select('Cidade.nm_cidade').first();
        if (!cidade) {
            return res.status(400).json({ msg: 'Cidade nao existe' });
        }

        // verifica se ja existe uma lotacao com os mesmo dados
        const lotacao = await connection('Lotacao').where('id_regiao', id_regiao).where('id_batalhao', id_batalhao).where('id_companhia', id_companhia).where('id_pelotao', id_pelotao).where('id_grupo', id_grupo).where('id_cidade', id_cidade).select('Lotacao.id_lotacao').first();
        if (lotacao) {
            return res.status(400).json({ msg: 'Lotacao ja existe' });
        }


        // cria a lotacao
        const id_lotacao = await connection('Lotacao').insert({
            id_regiao,
            id_batalhao,
            id_companhia,
            id_pelotao,
            id_grupo,
            id_cidade
        });
        const novaLot = await connection('Lotacao')
        .where('id_lotacao', id_lotacao)
        .select('Lotacao.*',"Batalhao.nm_batalhao", "Cidade.nm_cidade")
        .join('Batalhao', 'Batalhao.id_batalhao', 'Lotacao.id_batalhao')
        .join('Cidade', 'Cidade.id_cidade', 'Lotacao.id_cidade')
        .first();
        return res.status(200).json({ Lotacao: novaLot });
    }
}