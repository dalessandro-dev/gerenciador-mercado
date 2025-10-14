import admin from "firebase-admin"

export default class UsersServices {
    constructor() {
        this.auth = admin.auth();
        this.db = admin.firestore();
    }

    async setRoleUser(req) {
        const { id } = req.params

        try {
            const docSnap = await this.db.collection("usuarios").doc(id).get()
            
            if (!docSnap.exists) return { mensagem: "Usuário não encontrado.", status: 404 }
    
            if ("isAdmin" in docSnap.data()) return {mensagem: "O perfil do usuário já foi configurado.", status: 403}

            await this.auth.setCustomUserClaims(id, { isAdmin: false })
            await this.db.collection("usuarios").doc(id).set({ isAdmin: false}, { merge: true })

            console.log(`Perfil do usuário com o UID: ${id} configurado com sucesso.`);

            return {mensagem: "O perfil do usuário foi configurado com sucesso.", status: 200}
        } catch (error) {
            console.error(`Erro ao configurar a função do perfil do usuário: ${id}`, error);

            return {mensagem: `Ocorreu um erro ao configurar o perfil do usuário: ${error}`, status: 500};
        }
    }
}


