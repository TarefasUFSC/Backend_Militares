
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
        
        return res.json({ message: 'Sugestão de alocação' });
    }
}