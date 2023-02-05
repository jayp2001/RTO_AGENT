import { BrowserRouter ,Route,Routes } from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import AddAdminPage from "./pages/addAdmin/addAdmin";
import AgentList from "./pages/agentList/agentList";
import NaveBar from "./navbar/navbar";
import './App.css';
import LoginPage from "./pages/login/login";

function App() {
  return (
    <>
    <BrowserRouter>
        <NaveBar/>
        <Routes>
        <Route path='/' exact element={<LoginPage />}/>
          <Route path='/add' exact element={<AddAdminPage />}/>
          <Route path='/list' exact element={<AgentList />}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
