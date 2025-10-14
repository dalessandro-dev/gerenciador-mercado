import admin from "firebase-admin"

export default class AdminUserServices {
    constructor() {
        this.db = admin.firestore();
        this.auth = admin.auth();
    }

    verifyAdmin(req) {
        if (!req.user.isAdmin) return {mensagem: "Permissão negada! Você não é um administrador.", status: 403}; 
        
        return null
    }

    async registerUser(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification

            const {email, senha, nome, telefone, dataDeNascimento, isAdmin} = req.body || {};

            if (!email || !senha ) return {mensagem: "O e-mail e a senha são obrigatórios.", status: 400}
            
            const userRecord = await this.auth.createUser({
                email,
                password: senha
            })

            await this.auth.setCustomUserClaims(userRecord.uid, { isAdmin })

            console.log("Usuário criado na Autenticação:", userRecord.uid);

            const date = new Date()

            const userProfile = {
                email,
                nome,
                telefone,
                dataDeNascimento,
                isAdmin,
                criadoEm: `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`,
            }

            await this.db.collection("usuarios").doc(userRecord.uid).set(userProfile)

            return {mensagem: "O usuário foi criado com sucesso!", status: 201}
        } catch (error) {
            if (error.code == 'auth/email-already-exists') return {mensagem: `Este e-mail já está em uso.`, status: 400} 

            return {mensagem: `Ocorreu um erro inesperado: ${error.message}`, status: 500}
        }
    }

    async deleteUser(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification

            const { id } = req.params

            if (!id) return {mensagem: "O ID informado não é válido.", status: 400}
            
            await this.auth.deleteUser(id)
            
            console.log(`O usuário '${id}' foi deletado com sucesso.`)

            return {mensagem: "O usuário foi deletado com sucesso!", status: 200}
        } catch (error) {
            return {mensagem: `Ocorreu um erro inesperado ao deletar o usuário: ${error}`, status: 500}
        }
    }

    async getUsers(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification

            const querySnapshot = await this.db.collection("usuarios").get()

            const users = []
            
            querySnapshot.forEach((doc) => {
                users.push({id: doc.id, ...doc.data()})
            })

            return {mensagem: "Os usuários foram encontrados com sucesso.", resposta: users, status: 200}
        } catch (error) {
            return {mensagem: `Um erro inesperado aconteceu: ${error.code}`, status: 500}
        }
    }

    async searchUser(req) {
        try {
            const { id } = req.params

            if (!id) return {mensagem: "O ID informado não é válido.", status: 400}
            
            const verification = this.verifyAdmin(req)

            if ( verification && req.user.uid != id ) return {verification, status: 403}

            const docSnapshot = await this.db.collection("usuarios").doc(id).get()

            if (docSnapshot.exists) {
                return {mensagem: "O usuário foi encontrado com sucesso.", resposta: {id: docSnapshot.id, ...docSnapshot.data()}, status: 200}
            } else {
                return {mensagem: "Nenhum usuário foi encontrado.", status: 404}
            }

        } catch (error) {
            return {mensagem: `Um erro inesperado aconteceu: ${error}`, status: 400}
        }
    }

    async updateUser(req) {
        try {
            const verification = this.verifyAdmin(req)

            if (verification) return verification

            const { id } = req.params
            const data = req.body

            if (!id) return {mensagem: "O ID informado não é válido.", status: 400}

            if ("isAdmin" in data) await this.auth.setCustomUserClaims(id, { isAdmin: data.isAdmin })

            delete data.email;
            delete data.senha;
            delete data.criadoEm;

            const userProfile = {
                ...data
            }

            await this.db.collection("usuarios").doc(id).update(userProfile)

            console.log(`Usuário '${id}' atualizado com sucesso.`)

            return {mensagem: "O usuário foi atualizado com sucesso.", status: 200}
        } catch (error) {
            return {mensagem: `Um erro inesperado aconteceu: ${error.code}`, status: 500}
        }
    }
}
