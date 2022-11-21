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
    // retorna a média de tempo de serviço dos militares
    // média de tempo de serviço = somatorio(data de saída - data de hoje) / quantidade de militares
    // o retorno deve ser um delta tempo em anos

    const militares = await connection('militares').select('dt_ingresso');
    var sum = 0;
    var today = new Date();
    for (var i = 0; i < militares.length; i++){
        var date = new Date(militares[i].dt_ingresso*1000);
        //console.log(date);
        sum += today - date;
    }
    var mean = sum / militares.length;
    //converte em anos
    mean = mean / (1000 * 60 * 60 * 24 * 365);
    return mean;
}

async function get_mean_age(){
    // retorna a média de idade dos militares
    // média de idade = somatorio(data de nascimento - data de hoje) / quantidade de militares
    // o retorno deve ser um delta tempo em anos
    const militares = await connection('militares').select('dt_nascimento');
    var sum = 0;
    var today = new Date();
    for (var i = 0; i < militares.length; i++){
        var date = new Date(militares[i].dt_nascimento*1000);
        //console.log(date);
        sum += today - date;
    }
    var mean = sum / militares.length;
    //converte em anos
    mean = mean / (1000 * 60 * 60 * 24 * 365);
    return mean;
}

async function get_behavior_data(){
    // conta quantas pessoas de cada comportamento existem na tabela militares
    // grupo por comportamento
    // join com a tabela comportamento


    const militares = await connection('militares').join('comportamento', 'militares.id_comportamento', '=', 'comportamento.id_comportamento').count('comportamento.nm_comportamento as qtd').groupBy('comportamento.nm_comportamento').select('comportamento.nm_comportamento');
    return militares;
}

async function get_formation_data(){
    // para cada tipo de curso creia uma chave em um objeto, que será o retorno
    // para cada tipo de curso, conta quantas pessoas fizeram esse curso
    // join com a tabela militarcurso
    // join com a tabela tipo curso
    // conta quantas pessoas de cada curso existem na tabela militarcurso
    // grupo por curso

    const militares = await connection('militares').join('militarcurso', 'militares.matricula', '=', 'militarcurso.matricula_militar').join('Curso',"Curso.id_curso","=","militarcurso.id_curso").join('TipoCurso', 'Curso.id_tipo_curso', '=', 'TipoCurso.id_tipo_curso').count('Curso.nm_curso as qtd').groupBy('Curso.nm_curso').select('Curso.nm_curso', "TipoCurso.nm_tipo_curso" );
    // para cada tipo de curso creia uma chave em um objeto, que será o retorno com a subdivisão de cada curso
    var obj = {};
    for (var i = 0; i < militares.length; i++){
        var key1 = militares[i].nm_tipo_curso;
        if (obj[key1] == undefined){
            obj[key1] = {};
        }
        var key2 = militares[i].nm_curso;
        if(obj[key1][key2] == undefined){
            obj[key1][key2] = 0;
        }
        obj[key1][key2] += militares[i].qtd;
    }
    return obj;}



async function get_language_data(){
    // para cada tipo de idioma, conta quantas pessoas fizeram esse idioma
    // join com a tabela militaridioma
    // join com a tabela idioma
    // conta quantas pessoas de cada idioma existem na tabela militaridioma
    // grupo por idioma

    const militares = await connection('militares').join('militaridioma', 'militares.matricula', '=', 'militaridioma.matricula_militar').join('Idioma', 'militaridioma.id_idioma', '=', 'Idioma.id_idioma').count('Idioma.nm_idioma as qtd').groupBy('Idioma.nm_idioma').select('Idioma.nm_idioma');
    return militares;
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

        const cursos_e_formacoes = await get_formation_data()

        const idiomas = await get_language_data()

        const afastados = await get_away_data()

        const restricoes = await get_restrictions_data()

        let data = {
            "genero": genero,
            "posto": posto,
            "cidade_lotacao": cidade_lotacao,
            "media_anos_corporacao": media_anos_servico,
            "media_idade": media_idade,
            "comportamento": comportamento,
            "cursos_e_formacoes": cursos_e_formacoes,
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