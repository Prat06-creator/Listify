import React from 'react';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Landing from './landing_page/landing'; 
import {Routes, Route} from 'react-router-dom'
import Login from './login/login';
import EmailAuthentication from './login/emailAuthentication.jsx';
import Dashboard from './page/dashboard/dashboard.jsx';
import Final from './page/stickynote/final.jsx';
import './App.css'
import { Toaster } from 'react-hot-toast';
import ToDoList from './page/todolist/ToDoList.jsx';
import BrainDump from './page/brainDump.jsx/brainDump.jsx';
import BudgetTracker from './page/budgetTracker/budgetTracker.jsx';
import WishBoard from './page/wishBoard/wishBoard.jsx';
import Footer from "./components/Footer";
const App=()=> {
  
 
  return (
    <div>

      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
       <Route path ='/emailAuthentication' element={<EmailAuthentication/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/todolist' element={<ToDoList/>}/>
        <Route path='/final' element={<Final/>}/>
       <Route path='/wishBoard' element={<WishBoard/>}/>  
       <Route path='/brainDump' element={<BrainDump/>}/>
        <Route path='/budgetTracker' element={<BudgetTracker/>}/>
      </Routes>
      <Footer />
      <Toaster/> 
      

     
    
      
    </div>
  );
}


export default App;
