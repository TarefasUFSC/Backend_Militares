const connection = require("../database/connection");

async function get_gender_data() {
    // conta quantas pessoas de cada sexo existem na tabela militares
    // grupo por sexo
    // conta quantas pessoas de cada sexo existem na tabela militares

    const militares = await connection('militares').count('sexo as qtd').groupBy('sexo').select('sexo');
    //console.log(militares);
    return militares;
}

async function get_rank_data() {

    // conta quantas pessoas de cada posto existem na tabela militares
    // grupo por posto
    // conta quantas pessoas de cada posto existem na tabela militares

    const militares = await connection('militares').join('posto', 'militares.id_posto', '=', 'posto.id_posto')
        .count('posto.nm_posto as qtd').groupBy('posto.nm_posto').select('posto.nm_posto');
    return militares;
}

async function get_city_data() {

    // conta quantas pessoas de cada cidade existem na tabela militares (pela lotação, então precisa fazer um join)
    // grupo por cidade
    // conta quantas pessoas de cada sexo existem na tabela 

    const militares = await connection('militares').join('lotacao', 'militares.id_lotacao', '=', 'lotacao.id_lotacao')
        .join("Cidade", "lotacao.id_cidade", "=", "Cidade.id_cidade").count('Cidade.nm_cidade as qtd').groupBy('Cidade.nm_cidade')
        .select('Cidade.nm_cidade');
    return militares;
}

async function get_mean_service_time() {
    // retorna a média de tempo de serviço dos militares
    // média de tempo de serviço = somatorio(data de saída - data de hoje) / quantidade de militares
    // o retorno deve ser um delta tempo em anos

    const militares = await connection('militares').select('dt_ingresso');
    var sum = 0;
    var today = new Date();
    for (var i = 0; i < militares.length; i++) {
        var date = new Date(militares[i].dt_ingresso * 1000);
        //console.log(date);
        sum += today - date;
    }
    var mean = sum / militares.length;
    //converte em anos
    mean = mean / (1000 * 60 * 60 * 24 * 365);
    return mean;
}

async function get_mean_age() {
    // retorna a média de idade dos militares
    // média de idade = somatorio(data de nascimento - data de hoje) / quantidade de militares
    // o retorno deve ser um delta tempo em anos
    const militares = await connection('militares').select('dt_nascimento');
    var sum = 0;
    var today = new Date();
    for (var i = 0; i < militares.length; i++) {
        var date = new Date(militares[i].dt_nascimento * 1000);
        //console.log(date);
        sum += today - date;
    }
    var mean = sum / militares.length;
    //converte em anos
    mean = mean / (1000 * 60 * 60 * 24 * 365);
    return mean;
}

async function get_behavior_data() {
    // conta quantas pessoas de cada comportamento existem na tabela militares
    // grupo por comportamento
    // join com a tabela comportamento


    const militares = await connection('militares').join('comportamento', 'militares.id_comportamento', '=', 'comportamento.id_comportamento')
        .count('comportamento.nm_comportamento as qtd').groupBy('comportamento.nm_comportamento').select('comportamento.nm_comportamento');
    return militares;
}

async function get_formation_data() {
    // para cada tipo de curso creia uma chave em um objeto, que será o retorno
    // para cada tipo de curso, conta quantas pessoas fizeram esse curso
    // join com a tabela militarcurso
    // join com a tabela tipo curso
    // conta quantas pessoas de cada curso existem na tabela militarcurso
    // grupo por curso

    const militares = await connection('militares').join('militarcurso', 'militares.matricula', '=', 'militarcurso.matricula_militar')
        .join('Curso', "Curso.id_curso", "=", "militarcurso.id_curso").join('TipoCurso', 'Curso.id_tipo_curso', '=', 'TipoCurso.id_tipo_curso')
        .count('Curso.nm_curso as qtd').groupBy('Curso.nm_curso').select('Curso.nm_curso', "TipoCurso.nm_tipo_curso");
    // para cada tipo de curso creia uma chave em um objeto, que será o retorno com a subdivisão de cada curso
    var obj = {};
    for (var i = 0; i < militares.length; i++) {
        var key1 = militares[i].nm_tipo_curso;
        if (obj[key1] == undefined) {
            obj[key1] = {};
        }
        var key2 = militares[i].nm_curso;
        if (obj[key1][key2] == undefined) {
            obj[key1][key2] = 0;
        }
        obj[key1][key2] += militares[i].qtd;
    }
    return obj;
}



async function get_language_data() {
    // para cada tipo de idioma, conta quantas pessoas fizeram esse idioma
    // join com a tabela militaridioma
    // join com a tabela idioma
    // conta quantas pessoas de cada idioma existem na tabela militaridioma
    // grupo por idioma

    const militares = await connection('militares').join('militaridioma', 'militares.matricula', '=', 'militaridioma.matricula_militar').join('Idioma', 'militaridioma.id_idioma', '=', 'Idioma.id_idioma').count('Idioma.nm_idioma as qtd').groupBy('Idioma.nm_idioma').select('Idioma.nm_idioma');
    return militares;
}

async function get_away_data() {
    // conta quantas pessoas estão fora de serviço
    // join com a tabela militarafastamento
    // join com a tabela tipoafastamento
    // conta quantas pessoas de cada tipo de afastamento existem na tabela militarafastamento
    // grupo por tipo de afastamento

    const militares = await connection('militares').join('militarafastamento', 'militares.matricula', '=', 'militarafastamento.matricula_militar').join('TipoAfastamento', 'militarafastamento.id_tipo_afastamento', '=', 'TipoAfastamento.id_tipo_afastamento').count('TipoAfastamento.nm_tipo_afastamento as qtd').groupBy('TipoAfastamento.nm_tipo_afastamento').select('TipoAfastamento.nm_tipo_afastamento');
    return militares;
}

async function get_restrictions_data() {
    // conta quantas pessoas estão com restrição
    // join com a tabela MilitarRestricao
    // join com a tabela tiporestricao
    // conta quantas pessoas de cada tipo de restrição existem na tabela MilitarRestricao
    // grupo por tipo de restrição

    const militares = await connection('militares').join('MilitarRestricao', 'militares.matricula', '=', 'MilitarRestricao.matricula_militar')
        .join('TipoRestricao', 'MilitarRestricao.id_tipo_restricao', '=', 'TipoRestricao.id_tipo_restricao')
        .count('TipoRestricao.nm_tipo_restricao as qtd').groupBy('TipoRestricao.nm_tipo_restricao')
        .select('TipoRestricao.nm_tipo_restricao');
    return militares;
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
        return res.json({ resumo: data });
    },
    async createCursos(req, res) {
        // tem que verificar se a chava passada no HEADER é a correta (secret_access_token)
        // essa rota adiciona uma lista de cursos na tabela Cursos
        // a lista de cursos é passada no corpo da requisição
        // a lista de cursos é um array de objetos, onde cada objeto é um curso
        // cada objeto curso tem as seguintes chaves: nm_curso, id_tipo_curso

        const { cursos_lista } = req.body;
        const { secret_access_token } = req.headers;

        if (cursos_lista == undefined || cursos_lista.length == 0) {
            return res.status(400).json({ msg: 'Lista de cursos vazia' });
        }

        const listaBuscaCursos = cursos_lista.map(curso => curso.nm_curso);
        const cursos = await connection('Curso').select("*").whereIn('nm_curso', listaBuscaCursos);
        if (cursos.length > 0) {
            return res.status(400).json({ msg: 'Um ou mais cursos já existem na base de dados' });
        }

        const cursosLista = cursos_lista.map(curso =>
            ({ nm_curso: curso.nm_curso, id_tipo_curso: curso.id_tipo_curso }));
        const novosCursos = await connection('Curso').insert(cursosLista);

        if (novosCursos == undefined || novosCursos.length == 0) {
            return res.status(500).json({ msg: 'Erro ao adicionar cursos' });
        }
        
        // faz uma lista comos dados dos cursos recem adicionados
        let data = {}
        for (let i = 0; i < cursosLista.length; i++) {
            const cursoN = await connection('Curso').select("*").join('TipoCurso', 'Curso.id_tipo_curso', '=', 'TipoCurso.id_tipo_curso').where('nm_curso', cursosLista[i].nm_curso).andWhere('Curso.id_tipo_curso', cursosLista[i].id_tipo_curso);
            data[cursoN[0].nm_curso] = cursoN[0];
        }
        console.log(data);
        return res.json({ cursos_adicionados: data });
    },
    async getCursos(req, res) {
        const cursos = await connection('Curso')
        .join('TipoCurso', 'Curso.id_tipo_curso', '=', 'TipoCurso.id_tipo_curso')
        .select('Curso.nm_curso')
        .select('Curso.id_curso');
        return res.json({ cursos:cursos });
    },
    async getLinguas(req, res) {
        const linguas = await connection('Idioma')
            .select('Idioma.nm_idioma')
            .select('Idioma.id_idioma');
        return res.json({ idiomas:linguas });
    },
    async addLinguas(req, res){
        const { list_idioma } = req.body;
        const { secret_access_tokenL } = req.headers;

        if(list_idioma == undefined || list_idioma.length == 0)
        {return res.status(400).json({ msg: 'Lista de Idiomas vazia' });}

        const  ListSearchLanguage  =  list_idioma.map(idioma => idioma.nm_idioma);
        const idioma = await connection('Idioma').select('nm_idioma').whereIn('nm_idioma', ListSearchLanguage);

        if(idioma.length > 0){
        return res.status(400).json({ msg: 'Um ou mais cursos já existem na base de dados' });
        }

        const idiomaList = list_idioma.map(idioma => ({ nm_idioma: idioma.nm_idioma }));
        const newLanguage = await connection('Idioma').insert(idiomaList);

        if (newLanguage == undefined || newLanguage.length == 0) {
            return res.status(500).json({ msg: 'Erro ao adicionar Lingua' });
        }

        let data = {}
        for (let i = 0; i < idiomaList.length; i++) {
            const idiomaN = await connection('Idioma')
            .select("*").where('nm_idioma', idiomaList[i].nm_idioma)
;
            data[idiomaN[0].nm_idioma] = idiomaN[0];
        }
        console.log(data);
        return res.json({ idioma_adicionados: data });
    },
   async createTipoCurso(req, res){
        const { list_tipo_curso } = req.body;
        const { secret_access_tokenTC } = req.headers;

        if(list_tipo_curso == undefined || list_tipo_curso.length == 0)
        {return res.status(400).json({ msg: 'Lista de Tipos de Curso vazia' });}

        const tipocurso = await connection('TipoCurso').select('*').whereIn('nm_tipo_curso', ListSearchTipoCurso);
        const { ListSearchTipoCurso } =  list_tipo_curso.map(tipocurso => tipocurso.nm_tipo_curso);

        if(tipocurso.length > 0){
        return res.status(400).json({ msg: 'Um ou mais tipos de cursos já existem na base de dados' });
        }

        const tipocursoList = list_tipo_curso.map(tipocurso => ({ nm_tipo_curso: tipocurso.nm_tipo_curso, id_tipo_curso: tipocurso.id_tipo_curso }));
        const newTipoCurso = await connection('TipoCurso').insert(tipocursoList);

        if (newTipoCurso == undefined || newTipoCurso.length == 0) {
            return res.status(500).json({ msg: 'Erro ao adicionar Tipo de Curso' });
        }

        let data = {}
        for (let i = 0; i < tipocursoList.length; i++) {
            const tipocursoN = await connection('TipoCurso')
            .select("*").where('nm_tipo_curso', tipocursoList[i].nm_tipo_curso)
            .andWhere('TipoCurso.id_tipo_curso', tipocursoList[i].id_tipo_curso);
            data[tipocursoN[0].nm_tipo_curso] = tipocursoN[0];
        }
        console.log(data);
        return res.json({ tipo_curso_adicionados: data });
    },

    async getTipoCursos(_, res){
        const tipoCursos = await connection('TipoCurso')
        .select('*')
        
        return res.json({ tipoCursos });
    },

    async deleteTipoCurso(req, res){
        const { id } = req.params;
        const cursos = await connection('Curso').select('*').where('Curso.id_tipo_curso', '=', id)
        await connection('Curso').where('Curso.id_tipo_curso', '=', id).del()
        const tipoCursos = await connection('TipoCurso').select('*').where('TipoCurso.id_tipo_curso', '=', id)
        await connection('TipoCurso').where('TipoCurso.id_tipo_curso', '=', id).del()

        return res.json({ tipoCursos, cursos });
    },

    async updateTipoCurso(req, res){
        const { id } = req.params;
        const updatedInfos = req.body;

        await connection('TipoCurso').where('TipoCurso.id_tipo_curso', '=', id).update(updatedInfos)
        const updatedTipoCurso = await connection('TipoCurso').where('TipoCurso.id_tipo_curso', '=', id).select('*')

        return res.status(201).json({ updatedTipoCurso });
    }




}