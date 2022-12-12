const connection = require("../../database/connection");


module.exports = {
    async getIdiomas(req, res) {
        const linguas = await connection('Idioma')
            .select('Idioma.nm_idioma')
            .select('Idioma.id_idioma');
        return res.json({ idiomas: linguas });
    },
    async addIdiomas(req, res) {
        const { list_linguas } = req.body;
        const { secret_access_tokenL } = req.headers;

        if (list_linguas == undefined || list_linguas.length == 0) { return res.status(400).json({ msg: 'Lista de Idiomas vazia' }); }

        const idioma = await connection('Idioma').select('*').whereIn('nm_idioma', ListSearchLanguage);
        const { ListSearchLanguage } = list_linguas.map(idioma => idioma.nm_idioma);

        if (idioma.length > 0) {
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
}