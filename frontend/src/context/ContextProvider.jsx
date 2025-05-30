import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from "axios";
const authContext= createContext();

function ContextProvider({children}) {
    const [user, setUser]= useState(null);
    const login = (user)=>{
        setUser(user)
    }

    const logout = ()=>{
      localStorage.removeItem('token')
      setUser(null)
    }

    useEffect(()=>{

        const verifyUser = async()=>{
            try{
                const response = await axios.get("http://54.172.174.96:5000/api/auth/verify", {headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              
           }})
                if(response.data.success){
                    setUser(response.data.user)
                }
                else{
                    setUser(null)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        verifyUser()
    }
    ,[])

  return (
    <authContext.Provider value={{user, login, logout}}>{children}</authContext.Provider>
  )
};

export const useAuth=()=>useContext(authContext);

export default ContextProvider
