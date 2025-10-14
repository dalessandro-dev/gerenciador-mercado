import admin from "firebase-admin"

export default class ProductServices {
    constructor() {
        this.db = admin.firestore();
    }

    verifyAdmin(req) {
        if (!req.user.isAdmin) return {mensagem: "Permissão negada! Você não é um administrador.", status: 403}; 
        
        return null
    }

    async registerProduct(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification

            const {nome, preco, quantidade, categoria} = req.body || {};

            if (!nome || !quantidade || !preco || !categoria) {
                return {mensagem: "Todos os campos são obrigatórios.", status: 400}
            }

            const product = {
                nome,
                preco,
                quantidade,
                categoria,
                criadoEm: admin.firestore.FieldValue.serverTimestamp(),
            }

            await this.db.collection("produtos").add(product)

            return {mensagem: "O produto foi criado com sucesso!", status: 201}
        } catch (error) {
            return {mensagem: `Ocorreu um erro inesperado: ${error}`, status: 500}
        }
    }

    async deleteProduct(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification

            const { id } = req.params

            if (!id) {
                return {mensagem: "O ID informado não é válido.", status: 400}
            }

            await this.db.collection("produtos").doc(id).delete()

            console.log(`O produto '${id}' foi deletado com sucesso.`)

            return {mensagem: "O produto foi deletado com sucesso!", status: 200}
        } catch (error) {
            return {mensagem: `Ocorreu um erro inesperado ao deletar o produto: ${error}`, status: 500}
        }
    }

    async getProducts(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification

            const querySnapshot = await this.db.collection("produtos").get()

            const products = []
            
            querySnapshot.forEach((doc) => {
                products.push({id: doc.id, ...doc.data()})
            })

            return {mensagem: "Os produtos foram encontrados com sucesso.", resposta: products, status: 200}
        } catch (error) {
            return {mensagem: `Um erro inesperado aconteceu: ${error}`, status: 500}
        }
    }

    async searchProduct(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification

            const { id } = req.params

            if (!id) return {mensagem: "O ID informado não é válido.", status: 400}

            const docSnapshot = await this.db.collection("produtos").doc(id).get()

            if (docSnapshot.exists) {
                return {mensagem: "O produto foi encontrado com sucesso.", resposta: {id: docSnapshot.id, ...docSnapshot.data()}, status: 200}
            } else {
                return {mensagem: "Nenhum produto foi encontrado.", status: 404}
            }
        } catch (error) {
            return {mensagem: `Um erro inesperado aconteceu: ${error}`, status: 400}
        }
    }

    async updateProduct(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification
            
            const { id } = req.params
            const data = req.body

            if (!id) {
                return {mensagem: "O ID informado não é válido.", status: 400}
            }

            const product = {
                ...data
            }

            console.log(product)

            await this.db.collection("produtos").doc(id).update(product)

            console.log(`O produto '${id}' foi atualizado com sucesso.`)

            return {mensagem: "O produto foi atualizado com sucesso.", status: 200}
        } catch (error) {
            return {mensagem: `Um erro inesperado aconteceu: ${error.code}`, status: 500}
        }
    }
}
