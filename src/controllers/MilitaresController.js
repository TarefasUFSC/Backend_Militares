const connection = require("../database/connection");
module.exports = {

    async getMilitaresAposentados(req, res) {
        // os calculos de aposentadoria são feitos quando se adiciona ou altera um militar, então aqui só precisa fazer a busca consderando que isso ja foi feito em outro lugar

        // os filtros são passados pela query
        // os filtros são: nome, localidade, cidade, batalhão, magem inferior da aposentadoria, magem superior da aposentadoria
        const { nome, localidade, cidade, batalhao, dt_aposentadoria_inf, dt_aposentadoria_sup } = req.query;
        // o filtro de nome é feito com o operador LIKE do SQL
        // o filtro de data é feito com o operador BETWEEN do SQL
        // não sei como funciona o localicdade
        // o filtro de cidade é feito com o equeals do SQL
        // o filtro de batalhão é feito com o equals do SQL
        // batalhão e cidade devem ser pegos fazendo uma consulta na tabela de lotação usando um join

        const militares = await connection('militares').select('*')
        .join('lotacao', 'militares.lotacao', '=', 'lotacao.id_lotacao')
            .where('nome', 'like', `%${nome}%`)
            .andWhereBetween('militares.dt_aposentadoria', [dt_aposentadoria_inf, dt_aposentadoria_sup])
            .andWhere('lotacao.cidade', '=', cidade)
            .andWhere('lotacao.batalhao', '=', batalhao)
        if(militares.length == 0) {
            return res.status(404).json({ msg: "Nenhum militar encontrado" });
        }
        return res.json({militares:militares});
    },
    async getMilitarByMatricula(req, res) {
        const { matricula } = req.params;
        return res.json({ msg: "Militar com a matricula: " + matricula });
    }


}