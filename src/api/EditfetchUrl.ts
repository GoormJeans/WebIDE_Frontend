// import axios from "axios";
import instance from "./axios";


const requests : {
    fetchFiletree : string
} = {
    fetchFiletree : 'editor/filetrees/'
};



export const getSelect = async () =>{
    try{

    }catch(e)
    {
        
    }
}

export const Delete = async (number : string, filename : string) =>{
    try{
        const resp = await instance.Delete(requests.fetchFiletree+"/"+number);
        return resp;
    }catch(e)
    {
        return false;
    }
}

export const CreateFolder = async () =>{
    try{

    }catch(e)
    {
        
    }
}

export const CreateFile = async () =>{
    try{

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