import axios from "axios"

const instance = axios.create({
    baseURL: 'https://gamesback-jeza.onrender.com'
})

export default instance


