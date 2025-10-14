import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/esm/axios.min.js"

const API_BASE_URL = "http://127.0.0.1:5001/gestao-mercado-86b49/us-central1/api"

export const apiClient = axios.create({
    baseURL: API_BASE_URL
})