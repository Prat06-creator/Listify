import {create} from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
const API_URL=import.meta.env.VITE_BACKEND_URL + "/api/auth"
axios.defaults.withCredentials=true
export const useAuthStore= create(persist((set,get)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    email:null,
     token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
     signup:async(email,username)=>{
        console.log("👉 Signing up with:", { email, username }); 
        set({isLoading:true, error:null})
        try{
            const response = await axios.post(`${API_URL}/signup`, {email,username},
              {headers:{"Content-Type":"application/json"},withCredentials:true}
            );
            set ({ isLoading:false, email
            })
            return response.data
        }
        catch(error){
            set ({error:error.response.data.error||"Error signing up" ,isLoading:false})
            throw error;

        }
     },
verifyEmail: async (code)=>{
         set ({isLoading:true, error:null})
         try{
            const email=get().email
            console.log("👉 Email being used for verification:", email);
console.log("👉 Code being used:", code);
             const response = await axios.post(`${API_URL}/emailAuthentication`, {email,code},
                {withCredentials:true}
             );
             set ({user:response.data.user,
               isAuthenticated:true, isLoading:false, email})
             return response.data
         }
         catch(error){
             set ({error:error.response?.data?.error||"Error verifying email" ,isLoading:false})
             throw error;
 
         }
     },
login: async (email) => {
  set({ isLoading: true, error: null });
  try {
    const res = await axios.post(`${API_URL}/login`, { email });
    set({
      user: res.data.user,
      isAuthenticated: true,
      isLoading: false,
    });
    return res.data;
  } catch (error) {
    set({
      error: error.response?.data?.message || "Login failed",
      isLoading: false,
    });
    throw error;
  }
},

getUserProfile: async () => {
  set({ isCheckingAuth: true });
  try {
    const res = await axios.get(`${API_URL}/profile`);
    set({
      user: res.data.user,
      isAuthenticated: true,
      isCheckingAuth: false,
    });
  } catch (error) {
    set({ isAuthenticated: false, isCheckingAuth: false });
  }
}}),
{
    name: "auth-storage",
      getStorage: () => localStorage,
}))