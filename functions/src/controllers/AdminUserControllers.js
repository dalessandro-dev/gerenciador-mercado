import UserServices from "./../services/AdminUserServices.js"

export default class AdminUserControllers {
    constructor() {
        this.userServices = new UserServices()
    }

    health(req, res) {
        return res.status(200).json({mensagem: "ok"})
    }

    async getUsers(req, res) {
        const response = await this.userServices.getUsers(req)

        return res.status(response.status).json({mensagem: response.mensagem, usuarios: response.resposta})            
    }

    async registerUser(req, res) {
        const response = await this.userServices.registerUser(req)

        return res.status(response.status).json({mensagem: response.mensagem})
    }

    async deleteUser(req, res) {
        const response = await this.userServices.deleteUser(req)

        return res.status(response.status).json({mensagem: response.mensagem})
    }

    async searchUser(req, res) {
        const response = await this.userServices.searchUser(req)

        return res.status(response.status).json({mensagem: response.mensagem, usuario: response.resposta})
    }

    async updateUser(req, res) {
        const response = await this.userServices.updateUser(req)

        return res.status(response.status).json({mensagem: response.mensagem})
    }
}