import axios from "axios"
let accessToken = localStorage.getItem('AccessToken');
let str = 'Bearer ' + accessToken;
export const init = ()=>{
    accessToken = localStorage.getItem('AccessToken');
    str = 'Bearer ' + accessToken;
}
export const instance : any =
    axios.create({
    baseURL : 'https://eb.goojeans-server.com/',
    headers : {
        'Authorization': str, // 헤더에 토큰을 포함시킵니다.
    }});
export const instanceJSON : any = 
    axios.create({
    baseURL : 'https://eb.goojeans-server.com/',
    headers : {
        'Authorization': str, // 헤더에 토큰을 포함시킵니다.
        accept: 'application/json',"Content-Type": `application/json`,
    }});

export default instance;