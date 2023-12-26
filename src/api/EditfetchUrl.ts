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
        
    }
}

export const Delete = async (key : string, number : number) =>{
    try{
        const data = {
            deletePathSuffix : key,
            algorithmId : number
        }
        const resp = await instance.post(requests.delete,JSON.stringify(data),{headers: {
            accept: 'application/json',"Content-Type": `application/json`,
          },} );
        return resp;
    }catch(e)
    {
        return false;
    }
}

export const Create = async (key : string, number : number) =>{
    try{
        const Path = key;
        const data = {
            createPath : Path,
            algorithmId : number
        }
        const resp = await instance.post(requests.create,JSON.stringify(data),{headers: {
            accept: 'application/json',"Content-Type": `application/json`,
          },} );
        return resp;
    }catch(e)
    {
        
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
        const resp = await instance.patch(requests.modify,JSON.stringify(data),{headers: {
            accept: 'application/json',"Content-Type": `application/json`,
          },} );
        return resp;
    }catch(e)
    {
        
    }
}
export const SaveFile = async () =>{
    try{

    }catch(e)
    {
        
    }
}
export const getFiletree = async ( number : string) =>{
    try{
        const resp = await instance.get(requests.fetchFiletree+'1');
        console.log(123);
        return resp;
    }catch(e)
    {
        console.log(e);
    }
}