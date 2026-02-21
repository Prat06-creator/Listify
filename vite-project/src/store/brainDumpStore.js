import {create} from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore.js";
import axios from "axios";
const API_URL=import.meta.env.VITE_BACKEND_URL + "/api/brainDump"
export const useBrainDumpStore = create (persist((set,get)=>({
    entries:[],
    setEntries:(entries)=>{
        set({entries:entries})
    },
    currentEntryId:null,
    setCurrentEntryId:(entryId)=>{
        set({currentEntryId:entryId})
    }, 
    loading:false, error:null,
    getEntries: async ()=>{
        const token = useAuthStore.getState().token;
        set({loading:true, error:null});
        try{
            const res = await axios.get(`${API_URL}/brainDump`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            set({entries:res.data, loading:false});
        }catch(error){
            set({error:error.message, loading:false});
        }
    },
    createEntry : async (newEntryData)=>{
    set({loading:true,error:null}); 
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.post(`${API_URL}/entry`,{
         title:newEntryData.title,
         content:newEntryData.content||"",
        photos:newEntryData.photos||[], backgroundColor:newEntryData.backgroundColor||"#E0F2FE", category:newEntryData.category||"general", 
        date:new Date().toISOString(),
        bold:newEntryData.bold||false,
        italic:newEntryData.italic||false,
        underline:newEntryData.underline||false
        },
       {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },);
        set((state) => ({
            entries: [...state.entries, res.data],
            loading: false,
        }));

        console.log("entry Created:", res.data);
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},
    updateEntry: async (entryId, updatedData)=>{
        set({loading:true,error:null});
        try{
            const token = useAuthStore.getState().token;
            const  res = await axios.put(`${API_URL}/brainDump/${entryId}`, 
            {title: updatedData.title,
            content: updatedData.content,
            photos: updatedData.photos,
            backgroundColor: updatedData.backgroundColor,
            category: updatedData.category, bold: updatedData.bold, italic: updatedData.italic, underline: updatedData.underline},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            set((state) => ({
            entries: state.entries.map((e) =>
              e._id === entryId ? res.data : e
            ),
            loading: false,
          }));
        }catch{
            set({error:error.message, loading:false});
        }
    },
    entryChange: async (entryId)=>{
        set({loading:true,error:null});
        try {
            const token = useAuthStore.getState().token;
        const res = await axios.get(`${API_URL}/entries/${entryId}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        set({
            currentEntryId: entryId,
            entries: get().entries.map(entry => 
                entry._id === entryId ? res.data : entry
            )
        });
        } catch (error) {
            set({error:error.message, loading:false});
        }
        
    },
    deleteEntry: async (entryId)=>{
        // set({loading:true,error:null});
         set((state) => ({
    entries: state.entries.filter((entry) => entry._id !== entryId)
  }));
        try {
            const token = useAuthStore.getState().token;
            await axios.delete(`${API_URL}/brainDump/${entryId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            await useBrainDumpStore.getState().getEntries();
        } catch (error) {
            set({error:error.message, loading:false});
        }
    }
    

})));