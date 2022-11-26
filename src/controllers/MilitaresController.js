
const connection = require("../database/connection");
module.exports = {

    async gerAposentadoriaMilitares(req, res) {
        // os calculos de aposentadoria são feitos quando se adiciona ou altera um militar, então aqui só precisa fazer a busca consderando que isso ja foi feito em outro lugar
        
        // os filtros são passados pela query
        // os filtros são: nome, localidade, cidade, batalhão, magem inferior da aposentadoria, magem superior da aposentadoria, quantidade e página
        let { nome, id_cidade, id_batalhao, dt_aposentadoria_inf, dt_aposentadoria_sup, pagina, qtd } = req.query;
        // página é obrigatorio e o valor minimo é 1
        if(!pagina || pagina < 1) {
            return res.status(400).json({ msg: "Página inválida" });
        }
        // qtd é obrigatorio e o valor minimo é 10
        if(!qtd || qtd < 10) {
            return res.status(400).json({ msg: "Quantidade inválida" });
        }


        // o filtro de nome é feito com o operador LIKE do SQL
        // o filtro de data é feito com o operador BETWEEN do SQL
        // não sei como funciona o localicdade
        // o filtro de cidade é feito com o equeals do SQL
        // o filtro de batalhão é feito com o equals do SQL
        // batalhão e cidade devem ser pegos fazendo uma consulta na tabela de lotação usando um join
        // os parametros podem estar vazios, sto deve ser considerado

        const militares = connection('Militares')
            .join('Lotacao', 'Militares.id_lotacao', '=', 'Lotacao.id_lotacao')
            .join("Cidade", "Lotacao.id_cidade", "=", "Cidade.id_cidade")
            .leftOuterJoin("Batalhao", "Lotacao.id_batalhao", "=", "Batalhao.id_batalhao")
            .select('*')
            .limit(qtd)
            .offset((pagina - 1) * qtd);

        if (nome) {
            militares.where('Militares.nome', 'like', `%${nome}%`);
        }
        if (id_cidade) {
            militares.where('Cidade.id_cidade', '=', id_cidade);
        }
        if (id_batalhao) {
            militares.where('Batalhao.id_batalhao', '=', id_batalhao);
        }
        if (dt_aposentadoria_inf) {
            militares.where('Militares.dt_aposentadoria', '>=', dt_aposentadoria_inf);
        }
        if (dt_aposentadoria_sup) {
            militares.where('Militares.dt_aposentadoria', '<=', dt_aposentadoria_sup);
        }
        militares.then(function (rows) {
            console.log(rows);
            if (rows.length == 0) {
                return res.status(404).json({ msg: "Nenhum militar encontrado" });
            }
            //tem que retornar a quantidade total tb
            return res.json({ militares: rows });
        })



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