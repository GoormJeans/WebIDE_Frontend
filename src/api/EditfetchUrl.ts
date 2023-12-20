import axios from "axios";
import instance from "./axios";


const requests : {
    fetchFiletree : string
} = {
    fetchFiletree : '/algorithm/'
};



export const getSelect = async () =>{
    try{

    }catch(e)
    {
        
    }
}

export const Delete = async (number : string, filename : string) =>{
    try{
        const resp = await instance.Delete(requests.fetchFiletree+"/"+number+"/"+filename);
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
        const resp = await instance.get(requests.fetchFiletree+"/**");
        return resp;
    }catch(e)
    {
        return false;
    }
}