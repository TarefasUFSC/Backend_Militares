
const connection = require("../database/connection");

// dt_theoretical_retirement,dt_entry,min_mili_time_years,max_civil_time_years,tmp_civil,tmp_military
async function calculaAposentadoriaTeorica(dt_aposentadoria_teorica, dt_ingresso, min_mili_time_years, max_civil_time_years, temp_civil, temp_militar) {
    console.log("dt_aposentadoria_teorica: " + dt_aposentadoria_teorica.toLocaleDateString());
    console.log("dt_ingresso: " + dt_ingresso.toLocaleDateString());
    console.log("min_mili_time_years: " + min_mili_time_years);
    console.log("max_civil_time_years: " + max_civil_time_years);
    console.log("temp_civil: " + temp_civil);
    console.log("temp_militar: " + temp_militar);

    let toll_4_months_years = 0;
    if (max_civil_time_years) {
        if (temp_civil > 365.25 * max_civil_time_years) {
            temp_civil = 365.25 * max_civil_time_years;
        }
    }
    // time_spent_on_military (em dias) = (dt_theoretical_retirement  - dt_entry ) (em dias) - tmp_military (em dias)
    const diffTime = Math.abs(dt_aposentadoria_teorica.getTime() / 1000 - dt_ingresso.getTime() / 1000);
    const diffDays = Math.ceil(diffTime / (60 * 60 * 24));
    let tempo_total_militar = diffDays - temp_militar;
    if (min_mili_time_years) {
        if (tempo_total_militar < 365.25 * min_mili_time_years) {
            toll_4_months_years = parseInt((365.25 * min_mili_time_years - tempo_total_militar) / 365.25); // para cada anos que tiver aqui vai ser 1 taxa de 4 meses
        }
    } else {
        toll_4_months_years = 0;
    }
    // subtrai a data teorica de aposentadoria com o tempo militar e o tempo civil, sendo que a aposentadoria teorica é do tipo Date() e o tempo militar e civil são em dias
    // transforma os dias em segundos
    // transforma a data d aposentador em timestamp (segundos)
    // soma o tempo militar e civil em segundos
    // subtrai eles da data de aposentadoria em timestamp
    let temp_civil_segundos = temp_civil * 24 * 60 * 60;
    let temp_militar_segundos = temp_militar * 24 * 60 * 60;
    let dt_aposentadoria_teorica_timestamp = parseInt(dt_aposentadoria_teorica.getTime() / 1000);
    console.log("dt_aposentadoria_teorica_timestamp: " + dt_aposentadoria_teorica_timestamp, "dt_aposentadoria_teorica: " + new Date(parseInt(dt_aposentadoria_teorica_timestamp)).toLocaleDateString());
    let dt_aposentadoria_real_timestamp = dt_aposentadoria_teorica_timestamp - temp_civil_segundos - temp_militar_segundos;
    let dt_aposentadoria_real = new Date(dt_aposentadoria_real_timestamp * 1000);
    console.log("dt_aposentadoria_real_timestamp: " + dt_aposentadoria_real_timestamp, "dt_aposentadoria_real: " + dt_aposentadoria_real.toLocaleDateString());

    return {
        dt_aposentadoria_real: dt_aposentadoria_real,
        toll_4_months_years: toll_4_months_years
    }

}

// sexo: Masculino ou Feminino
// dt_ingresso: timestamp em SEGUNDOS
// lista_de_tempos_anteriores: [{id_tipo_tempo: int, tempo_dias: int}]
async function calculaAposentadoria(sexo, dt_ingresso, lista_de_tempos_anteriores) {
    console.log("Calculando aposentadoria para o militar de sexo " + sexo + " e data de ingresso " + new Date(parseInt(dt_ingresso * 1000)).toLocaleDateString());
    if (!lista_de_tempos_anteriores) {
        lista_de_tempos_anteriores = [];
    }

    /*
    Homens
        - Se sua data de ingresso é até 19/12/2013: deve ter 35 anos de serviço, não tem exigência de tempo militar, pode somar todo o tempo que tiver fora.
        - Se sua data de ingresso é posterior a 19/12/2013: deve ter 35 anos de serviço, sendo, no mínimo, 30 anos de serviço militar, podendo usar 5 anos anteriores de tempo que não seja militar.
    Mulheres
        - Se sua data de ingresso é até 31/08/2006: deve ter 35 anos de serviço, não tem exigência de tempo militar, pode somar todo o tempo que tiver fora
        - Se sua data de ingresso é entre 01/09/2006 e até 19/12/2013: deve ter 35 anos de serviço, sendo, no mínimo, 15 anos de serviço militar, podendo usar 20 anos anteriores de tempo que não seja militar.
        - Se sua data de ingresso é posterior a 19/12/2013: deve ter 35 anos de serviço, sendo, no mínimo, 30 anos de serviço militar, podendo usar 5 anos anteriores de tempo que não seja militar.
    “Pedágios”
        - “17%”
            Se até 31/12/2021 tiver fechado as regras anteriores, não há pedágio. Caso contrário, do tempo total que restar para fechar a regra em 01/01/2022 deve ser acrescentado 17%.
        - “4 meses”
            Se até 31/12/2021 tiver fechado as regras anteriores, não há pedágio. Caso contrário, do tempo que restar para fechar o tempo militar em 01/01/2022 deve ser acrescentado 4 meses para cada ano faltante.
    */
    dt_ingresso = new Date(dt_ingresso * 1000);
    let dt_19_12_2013 = new Date(2013, 12, 19);
    let dt_31_08_2006 = new Date(2006, 8, 31);
    let dt_01_09_2006 = new Date(2006, 9, 1);
    let dt_31_12_2021 = new Date(2021, 12, 31);
    let dt_01_01_2022 = new Date(2022, 1, 1);

    // calcula a data de agora
    let dt_ret = new Date();

    // calcula a aposentadoria teorica (soma 35 anos)
    let dt_aposentadoria_teorica = new Date(parseInt(dt_ingresso.getTime()));
    console.log("dt_aposentadoria_teorica: " + dt_aposentadoria_teorica.toLocaleDateString());
    dt_aposentadoria_teorica.setFullYear(dt_aposentadoria_teorica.getFullYear() + 35);

    let toll_4_months_years = 0;
    let toll_17_percent = 0;

    let temp_militar = 0;
    let temp_civil = 0;

    // calcula o tempo militar andando pela lista de tempos anteriores
    for (let i = 0; i < lista_de_tempos_anteriores.length; i++) {
        let item = lista_de_tempos_anteriores[i];
        // pega no banco o tipo
        console.log(item);
        let tipo = await connection("TipoTempoAnterior").where("id_tipo_tempo", item.id_tipo_tempo).select("is_militar").first();
        if (tipo.is_militar) {
            temp_militar += item.tempo_dias;
        }
        else {
            temp_civil += item.tempo_dias;
        }
    }
    console.log("Tempo militar: " + temp_militar);
    console.log("Tempo civil: " + temp_civil);

    if (sexo = "Masculino") {
        if (dt_ingresso <= dt_19_12_2013) {
            let dt = await calculaAposentadoriaTeorica(dt_aposentadoria_teorica, dt_ingresso, null, null, temp_civil, temp_militar)
            dt_aposentadoria_teorica = dt.dt_aposentadoria_real;
            toll_4_months_years = dt.toll_4_months_years;
        }
        else if (dt_ingresso > dt_19_12_2013) {
            let dt = await calculaAposentadoriaTeorica(dt_aposentadoria_teorica, dt_ingresso, 30, 5, temp_civil, temp_militar)
            dt_aposentadoria_teorica = dt.dt_aposentadoria_real;
            toll_4_months_years = dt.toll_4_months_years;
        }

    }
    else {
        if (dt_ingresso <= dt_31_08_2006) {
            let dt = await calculaAposentadoriaTeorica(dt_aposentadoria_teorica, dt_ingresso, null, null, temp_civil, temp_militar)
            dt_aposentadoria_teorica = dt.dt_aposentadoria_real;
            toll_4_months_years = dt.toll_4_months_years;
        }
        else if (dt_ingresso >= dt_01_09_2006 && dt_ingresso <= dt_19_12_2013) {
            let dt = await calculaAposentadoriaTeorica(dt_aposentadoria_teorica, dt_ingresso, 20, 15, temp_civil, temp_militar)
            dt_aposentadoria_teorica = dt.dt_aposentadoria_real;
            toll_4_months_years = dt.toll_4_months_years;
        }
        else if (dt_ingresso > dt_19_12_2013) {
            let dt = await calculaAposentadoriaTeorica(dt_aposentadoria_teorica, dt_ingresso, 30, 5, temp_civil, temp_militar)
            dt_aposentadoria_teorica = dt.dt_aposentadoria_real;
            toll_4_months_years = dt.toll_4_months_years;
        }
    }

    // calcula o pedágio de 17%
    console.log("aaaa", "dt_aposentadoria_teorica: " + dt_aposentadoria_teorica.toLocaleDateString(), "dt_aposentadoria_teorica_timestamp: " + parseInt(dt_aposentadoria_teorica.getTime() / 1000));
    if (dt_aposentadoria_teorica > dt_31_12_2021) {

        const diffTime = Math.abs(dt_aposentadoria_teorica.getTime() / 1000 - dt_01_01_2022.getTime() / 1000);
        const diffDays = Math.ceil(diffTime / (60 * 60 * 24));
        toll_17_percent = diffDays * 0.17;
    } else {
        toll_17_percent = 0;
    }

    // calcula o pedagio de 4 meses em dias
    if (toll_4_months_years > 0) {
        toll_4_months = parseInt(4 * toll_4_months_years / 365.25); //isso esta em meses
    }
    else {
        toll_4_months = 0;
    }
    // calcula a aposentadoria real, levando os pedágios, ja em dias, em consideração
    // transorma os pedagios em segundos
    // transforma a data de aposentadoria teorica em timestamp em segundos
    let dt_aposentadoria_teorica_timestamp = parseInt(dt_aposentadoria_teorica.getTime() / 1000);
    let toll_4_months_seconds = toll_4_months * 86400 * 30;
    let toll_17_percent_seconds = toll_17_percent * 86400;
    console.log("toll_4_months_seconds: " + toll_4_months_seconds, "toll_17_percent_seconds: " + toll_17_percent_seconds);
    let dt_aposentadoria_real_timestamp = dt_aposentadoria_teorica_timestamp + toll_4_months_seconds + toll_17_percent_seconds;

    return {
        dt_aposentadoria_real_timestamp: dt_aposentadoria_real_timestamp,
        toll: {
            toll_4_months: toll_4_months,
            toll_17_percent: toll_17_percent
        },
        temp_militar: temp_militar,
        temp_civil: temp_civil
    }

}

module.exports = {

    async getAposentadoriaMilitares(req, res) {
        // os calculos de aposentadoria são feitos quando se adiciona ou altera um militar, então aqui só precisa fazer a busca consderando que isso ja foi feito em outro lugar

        // os filtros são passados pela query
        // os filtros são: nome, localidade, cidade, batalhão, magem inferior da aposentadoria, magem superior da aposentadoria, quantidade e página
        let { nome, id_cidade, id_batalhao, dt_aposentadoria_inf, dt_aposentadoria_sup, pagina, qtd } = req.query;
        // página é obrigatorio e o valor minimo é 1
        if (!pagina || pagina < 1) {
            return res.status(400).json({ msg: "Página inválida" });
        }
        // qtd é obrigatorio e o valor minimo é 10
        if (!qtd || qtd < 10) {
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
    async getMilitarPorMatricula(req, res) {
        const { matricula } = req.params;
        const militar = await connection('Militares').select('*').where('militares.matricula', '=', matricula)

        if (militar.length == 0) {
            return res.status(404).json({ msg: "Nenhum militar encontrado" });
        }
        return res.json({ militar: militar });
    },
    async createMilitar(req, res) {
        // Para criar um militar é preciso passar os seguintes dados:
        // nome: string (obrigatorio)
        // sexo: string (obrigatorio)
        // antiguidade: int (obrigatorio)
        // id_lotacao: int (obrigatorio)
        // dt_ingresso: timestamp (obrigatorio)
        // dt_nascimento: timestamp (obrigatorio)
        // licencas_esp_acc: int (opcional - default em 0)
        // id_comportamento: int (opcional - default em null)
        // endereco: string (obrigatorio)
        // ferias: int (opcional - default em null)
        // img_perfil: string (opcional - default em null)
        // lista_de_tempos_anteriores: array de objetos (opcional - default em null)
        // // cada objeto deve ter os seguintes dados:
        // // // id_tipo_tempo: int (obrigatorio)
        // // // tempo_dias: int (obrigatorio)
        let { nome, sexo, id_posto, antiguidade, id_lotacao, dt_ingresso, dt_nascimento, licencas_esp_acc, id_comportamento, endereco, ferias, img_perfil, lista_de_tempos_anteriores } = req.body;
        // o dt_aposentadoria é calculado depois usando os tempos anteriores e a data de ingresso

        // validação dos dados obrigatórios
        if (!nome || !sexo || !id_posto || !antiguidade || !id_lotacao || !dt_ingresso || !dt_nascimento || !endereco) {
            // diz quais dados estão faltando

            return res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos" });
        }
        // id_posto é obrigatorio e deve ser um valor valido
        const posto = await connection('Posto').select('*').where('id_posto', '=', id_posto);
        if (posto.length == 0) {
            return res.status(400).json({ msg: "Posto inválido" });
        }

        // id_lotacao é obrigatorio e deve ser um valor valido
        const lotacao = await connection('Lotacao').select('*').where('id_lotacao', '=', id_lotacao);
        if (lotacao.length == 0) {
            return res.status(400).json({ msg: "Lotação inválida" });
        }

        // id_comportamento é opcional e deve ser um valor valido
        if (id_comportamento) {
            const comportamento = await connection('Comportamento').select('*').where('id_comportamento', '=', id_comportamento);
            if (comportamento.length == 0) {
                return res.status(400).json({ msg: "Comportamento inválido" });
            }
        }

        // validação dos dados opcionais
        if (licencas_esp_acc) {
            if (licencas_esp_acc < 0) {
                return res.status(400).json({ msg: "Licenças especiais acumuladas inválidas" });
            }
        } else {
            licencas_esp_acc = 0;
        }

        if (ferias) {
            if (ferias < 0) {
                return res.status(400).json({ msg: "Férias inválidas" });
            }
        } else {
            ferias = null;
        }

        if (!img_perfil) {
            img_perfil = null;
        }


        // adiciona o militar no banco
        const militar = await connection('Militares').insert({
            nome,
            sexo,
            id_posto,
            antiguidade,
            id_lotacao,
            dt_ingresso,
            dt_nascimento,
            licencas_esp_acc,
            id_comportamento,
            endereco,
            ferias,
            img_perfil
        });
        // verifica se deu certo
        if (militar.length == 0) {
            return res.status(400).json({ msg: "Erro ao criar militar" });
        }


        // pega o id do militar que foi adicionado
        const matricula_militar = militar[0];

        // adiciona os tempos anteriores no banco
        if (lista_de_tempos_anteriores) {
            lista_de_tempos_anteriores.forEach(async tempo_anterior => {
                const { id_tipo_tempo, tempo_dias } = tempo_anterior;
                await connection('MilitarTempoAnterior').insert({
                    matricula_militar,
                    id_tipo_tempo,
                    tempo_dias
                });
            });
        }

        // calcula a data de aposentadoria
        const dados_aposentadoria = await calculaAposentadoria(sexo, dt_ingresso, lista_de_tempos_anteriores);
        const { dt_aposentadoria_real_timestamp, toll, temp_militar, temp_civil } = dados_aposentadoria;

        // adiciona a data de aposentadoria no militar
        await connection('Militares').update({
            dt_aposentadoria: parseInt(dt_aposentadoria_real_timestamp)
        }).where('matricula', '=', matricula_militar);

        // retorna o militar criado
        const militar_criado = await connection('Militares').select('*')
            .join('Posto', 'Militares.id_posto', '=', 'Posto.id_posto')
            .join('lotacao', 'Militares.id_lotacao', '=', 'lotacao.id_lotacao')
            .leftJoin('Comportamento', 'Militares.id_comportamento', '=', 'Comportamento.id_comportamento')
            .leftJoin('MilitarTempoAnterior', 'Militares.matricula', '=', 'MilitarTempoAnterior.matricula_militar')
            .leftJoin('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
            .leftJoin("Cidade as CidadeLotacao", "lotacao.id_cidade", "=", "CidadeLotacao.id_cidade")
            .where('matricula', '=', matricula_militar);

        return res.json({ militar: militar_criado });
    },
    async addTempoAnterior(req, res) {
        const { matricula } = req.params;
        // id_tipo_tempo: int (obrigatorio)
        // tempo_dias: int (obrigatorio)
        const { id_tipo_tempo, tempo_dias } = req.body;
        if (!id_tipo_tempo || !tempo_dias) {
            return res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos" });
        }
        // id_tipo_tempo deve ser um valor valido
        const tipo_tempo_anterior = await connection('TipoTempoAnterior').select('*').where('id_tipo_tempo', '=', id_tipo_tempo);
        if (tipo_tempo_anterior.length == 0) {
            return res.status(400).json({ msg: "Tipo de tempo anterior inválido" });
        }
        // tempo_dias deve ser um valor valido
        if (tempo_dias < 0) {
            return res.status(400).json({ msg: "Tempo anterior inválido" });
        }
        // militar deve existir
        const militar = await connection('Militares').select('*').where('matricula', '=', matricula);
        if (militar.length == 0) {
            return res.status(400).json({ msg: "Militar não encontrado" });
        }
        // adiciona o tempo anterior no banco
        const tempo_anterior = await connection('MilitarTempoAnterior').insert({
            matricula_militar: matricula,
            id_tipo_tempo,
            tempo_dias
        });
        // verifica se deu certo
        if (tempo_anterior.length == 0) {
            return res.status(400).json({ msg: "Erro ao adicionar tempo anterior" });
        }

        // pega os tempos anteriores do militar
        const tempos_anteriores = await connection('MilitarTempoAnterior')
            .join('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
            .select('*')
            .where('matricula_militar', '=', matricula);

        // atualiza a data de aposentadoria dele
        // calcula a data de aposentadoria
        console.log(tempos_anteriores.map(tempo_anterior => { return { id_tipo_tempo: tempo_anterior.id_tipo_tempo, tempo_dias: tempo_anterior.tempo_dias } }));
        const dados_aposentadoria = await calculaAposentadoria(
            militar[0].sexo,
            parseInt(militar[0].dt_ingresso / 1),
            tempos_anteriores.map(tempo_anterior => { return { id_tipo_tempo: tempo_anterior.id_tipo_tempo, tempo_dias: tempo_anterior.tempo_dias } }));
        const { dt_aposentadoria_real_timestamp, toll, temp_militar, temp_civil } = dados_aposentadoria;
        console.log(dt_aposentadoria_real_timestamp, new Date(parseInt(dt_aposentadoria_real_timestamp * 1)).toLocaleDateString(), toll, temp_militar, temp_civil);

        // adiciona a data de aposentadoria no militar
        await connection('Militares').update({
            dt_aposentadoria: dt_aposentadoria_real_timestamp
        }).where('matricula', '=', matricula);
        const militar_atualizado = await connection('Militares').select('*')
            .join('Posto', 'Militares.id_posto', '=', 'Posto.id_posto')
            .join('lotacao', 'Militares.id_lotacao', '=', 'lotacao.id_lotacao')
            .leftJoin('Comportamento', 'Militares.id_comportamento', '=', 'Comportamento.id_comportamento')
            .leftJoin('MilitarTempoAnterior', 'Militares.matricula', '=', 'MilitarTempoAnterior.matricula_militar')
            .leftJoin('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
            .leftJoin("Cidade as CidadeLotacao", "lotacao.id_cidade", "=", "CidadeLotacao.id_cidade")
            .where('matricula', '=', matricula).first();

        return res.json({
            TemposAteriores: tempos_anteriores,
            Militar: militar_atualizado
        });
    },
    async updateTempoAnterior(req, res) {
        const {id_militar_tempo_anterior} = req.params;
        // id_tipo_tempo: int (opicional)
        // tempo_dias: int (opicional)
        const {id_tipo_tempo, tempo_dias} = req.body;
        if (!id_tipo_tempo && !tempo_dias) {
            return res.status(400).json({msg: "Ao menos uma coisa deve ser alterada!"});
        }
        // id_tipo_tempo deve ser um valor valido
        if (id_tipo_tempo) {
            const tipo_tempo_anterior = await connection('TipoTempoAnterior').select('*').where('id_tipo_tempo', '=', id_tipo_tempo);
            if (tipo_tempo_anterior.length == 0) {
                return res.status(400).json({msg: "Tipo de tempo anterior inválido"});
            }
        }
        // tempo_dias deve ser um valor valido
        if (tempo_dias) {
            if (tempo_dias < 0) {
                return res.status(400).json({msg: "Tempo de dias inválido"});
            }
        }
        // verifica se o tempo anterior existe
        let tempo_anterior = await connection('MilitarTempoAnterior').select('*').where('id_militar_tempo_anterior', '=', id_militar_tempo_anterior).first();
        if (!tempo_anterior) {
            return res.status(400).json({msg: "Tempo anterior não encontrado"});
        }
        // atualiza o tempo anterior
        if(id_tipo_tempo) {
            tempo_anterior.id_tipo_tempo = id_tipo_tempo;
        }
        if(tempo_dias) {
            tempo_anterior.tempo_dias = tempo_dias;
        }
        const att = await connection('MilitarTempoAnterior').update(tempo_anterior).where('id_militar_tempo_anterior', '=', id_militar_tempo_anterior);

        const tempos_anteriores = await connection('MilitarTempoAnterior')
            .join('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
            .select('*')
            .where('matricula_militar', '=', tempo_anterior.matricula_militar);

        // atualiza a data de aposentadoria dele
        // calcula a data de aposentadoria
        console.log(tempo_anterior.matricula_militar);
        const militar = await connection('Militares').select('*').where('matricula', '=', tempo_anterior.matricula_militar);
        console.log(tempos_anteriores.map(tempo_anterior => { return { id_tipo_tempo: tempo_anterior.id_tipo_tempo, tempo_dias: tempo_anterior.tempo_dias } }));
        const dados_aposentadoria = await calculaAposentadoria(
            militar[0].sexo,
            parseInt(militar[0].dt_ingresso / 1),
            tempos_anteriores.map(tempo_anterior => { return { id_tipo_tempo: tempo_anterior.id_tipo_tempo, tempo_dias: tempo_anterior.tempo_dias } }));
        const { dt_aposentadoria_real_timestamp, toll, temp_militar, temp_civil } = dados_aposentadoria;
        console.log(dt_aposentadoria_real_timestamp, new Date(parseInt(dt_aposentadoria_real_timestamp * 1)).toLocaleDateString(), toll, temp_militar, temp_civil);

        // adiciona a data de aposentadoria no militar
        await connection('Militares').update({
            dt_aposentadoria: dt_aposentadoria_real_timestamp
        }).where('matricula', '=', tempo_anterior.matricula_militar);

        const tempAtt = await connection('MilitarTempoAnterior')
        .join('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
        .join("Militares", "MilitarTempoAnterior.matricula_militar", "=", "Militares.matricula")
        .select('TipoTempoAnterior.*',"MilitarTempoAnterior.*","Militares.nome").where('id_militar_tempo_anterior', '=', id_militar_tempo_anterior).first();

        const militar_atualizado = await connection('Militares').select('*')
            .join('Posto', 'Militares.id_posto', '=', 'Posto.id_posto')
            .join('lotacao', 'Militares.id_lotacao', '=', 'lotacao.id_lotacao')
            .leftJoin('Comportamento', 'Militares.id_comportamento', '=', 'Comportamento.id_comportamento')
            .leftJoin('MilitarTempoAnterior', 'Militares.matricula', '=', 'MilitarTempoAnterior.matricula_militar')
            .leftJoin('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
            .leftJoin("Cidade as CidadeLotacao", "lotacao.id_cidade", "=", "CidadeLotacao.id_cidade")
            .where('matricula', '=', tempo_anterior.matricula_militar).first();

        return res.json({
            TemposAteriores: tempos_anteriores,
            Militar: militar_atualizado
        });
        
    },
    async deleteTempoAnterior(req, res) {
        const { id_militar_tempo_anterior } = req.params;
        // verifica se o tempo anterior existe
        const tempo_anterior = await connection('MilitarTempoAnterior').select('*').where('id_militar_tempo_anterior', '=', id_militar_tempo_anterior).first();
        if (!tempo_anterior) {
            return res.status(400).json({ msg: "Tempo anterior não encontrado" });
        }
        // deleta o tempo anterior
        await connection('MilitarTempoAnterior').delete().where('id_militar_tempo_anterior', '=', id_militar_tempo_anterior);
        // atualiza a data de aposentadoria dele
        // calcula a data de aposentadoria
        const militar = await connection('Militares').select('*').where('matricula', '=', tempo_anterior.matricula_militar);
        const tempos_anteriores = await connection('MilitarTempoAnterior')
            .join('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
            .select('TipoTempoAnterior.*',"MilitarTempoAnterior.*").where('matricula_militar', '=', tempo_anterior.matricula_militar);
        const dados_aposentadoria = await calculaAposentadoria(
            militar[0].sexo,
            parseInt(militar[0].dt_ingresso / 1),
            tempos_anteriores.map(tempo_anterior => { return { id_tipo_tempo: tempo_anterior.id_tipo_tempo, tempo_dias: tempo_anterior.tempo_dias } }));
        const { dt_aposentadoria_real_timestamp, toll, temp_militar, temp_civil } = dados_aposentadoria;
        console.log(dt_aposentadoria_real_timestamp, new Date(parseInt(dt_aposentadoria_real_timestamp * 1)).toLocaleDateString(), toll, temp_militar, temp_civil);
        // adiciona a data de aposentadoria no militar
        await connection('Militares').update({
            dt_aposentadoria: dt_aposentadoria_real_timestamp
        }).where('matricula', '=', tempo_anterior.matricula_militar);
        const militar_atualizado = await connection('Militares').select('*')
            .join('Posto', 'Militares.id_posto', '=', 'Posto.id_posto')
            .join('lotacao', 'Militares.id_lotacao', '=', 'lotacao.id_lotacao')
            .leftJoin('Comportamento', 'Militares.id_comportamento', '=', 'Comportamento.id_comportamento')
            .leftJoin('MilitarTempoAnterior', 'Militares.matricula', '=', 'MilitarTempoAnterior.matricula_militar')
            .leftJoin('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
            .leftJoin("Cidade as CidadeLotacao", "lotacao.id_cidade", "=", "CidadeLotacao.id_cidade")
            .where('matricula', '=', tempo_anterior.matricula_militar).first();
        return res.json({
            TemposAteriores: tempos_anteriores,
            Militar: militar_atualizado
        });
    },
    async addRestricao(req, res) {

        const { matricula } = req.params;
        // id_tipo_restricao: int (obrigatorio)
        // dt_fim: timestamp segundos (obrigatorio)
        const { id_tipo_restricao, dt_fim } = req.body;
        if (!id_tipo_restricao || !dt_fim) {
            return res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos" });
        }
        // id_tipo_restricao deve ser um valor valido
        const tipo_restricao = await connection('TipoRestricao').select('*').where('id_tipo_restricao', '=', id_tipo_restricao);
        if (tipo_restricao.length == 0) {
            return res.status(400).json({ msg: "Tipo de restrição inválido" });
        }
        // dt_fim deve ser um valor valido
        // aqui eu poderia verificar se o valor pe posterior a data atual
        if (dt_fim < 0) {
            return res.status(400).json({ msg: "Data de fim inválida" });
        }
        // militar deve existir
        const militar = await connection('Militares').select('*').where('matricula', '=', matricula);
        if (militar.length == 0) {
            return res.status(400).json({ msg: "Militar não encontrado" });
        }
        // adiciona a restrição no banco
        const restricao = await connection('MilitarRestricao').insert({
            matricula_militar: matricula,
            id_tipo_restricao,
            dt_fim
        });
        // verifica se deu certo
        if (restricao.length == 0) {
            return res.status(400).json({ msg: "Erro ao adicionar restrição" });
        }
        // pega as restrições do militar
        const restricoes = await connection('MilitarRestricao')
            .join('TipoRestricao', 'MilitarRestricao.id_tipo_restricao', '=', 'TipoRestricao.id_tipo_restricao')
            .select('*')
            .where('matricula_militar', '=', matricula);

        return res.json({ Restricoes: restricoes });

    },
    async deleteRestricao(req, res) {
    },
    async getTempoAnterior(req, res) {
        const { matricula } = req.params;
        // verifica se o militar existe
        const militar = await connection('Militares').select('*').where('matricula', '=', matricula);
        if (militar.length == 0) {
            return res.status(400).json({ msg: "Militar não encontrado" });
        }
        // pega o tempo anterior do militar
        const tempo_anterior = await connection('MilitarTempoAnterior')
            .join('TipoTempoAnterior', 'MilitarTempoAnterior.id_tipo_tempo', '=', 'TipoTempoAnterior.id_tipo_tempo')
            .select('*').where('matricula_militar', '=', matricula);
        return res.json({ TempoAnterior: tempo_anterior });
    },
    async updateRestricao(req, res) {
        const {id_restricao} = req.params;
        // id_tipo_restricao: int (opcional)
        // dt_fim: timestamp segundos (opcional)
        const { id_tipo_restricao, dt_fim } = req.body;
        if (!id_tipo_restricao && !dt_fim) {
            return res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos" });
        }
        // id_tipo_restricao deve ser um valor valido
        if (id_tipo_restricao) {
            const tipo_restricao = await connection('TipoRestricao').select('*').where('id_tipo_restricao', '=', id_tipo_restricao);
            if (tipo_restricao.length == 0) {
                return res.status(400).json({ msg: "Tipo de restrição inválido" });
            }
        }
        // dt_fim deve ser um valor valido
        // aqui eu poderia verificar se o valor pe posterior a data atual
        if (dt_fim && dt_fim < 0) {
            return res.status(400).json({ msg: "Data de fim inválida" });
        }
        // militar deve existir
        let militar = await connection('MilitarRestricao').select('*').where('id_restricao', '=', id_restricao).first();
        if (!militar) {
            return res.status(400).json({ msg: "Restrição não encontrada" });
        }
        // verifica se a restrição existe
        let restricao = await connection('MilitarRestricao').select('*').where('id_restricao', '=', id_restricao).first();
        if (!restricao) {
            return res.status(400).json({ msg: "Restrição não encontrada" });
        }
        // atualiza a restrição no banco
        if(id_tipo_restricao){
            restricao.id_tipo_restricao = id_tipo_restricao;
        }
        if(dt_fim){
            restricao.dt_fim = dt_fim;
        }
        await connection('MilitarRestricao').update(restricao).where('id_restricao', '=', id_restricao);
        // pega as restrições do militar
        const restricoes = await connection('MilitarRestricao')
            .join('TipoRestricao', 'MilitarRestricao.id_tipo_restricao', '=', 'TipoRestricao.id_tipo_restricao')
            .select('*')
            .where('matricula_militar', '=', militar.matricula_militar);

        return res.json({ Restricoes: restricoes });
        
       

    },
    async deleteRestricao(req, res) {
        const {id_restricao} = req.params;
        // verifica se a restrição existe
        let restricao = await connection('MilitarRestricao').select('*').where('id_restricao', '=', id_restricao).first();
        if (!restricao) {
            return res.status(400).json({ msg: "Restrição não encontrada" });
        }
        // deleta a restrição
        await connection('MilitarRestricao').delete().where('id_restricao', '=', id_restricao);
        // pega as restrições do militar
        const restricoes = await connection('MilitarRestricao')
            .join('TipoRestricao', 'MilitarRestricao.id_tipo_restricao', '=', 'TipoRestricao.id_tipo_restricao')
            .select('*')
            .where('matricula_militar', '=', restricao.matricula_militar);

        return res.json({ Restricoes: restricoes });
    }
}