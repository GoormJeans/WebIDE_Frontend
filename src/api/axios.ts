import axios from "axios"

const instance : any = axios.create({
    baseURL : ''
})

export default instance;