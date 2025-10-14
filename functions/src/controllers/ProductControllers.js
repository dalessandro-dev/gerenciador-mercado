import ProductServices from "./../services/ProductServices.js"

export default class ProductControllers {
    constructor() {
        this.productServices = new ProductServices()
    }

    health(req, res) {
        return res.status(200).json({mensagem: "ok"})
    }

    async getProducts(req, res) {
        const response = await this.productServices.getProducts()

        return res.status(response.status).json({mensagem: response.mensagem, produtos: response.resposta})            
    }

    async registerProduct(req, res) {
        const response = await this.productServices.registerProduct(req)

        return res.status(response.status).json({mensagem: response.mensagem})
    }

    async deleteProduct(req, res) {
        const response = await this.productServices.deleteProduct(req)

        return res.status(response.status).json({mensagem: response.mensagem})
    }

    async searchProduct(req, res) {
        const response = await this.productServices.searchProduct(req)

        return res.status(response.status).json({mensagem: response.mensagem, produto: response.resposta})
    }

    async updateProduct(req, res) {
        const response = await this.productServices.updateProduct(req)

        return res.status(response.status).json({mensagem: response.mensagem})
    }
}