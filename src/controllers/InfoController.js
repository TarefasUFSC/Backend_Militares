const connection = require("../database/connection");

async function get_gender_data(){
    // conta quantas pessoas de cada sexo existem na tabela militares
    // grupo por sexo
    // conta quantas pessoas de cada sexo existem na tabela militares

    const militares = await connection('militares').count('sexo as qtd').groupBy('sexo').select('sexo');
    //console.log(militares);
    return militares;
}

async function get_rank_data(){
    
    // conta quantas pessoas de cada posto existem na tabela militares
    // grupo por posto
    // conta quantas pessoas de cada posto existem na tabela militares

    const militares = await connection('militares').join('posto', 'militares.posto', '=', 'posto.id_posto').count('posto.nm_posto as qtd').groupBy('posto.nm_posto').select('posto.nm_posto');
    return militares;
}

async function get_city_data(){
    
    // conta quantas pessoas de cada cidade existem na tabela militares (pela lotação, então precisa fazer um join)
    // grupo por cidade
    // conta quantas pessoas de cada sexo existem na tabela 

    const militares = await connection('militares').join('lotacao', 'militares.lotacao', '=', 'lotacao.id_lotacao').join("Cidade", "lotacao.id_cidade", "=", "Cidade.id_cidade").count('Cidade.nm_cidade as qtd').groupBy('Cidade.nm_cidade').select('Cidade.nm_cidade');
    return militares;
}

async function get_mean_service_time(){
    return null;
}

async function get_mean_age(){
    return null;
}

async function get_behavior_data(){
    return null;
}

async function get_formation_data(){
    return null;
}

async function get_couses_data(){
    return null;
}

async function get_language_data(){
    return null;
}

async function get_away_data(){
    return null;
}

async function get_restrictions_data(){
    return null;
}



module.exports = {

    async getResumo(req, res) {
        const genero = await get_gender_data()

        const posto = await get_rank_data()

        const cidade_lotacao = await get_city_data()

        const media_anos_servico = await get_mean_service_time()

        const media_idade = await get_mean_age()

        const comportamento = await get_behavior_data()

        const formacao = await get_formation_data()

        const cursos = await get_couses_data()

        const idiomas = await get_language_data()

        const afastados = await get_away_data()

        const restricoes = await get_restrictions_data()

        data = {
            "genero": genero,
            "posto": posto,
            "cidade_lotacao": cidade_lotacao,
            "media_anos_servico": media_anos_servico,
            "media_idade": media_idade,
            "comportamento": comportamento,
            "formacao": formacao,
            "cursos": cursos,
            "idiomas": idiomas,
            "afastados": afastados,
            "restricoes": restricoes
        }
        return res.json({resumo:data });
    },
    async getFormacoes(req, res) {
        return res.json({ msg: "Resumo" });
    },
    async getLinguas(req, res) {
        return res.json({ msg: "Resumo" });
    }


}