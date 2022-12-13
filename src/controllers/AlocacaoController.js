
const connection = require('../database/connection');
module.exports = {
    async getSugestaoAlocacao(req, res) {
        // os filtros vão vir na query
        // os filtros são todos os ranks que existem no banco e eles foram passados no body
        const { detalhes } = req.body;

        const ranks = await connection('Posto').select('*');
        let ranks_pesquisa = {};

        // faz uma lista com todas as chaves de detalhes
        let chaves = Object.keys(detalhes);
        // verifica se alguma chave de detalhe é um posto invalido
        for (let i = 0; i < chaves.length; i++) {
            let existe = false;
            for (let j = 0; j < ranks.length; j++) {
                if (chaves[i] == ranks[j].nm_posto) {
                    existe = true;
                    break;
                }
            }
            if (!existe) {
                return res.status(400).json({ error: 'Posto ' + chaves[i] + ' inválido' });
            }
        }

        for (let i = 0; i < ranks.length; i++) {

            //verifica se o rank existe no detalhes, se não existir, ele coloca 0
            if (detalhes[ranks[i].nm_posto]) {
                ranks_pesquisa[ranks[i].nm_posto] = detalhes[ranks[i].nm_posto];
            }

        }
        console.log(ranks_pesquisa);
        // aqui busca os militares pelas quantidades passadas no detalhes e ordena pela antiguidade (do menor para o maior)
        let data = {}
        for (let i = 0; i < ranks.length; i++) {
            if (ranks_pesquisa[ranks[i].nm_posto] == 0 || !ranks_pesquisa[ranks[i].nm_posto]) continue;
            const militares = await connection('Militares')
                .join('Lotacao', 'Militares.id_lotacao', '=', 'Lotacao.id_lotacao')
                .join("Cidade", "Lotacao.id_cidade", "=", "Cidade.id_cidade")
                .join("Posto", "Militares.id_posto", "=", "Posto.id_posto")
                //.leftOuterJoin("Batalhao", "Lotacao.id_batalhao", "=", "Batalhao.id_batalhao")
                .select('*')
                .where('Militares.id_posto', '=', ranks[i].id_posto)
                .orderBy('Militares.antiguidade', 'asc')
                .limit(parseInt(ranks_pesquisa[ranks[i].nm_posto]));

                data[ranks[i].nm_posto] = militares;
            // get first n elements
            // if (militares.length == 0) {

            //     data[ranks[i].nm_posto] = "Não há militares suficientes para alocar";

            // };
            // data[ranks[i].nm_posto] = [];
            // console.log(militares.length, parseInt(ranks_pesquisa[ranks[i].nm_posto]));
            // if (militares.length > parseInt(ranks_pesquisa[ranks[i].nm_posto])) {
            //     for (let j = 0; j < ranks_pesquisa[ranks[i].nm_posto]; j++) {
            //         data[ranks[i].nm_posto].push(militares[j]);
            //     }
            // } else {

            //     data[ranks[i].nm_posto] = militares;
            // }

        }
        //console.log(data);
        return res.json({ alocacao: data });
    },

    async getListagemAlocacao(req, res) {
        const alocacao = await connection('Alocacao').select('*');

        return res.json(alocacao);
    }
}