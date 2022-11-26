
const connection = require('../database/connection');
module.exports = {
    async getSugestaoAlocacao(req, res) {
        // os filtros vão vir na query
        // os filtros são todos os ranks que existem no banco e eles foram passados no body
        const { detalhes } = req.body;

        const ranks = await connection('Posto').select('*');
        for (let i = 0; i < ranks.length; i++) {
            //verifica se o rank foi passado no "detalhes" passado no body
            if (detalhes[ranks[i].nm_posto] == undefined) {
                return res.status(400).json({ error: 'Rank ' + ranks[i].nm_posto + ' não foi passado no body' });
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
            .limit(detalhes[ranks[i].nm_posto]);
            data[ranks[i].nm_posto] = militares;
        
        }
        //console.log(data);
        return res.json({ alocacao: data });
    }
}