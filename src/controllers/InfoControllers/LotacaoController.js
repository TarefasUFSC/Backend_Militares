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
    },
    async updateLotacao(req, res) {
        // id_regiao: int (opicional)
        // id_batalhao: int (opicional)
        // id_companhia: int (opicional)
        // id_pelotao: int (opicional)
        // id_grupo: int (opicional)
        // id_cidade: int (opicional)
        const { id_regiao, id_batalhao, id_companhia, id_pelotao, id_grupo, id_cidade } = req.body;
        const { id_lotacao } = req.params;
        // verifica se passou ao menos uma alteração
        if (!id_regiao && !id_batalhao && !id_companhia && !id_pelotao && !id_grupo && !id_cidade) {
            return res.status(400).json({ msg: 'Nenhum dado para alterar' });
        }
        // verifica se a lotacao existe
        let lotacao = await connection('Lotacao').where('id_lotacao', id_lotacao).select('Lotacao.id_lotacao').first();
        if (!lotacao) {
            return res.status(400).json({ msg: 'Lotacao nao existe' });
        }
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

        // seleciona a lotacao que deseja alterar e verifica se existe uma outra lotacao com os dados que deseja alterar que foram passados
        if(id_regiao){
            lotacao.id_regiao = id_regiao;
        }
        if(id_batalhao){
            lotacao.id_batalhao = id_batalhao;
        }
        if(id_companhia){
            lotacao.id_companhia = id_companhia;
        }
        if(id_pelotao){
            lotacao.id_pelotao = id_pelotao;
        }
        if(id_grupo){
            lotacao.id_grupo = id_grupo;
        }
        if(id_cidade){
            lotacao.id_cidade = id_cidade;
        }
        const lotacaoExistente = await connection('Lotacao').where('id_regiao', lotacao.id_regiao).where('id_batalhao', lotacao.id_batalhao).where('id_companhia', lotacao.id_companhia).where('id_pelotao', lotacao.id_pelotao).where('id_grupo', lotacao.id_grupo).where('id_cidade', lotacao.id_cidade).select('Lotacao.id_lotacao').first();
        if (lotacaoExistente) {
            return res.status(400).json({ msg: 'Lotacao ja existe' });
        }
        // altera a lotacao
        const lotAtualizada = await connection('Lotacao').where('id_lotacao', id_lotacao).update({
            id_regiao: lotacao.id_regiao,
            id_batalhao: lotacao.id_batalhao,
            id_companhia: lotacao.id_companhao,
            id_pelotao: lotacao.id_pelotao,
            id_grupo: lotacao.id_grupo,
            id_cidade: lotacao.id_cidade
        });
        if(!lotAtualizada){
            return res.status(400).json({ msg: 'Erro ao atualizar lotacao' });
        }
        const retLot = await connection('Lotacao')
        .where('id_lotacao', id_lotacao)
        .select('Lotacao.*',"Batalhao.nm_batalhao", "Cidade.nm_cidade")
        .join('Batalhao', 'Batalhao.id_batalhao', 'Lotacao.id_batalhao')
        .join('Cidade', 'Cidade.id_cidade', 'Lotacao.id_cidade')
        .first();
        return res.status(200).json({ Lotacao: retLot });;



    }
}