import {create} from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore.js";
import axios from "axios";
const API_URL="http://localhost:5000/api/sticky";
export const useStickyStore = create (persist((set,get)=>({
    boards:[],
    setBoards: (boards) => set({ boards }),
    currentBoardId:null,
    connections:[],
    loading:false,
    error:null,
    setCurrentBoardId:(boardId)=>{
        set({currentBoardId:boardId})
    },
getAllBoards : async ()=>{
    set({loading:true, error:null})
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.get (`${API_URL}/boards`,{
            headers: {
          Authorization: `Bearer ${token}`,  
        },
        })
        set({boards: res.data, loading:false});
    } catch (error) {
      set({error:error.message, loading:false})
    }
},
createBoard : async ()=>{
    set({loading:true,error:null}); 
    try {
        const token = useAuthStore.getState().token;
        console.log("👉 Token being used for creating board:", token); 
        const res = await axios.post(`${API_URL}/board`,{
            name:"Untitled",
            notes:[],
            connections:[]
        },
       {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },);
        set((state) => ({
            boards: [...state.boards, res.data],
            loading: false,
        }));

        console.log("Board Created:", res.data);
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},
renameBoard: async(boardId,name)=>{
    set({loading:true, error:null});
    try {
          const token = useAuthStore.getState().token;
        const res = await axios.put(`${API_URL}/board/${boardId}/rename`,{
           name
        },
          {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },
    )
        set({
            boards: get().boards.map(board => 
                board._id === boardId ? res.data : board
            )
        })
    } catch (error) {
        set({error:error.message, loading:false});
    }
},
boardChange : async(boardId)=>{
    set ({loading:true, error:null});
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.get(`${API_URL}/board/${boardId}`, 
           
             {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },
        )
         set({
            currentBoardId: boardId,
            boards: get().boards.map(board => 
                board._id === boardId ? res.data : board
            )
        });
        
    } catch (error) {
      set({error:error.message, loading:false});  
    }
},
deleteBoard : async (boardId)=>{
    // set({loading:true,error:null});
     set((state) => ({
    boards: state.boards.filter((board) => board._id !== boardId)
  }));
    try {
         const token = useAuthStore.getState().token;
        const res = await axios.delete(`${API_URL}/board/${boardId}`,
    {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },)
    //     set({response: res.data, boards: get().boards.filter(board => board._id !== boardId)});
    } catch (error) {
        set({error:error.message, loading:false});
    }
},
createNote : async (boardId,noteData)=>{
    set({loading:true, error:null});
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.post(`${API_URL}/board/${boardId}/note`,noteData,
    {
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },)
    const newNote = res.data;
     set((state) => ({
            boards: state.boards.map((board) =>
                board._id === boardId
                    ? { ...board, notes: [...board.notes, newNote] } 
                    : board
            ),
            loading: false,
        }));
    } catch (error) {
        set({error:error.message, loading:false});
    }
},
updateNote : async (boardId,noteId,data)=>{
    set({loading:true, error:null});
    try {
         const token = useAuthStore.getState().token;
         
        const res= await axios.put(`${API_URL}/board/${boardId}/note/${noteId}`,
            {text:data.text, color:data.color, x:data.x, y:data.y, height:data.height, width:data.width}, 
            { 
        headers: {
          Authorization: `Bearer ${token}`,  
        }, 
    },
        )
        const updatedNote = res.data;
        set((state) => ({
            boards: state.boards.map((board) =>
                board._id === boardId
                    ? {
                        ...board,
                        notes: board.notes.map((note) =>
                            note._id === noteId ? updatedNote : note
                        ),
                    }
                    : board
            ),
            
        }));
    } catch (error) {
        set({error:error.message, loading:false});
    }
},
deleteNote : async(boardId,noteId)=>{
       set((state) => ({
            boards: state.boards.map(b => {
                if (b._id !== boardId) return b;
                return {
                    ...b,
                    notes: b.notes.filter(n => n._id !== noteId)
                };
            })
        })); 
    try {
            const token = useAuthStore.getState().token;
        const res = await axios.delete(`${API_URL}/board/${boardId}/note/${noteId}`, 
            {headers: 
                { Authorization: `Bearer ${token}` }
            }
        )
     
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},
createConnection: async (boardId,fromNoteId,toNoteId)=>{
    set({loading:true, error:null})
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.post(`${API_URL}/board/${boardId}/connection`,
            {fromNoteId, toNoteId}, {
            headers: {
            Authorization: `Bearer ${token}`,
            }}
        )
        set((state) => ({
            boards: state.boards.map(board =>
                board._id === boardId
                    ? { ...board, connections: [...board.connections, res.data] }
                    : board
            )
        }));

    } catch (error) {
         set({error:error.message, loading:false}); 
    }
},
deleteConnection : async (boardId,connectionId)=>{
    console.log(boardId,connectionId)
     set((state) => ({
        boards: state.boards.map((b) =>
            b._id === boardId
                ? {
                      ...b,
                      connections: b.connections.filter((c) => c._id !== connectionId),
                  }
                : b
        ),
    }));
    try {
            const token = useAuthStore.getState().token;
        const res = await axios.delete (`${API_URL}/board/${boardId}/connection/${connectionId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    
                },
              
            }
        )
        console.log(res.data);
    } catch (error) {
        console.error(error);
        set({error:error.message, loading:false});
    }
},


})))