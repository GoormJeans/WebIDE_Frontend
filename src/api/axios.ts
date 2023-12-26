import axios from "axios"

const instance : any = axios.create({
    baseURL : 'http://goojeans-webide-docker.ap-northeast-2.elasticbeanstalk.com'
})

export default instance;