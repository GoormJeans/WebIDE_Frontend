// import axios from "axios";
import instance from "./axios";


const requests : {
    fetchFiletree : string
    delete : string,
    create : string,
    modify : string,
} = {
    fetchFiletree : 'editor/filetrees/',
    delete : 'editor/delete',
    create : 'editor/filecreate',
    modify : 'editor/modification'
};



export const getSelect = async () =>{
    try{

    }catch(e)
    {
        return undefined;
    }
}

export const Delete = async (key : string, number : number) =>{
    try{
        const data = {
            deletePathSuffix : key,
            algorithmId : number
        }
        const accessToken = localStorage.getItem('AccessToken');
        console.log(accessToken);
        const resp = await instance.post(requests.delete,JSON.stringify(data),{headers: {
            'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
            accept: 'application/json',"Content-Type": `application/json`,
            
          },} );
        return resp;
    }catch(e)
    {
        return undefined;
    }
}

export const Create = async (key : string, number : number) =>{
    try{
        const Path = key;
        const data = {
            createPath : Path,
            algorithmId : number
        }
        const accessToken = localStorage.getItem('AccessToken');
        console.log(accessToken);
        const resp = await instance.post(requests.create,JSON.stringify(data),{headers: {
            'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
            accept: 'application/json',"Content-Type": `application/json`,
            
          },} );
        return resp;
    }catch(e)
    {
        return undefined;
    }
}
export const dragNdrop = async (bkey : string ,key : string, number : number) =>{
    try{
        const Path = key;
        const data = {
            beforePath : bkey,
            afterPath : Path,
            algorithmId : number
        }
        const accessToken = localStorage.getItem('AccessToken');
        console.log(accessToken);
        const resp = await instance.patch(requests.modify,JSON.stringify(data),{headers: {
            'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
            accept: 'application/json',"Content-Type": `application/json`,
            
          },} );
        return resp;
    }catch(e)
    {
        return undefined;
    }
}
export const SaveFile = async () =>{
    try{

    }catch(e)
    {
        return undefined;   
    }
}
export const getFiletree = async ( number : string) =>{
    try{
        const accessToken = localStorage.getItem('AccessToken');
        const str = 'Bearer ' + accessToken;
        console.log(str);
        const resp = await instance.get(requests.fetchFiletree +  number, {
            headers: {
              'Authorization': str, // 헤더에 토큰을 포함시킵니다.
            },
          });
        return resp;
    }catch(e)
    {
        console.log(e);
        return undefined;
    }
}