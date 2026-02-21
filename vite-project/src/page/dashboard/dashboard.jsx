import React from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { ChatbotPanel } from "./aiChatbot/chatbot.jsx";
import Todolist from "./todolist.jsx";
import BudgetTrackerCard from './budgetTracker';
import QuoteOfTheDay from './quoteoftheday.jsx';
import JournalEntryCard from "../brainDump.jsx/journalEntryCard.jsx";
import { useAuthStore } from "../../store/authStore.js";
import Navbar from "../../components/navbar.jsx";
import './border.css'
import { useBudgetTrackerStore } from "../../store/budgetTracker.js";
import { useBrainDumpStore } from "../../store/brainDumpStore.js";
import {
    faListCheck,
    faNoteSticky,
    faHandHoldingHeart,
    faPen,faMoneyBillTrendUp

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Dashboard() {
    const getUserProfile = useAuthStore((state) => state.getUserProfile);
    
      useEffect(() => {
        getUserProfile(); // ✅ This will fetch username from backend using cookie
      }, []);
      const navigate = useNavigate();
      const { budgets } = useBudgetTrackerStore();
      const {entries}=useBrainDumpStore();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const currentBudget = budgets?.find(
    b => b.month === month && b.year === year
  );
  const expenses = currentBudget?.expenses || [];
  const total = currentBudget?.budget || 0;
  const spent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = total - spent;
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2); 
  return (
    <div className=" relative h-screen bg-[linear-gradient(135deg,#FBC2EB_0%,#A18CD1_30%,#8EC5FC_70%,#E0C3FC_100%)]
    p-4 md:p-6 overflow-y-auto md:overflow-hidden">
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="absolute top-4 -right-5 md:top-2 md:right-3 z-50"><Navbar /></div>
          <div className="">
            <h1 className="text-4xl  font-bold text-gray-800">Homebase</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your day at a glance.</p>
          </div>
        <div  className="bg-white/50 backdrop-blur-sm rounded-4xl
    flex items-center
    gap-12 md:gap-0
    px-4 py-2
    w-full md:w-[700px]
    overflow-x-auto md:overflow-visible
    md:justify-evenly
    md:ml-auto md:mr-64">
         <button onClick={()=>navigate("/ToDolist")} className='ml-1 w-10 mt-0.5  font-bold text-2xl hover:bg-white/50 border-2 border-transparent rounded-full transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-black-100 hover:ring-offset-2 '>
            <FontAwesomeIcon icon={faListCheck} />
        </button>
        <button onClick={()=>navigate("/final")} className='mt-0.5 w-10 font-bold text-2xl hover:bg-white/50 border-2 border-transparent rounded-full transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-black-100 hover:ring-offset-2'>
                            <FontAwesomeIcon icon={faNoteSticky} />
                        </button>
        <button onClick={()=>navigate("/wishBoard")} className='mt-0.5 w-10 font-bold text-2xl hover:bg-white/50 border-2 border-transparent rounded-full transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-black-100 hover:ring-offset-2'>
                            <FontAwesomeIcon icon={faHandHoldingHeart} />
                          
                        </button>
        <button onClick={()=>navigate("/brainDump")} className='mt-0.5 w-10 font-bold text-2xl hover:bg-white/50 border-2 border-transparent rounded-full transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-black-100 hover:ring-offset-2'>
                            <FontAwesomeIcon icon={faPen} />
                        
                        </button>
        <button onClick={()=>navigate("/budgetTracker")} className='mt-0.5 w-10 font-bold text-2xl hover:bg-white/50 border-2 border-transparent rounded-full transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-black-100 hover:ring-offset-2'>
                           <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                           
                        </button>
         </div>

         </div>
         
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
        <div className="flex flex-col
  md:grid md:grid-cols-12
  gap-6">
           
          <div className="w-full
  md:col-span-3 ml-5 md:ml-0
  transition-transform duration-300
  md:hover:scale-110">
            <ChatbotPanel />
          </div>

          <div className="w-full items-center
  md:col-span-3 ml-5 md:ml-0
  transition-transform duration-300
  md:hover:scale-110">
            <Todolist />
          </div>

          <div className=" w-full
  md:col-span-3 ml-5 md:ml-0
  transition-transform duration-300
  md:hover:scale-110">
            <BudgetTrackerCard
        total={total}
        spent={spent}
        remaining={remaining}
        expenses={expenses}
      />

          </div>
          <div className="col-span-3 gap-3 flex flex-col ">
             <div className=" w-full
  md:col-span-3
  transition-transform duration-300
  md:hover:scale-110">
            <QuoteOfTheDay />
          </div>
          <div className="w-full
  md:col-span-3
  transition-transform duration-300
  md:hover:scale-110 ">
           <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-5 shadow-md">
      <button onClick={()=>{navigate('/brainDump')}}
      className="text-lg text-white font-bold mb-4">
        🧠 Recent Journal Entries
      </button>

      {recentEntries.length === 0 ? (
        <p className="text-sm text-gray-500">
          No journal entries yet
        </p>
      ) : (
        <div className="space-y-2">
          {recentEntries.map((entry) => (
            <JournalEntryCard
              key={entry._id}
              entry={entry}
              onClick={() => console.log("Open entry", entry._id)}
            />
          ))}
        </div>
      )}
    </div> 
          </div></div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
