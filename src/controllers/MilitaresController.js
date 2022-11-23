
const connection = require("../database/connection");
module.exports = {

    async getMilitaresAposentados(req, res) {
        // os calculos de aposentadoria são feitos quando se adiciona ou altera um militar, então aqui só precisa fazer a busca consderando que isso ja foi feito em outro lugar
        
        // os filtros são passados pela query
        // os filtros são: nome, localidade, cidade, batalhão, magem inferior da aposentadoria, magem superior da aposentadoria
        let { nome, localidade, id_cidade, id_batalhao, dt_aposentadoria_inf, dt_aposentadoria_sup, pagina, qtd } = req.query;
        //localidade é a cidade de residencia, mas acho que não vamos usar

        // o filtro de nome é feito com o operador LIKE do SQL
        // o filtro de data é feito com o operador BETWEEN do SQL
        // não sei como funciona o localicdade
        // o filtro de cidade é feito com o equeals do SQL
        // o filtro de batalhão é feito com o equals do SQL
        // batalhão e cidade devem ser pegos fazendo uma consulta na tabela de lotação usando um join
        // os parametros podem estar vazios, sto deve ser considerado

        const militares = connection('Militares')
            .join('lotacao', 'militares.lotacao', '=', 'lotacao.id_lotacao')
            .join("Cidade", "lotacao.id_cidade", "=", "Cidade.id_cidade")
            .select('*')
        //.join("Batalhao", "lotacao.id_batalhao", "=", "Batalhao.id_batalhao")

        if (nome) {
            militares.where('militares.nm_militar', 'like', `%${nome}%`);
        }
        // if (localidade) {
        //     militares.where('militares.localidade', '=', localidade);
        // }
        if (id_cidade) {
            militares.where('Cidade.id_cidade', '=', id_cidade);
        }
        if (id_batalhao) {
            militares.where('Batalhao.id_batalhao', '=', id_batalhao);
        }
        if (dt_aposentadoria_inf) {
            militares.where('militares.dt_aposentadoria', '>=', dt_aposentadoria_inf);
        }
        if (dt_aposentadoria_sup) {
            militares.where('militares.dt_aposentadoria', '<=', dt_aposentadoria_sup);
        }
        militares.then(function (rows) {
            console.log(rows);
            if (rows.length == 0) {
                return res.status(404).json({ msg: "Nenhum militar encontrado" });
            }
            //tem que retornar a quantidade total tb
            return res.json({ militares: rows });
        })

        // const militares = await connection('militares').join('lotacao', 'militares.lotacao', '=', 'lotacao.id_lotacao').join("Cidade", "lotacao.id_cidade", "=", "Cidade.id_cidade").join("Batalhao", "lotacao.id_batalhao", "=", "Batalhao.id_batalhao").where('militares.dt_aposentadoria', '>=', dt_aposentadoria_inf).where('militares.dt_aposentadoria', '<=', dt_aposentadoria_sup).where('militares.nm_militar', 'like', `%${nome}%`).where('lotacao.id_localidade', '=', localidade).where('lotacao.id_cidade', '=', cidade).where('lotacao.id_batalhao', '=', batalhao).select('*');

        // const militares = await connection('militares').select('*')
        // .join('lotacao', 'militares.lotacao', '=', 'lotacao.id_lotacao')
        //     .where('nome', 'like', `%${nome}%`)
        //     .andWhereBetween('militares.dt_aposentadoria', [dt_aposentadoria_inf, dt_aposentadoria_sup])
        //     .andWhere('lotacao.cidade', '=', cidade)
        //     .andWhere('lotacao.batalhao', '=', batalhao)

    },
    async getMilitarByMatricula(req, res) {
        const { matricula } = req.params;
        const militar = await connection('Militares').select('*').where('militares.matricula', '=', matricula)

        if (militar.length == 0) {
            return res.status(404).json({ msg: "Nenhum militar encontrado" });
        }
        return res.json({militar:militar});
    }


}