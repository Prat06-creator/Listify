import {create} from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore.js";
import axios from "axios";
const API_URL=import.meta.env.VITE_BACKEND_URL + "/api/budgetTracker"; 
export const useBudgetTrackerStore= create(persist((set,get)=>({
    budgets:[], loading:false, error:null,
    expenses:[],
    getExpense: async ()=>{
        const token = useAuthStore.getState().token;
        set({loading:true, error:null});
        try{
            const res = await axios.get(`${API_URL}/`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            set({budgets:res.data, loading:false});
        }catch(error){
            set({error:error.message, loading:false});
        }
    },
    addBudget: async (month, year, budget)=>{
    set({loading:true,error:null}); 
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.post(`${API_URL}/budget`,{
            month,
            year,
            budget,
        },{
            headers: {
              Authorization: `Bearer ${token}`,  
            }, 
        });
        set((state) => ({
            budgets: [...state.budgets, res.data],
            loading: false,
        }));
        return res.data;
    } catch (error) {
       set({error:error.message, loading:false});
    }
    },
    addExpense: async (month, year, date, amount, description, category) => {
  set({ loading: true, error: null });

  try {
    const token = useAuthStore.getState().token;

    const res = await axios.post(
      `${API_URL}/expense`,
      { month, year, date, amount, description, category },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    set((state) => ({
      budgets: state.budgets.map(b =>
        b._id === res.data._id ? res.data : b
      ),
      loading: false
    }));

    return res.data;
  } catch (error) {
    set({ error: error.message, loading: false });
  }
},
deleteExpense: async (expenseId) => {
    set({ loading: true, error: null });
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.delete(`${API_URL}/expense/${expenseId}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { month, year }
        });
        set((state) => ({
            budgets: state.budgets.map(b =>
                b._id === res.data._id ? res.data : b
            ),
            loading: false
        }));
        return res.data;
    } catch (error) {
        set({ error: error.message, loading: false });
    }
}
    
})));