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
    async atualizarIdioma(req, res) {
        const { id_idioma } = req.params;
        // nm_idioma: string (obrigatorio)
        const { nm_idioma } = req.body;

        if(!nm_idioma){
            return res.status(400).json({ msg: 'Nome do idioma nao informado' });
        }
        // verifica se o idioma existe
        const idioma = await connection('Idioma').where('id_idioma', id_idioma).select('Idioma.nm_idioma').first();
        if (!idioma) {
            return res.status(400).json({ msg: 'Idioma nao existe' });
        }
        // verifica se ja existe um idioma com o mesmo nome
        const idioma2 = await connection('Idioma').where('nm_idioma', nm_idioma).select('Idioma.nm_idioma').first();    
        if (idioma2) {
            return res.status(400).json({ msg: 'Idioma com o mesmo nome ja existe' });
        }
        // atualiza o idioma
        const id_idioma2 = await connection('Idioma').where('id_idioma', id_idioma).update({
            nm_idioma,
        });
        if(!id_idioma2){
            return res.status(400).json({ msg: 'Erro ao atualizar idioma' });
        }
        return res.json({ Idioma: {
            id_idioma: id_idioma,
            nm_idioma: nm_idioma,
        } });
    },
    async deleteIdioma(req, res) {
        const { id_idioma } = req.params;
        // verifica se o Idioma existe
        const idioma = await connection('Idioma').where('id_idioma', id_idioma).select('Idioma.id_idioma');
        if (!idioma) {
            return res.status(400).json({ msg: 'idioma nao existe' });
        }
        // deleta o Idioma
        const idiomaDeletado = await connection('Idioma').where('id_idioma', id_idioma).delete();
        if (!idiomaDeletado) {
            return res.status(400).json({ msg: 'Erro ao deletar idioma' });
        }
        return res.json({ msg: 'Idioma deletado com sucesso' });

    }
}