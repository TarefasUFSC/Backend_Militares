const connection = require("../../database/connection");

module.exports = {
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
            if(!cursoLista[i].id_tipo_curso || !cursoLista[i].nm_curso){
                return res.status(400).json({ msg: 'Um ou mais cursos não possuem id_tipo_curso ou nm_curso' });
            }
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
        return res.json({ cursos: cursos });
    },
    async getTipoCurso(req, res) {
        const tipocurso = await connection('TipoCurso')
            .select('TipoCurso.nm_tipo_curso')
            .select('TipoCurso.id_tipo_curso');
        return res.json({ tipocurso: tipocurso });
    },
    async createTipoCurso(req, res) {
        const { list_tipo_curso } = req.body;
        const { secret_access_tokenTC } = req.headers;

        if (list_tipo_curso == undefined || list_tipo_curso.length == 0) { return res.status(400).json({ msg: 'Lista de Tipos de Curso vazia' }); }

        const tipocurso = await connection('TipoCurso').select('*').whereIn('nm_tipo_curso', ListSearchTipoCurso);
        const { ListSearchTipoCurso } = list_tipo_curso.map(tipocurso => tipocurso.nm_tipo_curso);

        if (tipocurso.length > 0) {
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
};