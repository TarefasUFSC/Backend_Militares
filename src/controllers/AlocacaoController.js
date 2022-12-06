
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
                return res.status(400).json({ error: 'Posto '+chaves[i]+ ' inválido' });
            }
        }

        for (let i = 0; i < ranks.length; i++) {

            //verifica se o rank existe no detalhes, se não existir, ele coloca 0
            if (detalhes[ranks[i].nm_posto] == undefined) {
                ranks_pesquisa[ranks[i].nm_posto] = 0;
            }

        }
        // aqui busca os militares pelas quantidades passadas no detalhes e ordena pela antiguidade (do menor para o maior)
        let data = {}
        for(let i = 0; i < ranks.length; i++){
            const militares = await connection('Militares')
            .join('Lotacao', 'Militares.id_lotacao', '=', 'Lotacao.id_lotacao')
            .join("Cidade", "Lotacao.id_cidade", "=", "Cidade.id_cidade")
            .leftOuterJoin("Batalhao", "Lotacao.id_batalhao", "=", "Batalhao.id_batalhao")
            .select('*')
            .where('Militares.id_posto', '=', ranks[i].id_posto)
            .orderBy('Militares.antiguidade', 'asc')
            .limit(ranks_pesquisa[ranks[i].nm_posto]);
            data[ranks[i].nm_posto] = militares;
        
        }
        //console.log(data);
        return res.json({ alocacao: data });
    },
    
    async getListagemAlocacao(req, res){
        const alocacao = await connection('Alocacao').select('*');

        return res.json(alocacao);
    }
}