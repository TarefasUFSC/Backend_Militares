const connection = require("../../database/connection");
module.exports = {

    async getResumo(req, res) {
        return res.json({ msg: "Resumo" });
    },
    async getFormacoes(req, res) {
        return res.json({ msg: "Resumo" });
    },
    async getLinguas(req, res) {
        return res.json({ msg: "Resumo" });
    }


}