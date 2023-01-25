import axios from "axios";
import {  setUser } from "../store/appReducer";


export const registration = async(email:string, password:string, name:string)=>{
    try{
        const response = await axios.post("http://localhost:5000/api/auth/registration",{
            email,
            password,
            name 
        })
      alert(response.data.message);
    } catch(e){
      if (axios.isAxiosError(e))  {
        alert(e.response?.data.message );
      } 
    
        
      
    }
   
}

export const login = (email:string, password:string, name:string)=>{
    return async (dispatch:any) =>{
        try{
            const response = await axios.post("http://localhost:5000/api/auth/login",{
                email,
                password,
                name 
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem("token",response.data.token)
        } catch(e){
          if (axios.isAxiosError(e))  {
            alert(e.response?.data.message );
          } 
        }

    }
  
   
}

export const Authorization = ()=>{
    return async (dispatch:any) =>{
        try{
            const response = await axios.get("http://localhost:5000/api/auth/auth",{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem("token",response.data.token)
        } catch(e){
          if (axios.isAxiosError(e))  {
            alert(e.response?.data.message );
            localStorage.removeItem('token');
          } 
        }

    }
  
   
}