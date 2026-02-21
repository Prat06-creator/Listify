import {create} from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore.js";
import axios from "axios";

const API_URL=import.meta.env.VITE_BACKEND_URL + "/api/todo";
export const useTodoStore = create (persist((set,get)=>({
    currentTodo:null,
    setCurrentTodo:(todo)=>{
        set({currentTodo:todo});
    },
    loading:false,
    error:null,
   monthlyTasks:[],
   dailyTasks:[],
   weeklyTasks:[],
    getAllTodos : async ()=>{
        set({loading:true, error:null});
        try {
            const token = useAuthStore.getState().token;
            const res = await axios.get (`${API_URL}/todolist`,{
                headers: {
              Authorization: `Bearer ${token}`,  
            },
            })
            const todo=res.data;
            const normalizedDays = (todo?.days || []).map(task => ({
      ...task,
      date: new Date(task.date).toISOString().split('T')[0], 
    }));
            set({currentTodo:todo,monthlyTasks:todo?.months||[],  weeklyTasks:todo?.weeks||[], dailyTasks:normalizedDays, loading:false});
        } catch (error) {
          set({error:error.message, loading:false})
        }
    },
    deleteEvent : async (todoId, dayId)=>{
    set({loading:true, error:null});
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.delete(`${API_URL}/todolist/${todoId}/dailyevent/${dayId}`,{headers: { Authorization: `Bearer ${token}` }});
        set((state) => ({
        dailyTasks: state.dailyTasks.filter((task) => task._id !== dayId),
        currentTodo: {
            ...state.currentTodo,
            days: state.currentTodo?.days.filter((task) => task._id !== dayId)
        },
        }))
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},

     updateEvent : async (todoId, dayId, dayData)=>{
    set({loading:true, error:null});
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.put(`${API_URL}/todolist/${todoId}/dailyevent/${dayId}`,dayData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,  
                },
            })
        const updatedEvent = res.data;
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === todoId
          ? {
              ...todo,
              days: todo.days.map((day) =>
                day._id === dayId ? updatedEvent : day
              ),
            }
          : todo
      ),
      loading: false,
    }));
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},

    addEvent : async (todoId,eventData)=>{
        set({loading:true, error:null});
        try {
            const token = useAuthStore.getState().token;
            const res = await axios.post(`${API_URL}/todolist/${todoId}/dailyevent`,eventData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,  
                }, 
            },)
            const newEventData = res.data;
             set ((state)=>{
        return {
            dailyTasks:[...(state.dailyTasks||[]), newEventData],
            currentTodo:{
                ...state.currentTodo,
                days:[...(state.currentTodo?.days||[]), newEventData]
            },
            loading:false
        }
    })
        } catch (error) {
            set({error:error.message, loading:false});
        }
    },
    addDailyTask : async (todoId,dayData)=>{
        set({loading:true, error:null});
        try {
            const token = useAuthStore.getState().token;
            const res = await axios.post(`${API_URL}/todolist/${todoId}/daily`,dayData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,  
                }, 
            },)
    const newDayData = res.data;
                set ((state)=>{
        return {
            dailyTasks:[...(state.dailyTasks||[]), newDayData],
            currentTodo:{
                ...state.currentTodo,
                days:[...(state.currentTodo?.days||[]), newDayData]
            },
            loading:false
        }
    })
           } catch (error) {
            set({error:error.message, loading:false});
        }
    },

    updateDailyTask : async (todoId, dayId, dayData)=>{
    set({loading:true, error:null});
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.put(`${API_URL}/todolist/${todoId}/daily/${dayId}`,dayData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,  
                },
            })
        const updatedTask = res.data;
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === todoId
          ? {
              ...todo,
              days: todo.days.map((day) =>
                day._id === dayId ? updatedTask : day
              ),
            }
          : todo
      ),
      loading: false,
    }));
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},




deleteDailyTask : async (todoId, dayId)=>{
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.delete(`${API_URL}/todolist/${todoId}/daily/${dayId}`,{headers: { Authorization: `Bearer ${token}` }});
         set((state) => ({
      dailyTasks: state.dailyTasks.filter((day) => day._id !== dayId),
      currentTodo: {
        ...state.currentTodo,
        days: state.currentTodo.days.filter((day) => day._id !== dayId),
      },
      loading: false,
    }));
} catch (error) {
       set({error:error.message, loading:false}); 
    }
},

    addMonthlyGoal : async (todoId,monthData)=>{
        set({loading:true, error:null});
        try {
            const token = useAuthStore.getState().token;
            const res = await axios.post(`${API_URL}/todolist/${todoId}/monthly`,monthData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,  
                }, 
            },
            )
            const newMonthData = res.data;
                set((state) => ({
                    monthlyTasks: [...state.monthlyTasks||[], newMonthData],
                currentTodo: {
                    ...state.currentTodo,
                    months: [...state.currentTodo?.months, newMonthData]
                },
                
                loading: false
            }));
        } catch (error) {
            set({error:error.message, loading:false});
        }

    },
    updateMonthlyGoal : async (todoId, monthId, monthData)=>{
    set({loading:true, error:null});
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.put(`${API_URL}/todolist/${todoId}/monthly/${monthId}`,monthData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,  
                },
            })
        const updatedMonth = res.data;
        set((state) => {
      // update currentTodo
      const updatedMonths = state.currentTodo?.months.map((month) =>
        month._id === monthId ? updatedMonth : month
      );

      return {
        currentTodo: {
          ...state.currentTodo,
          months: updatedMonths,
        },
        monthlyTasks: updatedMonths, // update the list
        loading: false,
      };
    });
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},
deleteMonthlyGoal : async (todoId, monthId)=>{
    set((state)=>{
        return {loading:true, error:null, monthlyTasks: state.monthlyTasks.filter((month) => month._id !== monthId)};
    })
     
    try {
        const token = useAuthStore.getState().token;
         await axios.delete(`${API_URL}/todolist/${todoId}/monthly/${monthId}`,{
            headers: { Authorization: `Bearer ${token}` }});
        await useTodoStore.getState().getAllTodos();

      
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},

    addWeeklyTask : async (todoId,weekData)=>{
        set({loading:true, error:null});
        try {
            const token = useAuthStore.getState().token;
            const res = await axios.post(`${API_URL}/todolist/${todoId}/weekly`,weekData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,  
                }, 
            },
            )
            const newWeekData = res.data;
                 set((state) => ({
                     weeklyTasks: [...(state.weeklyTasks||[]), newWeekData],
                     currentTodo: {
                         ...state.currentTodo,
                         weeks: [...(state.currentTodo?.weeks||[]), newWeekData]
                     },
                     loading: false
                 }))
        } catch (error) {
            set({error:error.message, loading:false});
        }

    },
updateWeeklyTask : async (todoId, weekId, weekData)=>{
    set({loading:true, error:null});
    try {
        const token = useAuthStore.getState().token;
        const res = await axios.put(`${API_URL}/todolist/${todoId}/weekly/${weekId}`,weekData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,  
                },
            })
        const newWeekData = res.data;
       set((state) => {
      // update currentTodo
      const updatedWeeks = state.currentTodo?.weeks.map((week) =>
        week._id === weekId ? newWeekData : week
      );

      return {
        currentTodo: {
          ...state.currentTodo,
          weeks: updatedWeeks,
        },
        weeklyTasks: updatedWeeks, // update the list
        loading: false,
      };
    });
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},
deleteWeeklyTask : async (todoId, weekId)=>{
    set({loading:true, error:null});
    try {
        const token = useAuthStore.getState().token;
         await axios.delete(`${API_URL}/todolist/${todoId}/weekly/${weekId}`,{headers: { Authorization: `Bearer ${token}` }});
        
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo._id === todoId
                    ? { ...todo, weeks: todo.weeks.filter((week) => week._id !== weekId) } 
                    : todo
            ),
            loading: false,
        }));
    } catch (error) {
       set({error:error.message, loading:false}); 
    }
},
    





}
),
{name:"todo-storage"}
))
