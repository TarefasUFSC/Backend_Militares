const { Database } = require("sqlite3");
const connection = require("../database/connection");

const ResumoController = require("./InfoControllers/ResumoController");
const CursoController = require("./InfoControllers/CursoController");
const IdiomaController = require("./InfoControllers/IdiomaController");
const PostoController = require("./InfoControllers/PostoController");
const ComportamentoController = require("./InfoControllers/ComportamentoController");
const TempoAnteriorController = require("./InfoControllers/TempoAnteriorController");
const RestricaoController = require("./InfoControllers/RestricaoController");
const BatalhaoController = require("./InfoControllers/BatalhaoController");
const LotacaoController = require("./InfoControllers/LotacaoController");
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
        const { list_linguas } = req.body;
        const { secret_access_tokenL } = req.headers;

        if(list_linguas == undefined || list_linguas.length == 0)
        {return res.status(400).json({ msg: 'Lista de Idiomas vazia' });}

        const idioma = await connection('Idioma').select('*').whereIn('nm_idioma', ListSearchLanguage);
        const { ListSearchLanguage } =  list_linguas.map(idioma => idioma.nm_idioma);

        if(idioma.length > 0){
        return res.status(400).json({ msg: 'Um ou mais cursos já existem na base de dados' });
        }

        const idiomaList = list_linguas.map(idioma => ({ nm_idioma: idioma.nm_idioma, id_tipo_idioma: idioma.id_idioma }));
        const newLanguage = await connection('Idioma').insert(idiomaList);

        if (newLanguage == undefined || newLanguage.length == 0) {
            return res.status(500).json({ msg: 'Erro ao adicionar Lingua' });
        }

        let data = {}
        for (let i = 0; i < idiomaList.length; i++) {
            const idiomaN = await connection('Idioma')
            .select("*").where('nm_idioma', idiomaList[i].nm_idioma)
            .andWhere('Idioma.id_idioma', idiomaList[i].id_idioma);
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

  async getComportamento(req, res){
    const comportamento = await connection('Comportamento')
            .select('Comportamento.nm_comportamento')
            .select('Comportamento.id_comportamento');
    return res.json({ comportamento : comportamento });
  },

  async getTempoAnterior(req, res){
    const TempoAnterior = await connection('TipoTempoAnterior')
            .select('TipoTempoAnterior.nm_tipo_tempo')
            .select('TipoTempoAnterior.id_tipo_tempo');
    return res.json({TempoAnterior:TempoAnterior});
  },

  async getPostos(req, res){
    const Postos = await connection('Posto')
            .select('Posto.nm_posto')
            .select('Posto.id_posto');
    return res.json({Postos:Postos});
  },

  async getTipoCurso(req, res){
    const tipocurso = await connection('TipoCurso')
            .select('TipoCurso.nm_tipo_curso')
            .select('TipoCurso.id_tipo_curso');
    return res.json({tipocurso:tipocurso});
  },

  async getTipoRestricao(req, res){
    const tiporestricao = await connection('TipoRestricao')
            .select('TipoRestricao.nm_tipo_restricao')
            .select('TipoRestricao.id_tipo_restricao');
    return res.json({tiporestricao:tiporestricao});
  }


}