
module.exports = {

    async getMilitaresAposentados(req, res) {
        return res.json({ msg: "Militares Aposentados" });
    },
    async getMilitarByMatricula(req, res) {
        const {matricula} = req.params;
        return res.json({ msg: "Militar com a matricula: " + matricula });
    }


}