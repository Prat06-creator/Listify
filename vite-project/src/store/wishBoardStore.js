import {create} from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore.js";
import axios from "axios";
const API_URL=import.meta.env.VITE_BACKEND_URL + "/api/wishBoard"
export const useWishBoardStore = create ((set,get)=>({
    boards:[],
    setBoards: (boards) => set({ boards }),
    currentBoardId:null,
    setCurrentBoardId: (boardId) => set({ currentBoardId: boardId }),
    item:[],
    loading:false,
    error:null,
getBoards : async ()=>{
    set({loading:true, error:null})
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.get (`${API_URL}/`,{
            headers: {
          Authorization: `Bearer ${token}`,  
        },
        })
        set({boards: res.data, loading:false});
    } catch (error) {
      set({error:error.message, loading:false})
    }
},

createsBoard : async ({type,period})=>{
    set({loading:true,error:null});
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.post(`${API_URL}/board`,{
            type,
            period
        },{ headers: { Authorization: `Bearer ${token}` } });
     const newBoardData=res.data;
     set ((state) => ({
        boards: [...state.boards, newBoardData],
        loading: false,
      }));
} catch (error) {
        set({error:error.message, loading:false});
    }
},
updatesBoard: async(boardId,updates)=>{
    set({loading:true, error:null});
    try {
          const token = useAuthStore.getState().token;
        const res = await axios.put(`${API_URL}/board/${boardId}`, updates
        ,
          {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },
    ) 
    set((state) => ({
      boards: state.boards.map((b) =>
        b._id === boardId ? res.data : b
      ),
      currentBoard:
        state.currentBoardId === boardId ? res.data : state.currentBoard,
        loading: false,
    }));
    } catch (error) {
        set({error:error.message, loading:false});
    }
},
deletesBoard : async (boardId)=>{
     set ((state) => ({
        boards: state.boards.filter((board) => board._id !== boardId)
      }));
    try {
         const token = useAuthStore.getState().token;
        const res = await axios.delete(`${API_URL}/${boardId}`,
    {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },
    )
    } catch (error) {
        set({error:error.message, loading:false});
    }
},
addsItem: async(boardId,newItem)=>{
    set({loading:true, error:null});
    try {
      const token = useAuthStore.getState().token;
      const res = await axios.post(`${API_URL}/board/${boardId}/item`, newItem,
    {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },
    )
   set((state) => ({
          boards: state.boards.map((b) => (b._id === boardId ? res.data : b)),
          loading: false,
        }));
        return res.data;
    } catch (error) {
      set({error:error.message, loading:false});
    }
},
updatesItem: async(boardId,itemId,updates)=>{
    set({loading:true, error:null});
    try {
      const token = useAuthStore.getState().token;
      const res = await axios.put(`${API_URL}/board/${boardId}/item/${itemId}`, updates,
    {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },
    ) 
    set((state) => ({
          boards: state.boards.map((b) => (b._id === boardId ? res.data : b)),
          loading: false,
        }));
        return res.data;
    } catch (error) {
      set({error:error.message, loading:false});
    }
},
deletesItem: async(boardId,itemId)=>{
    set({loading:true, error:null});
    try {
      const token = useAuthStore.getState().token;
      const res = await axios.delete(`${API_URL}/board/${boardId}/item/${itemId}`,
    {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },
    ) 
    set((state) => ({
      boards: state.boards.map((b) =>
        b._id === boardId ? res.data : b
      ),
      loading: false,
    }));

    return res.data;
    } catch (error) {
      set({error:error.message, loading:false});
    }
}

}
))