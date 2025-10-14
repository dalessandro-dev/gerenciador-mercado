import UsersServices from "./../services/UsersServices.js"

export default class UsersControllers {
    constructor() {
        this.usersServices = new UsersServices()
    }

    health(req, res) {
        return res.status(200).json({ mensagem: "ok" })
    }

    async setRole(req, res) {
        const response = await this.usersServices.setRoleUser(req)

        return res.status(response.status).json({mensagem: response.mensagem, produtos: response.resposta})   
    }
}