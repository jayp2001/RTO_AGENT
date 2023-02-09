import { BrowserRouter ,Route,Routes } from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import AddAdminPage from "./pages/addAdmin/addAdmin";
import AgentList from "./pages/agentList/agentList";
import NaveBar from "./navbar/navbar";
import './App.css';
import LoginPage from "./pages/login/login";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <>
    <BrowserRouter>
        <div className="flex mainBodyWrapper">
          <NaveBar/>
          <div className="mainBody">
            <Routes>
              <Route path="/" element={<ProtectedRoute/>}>
                <Route path='add' exact element={<AddAdminPage />}/>
                <Route path='list' exact element={<AgentList />}/>
              </Route>
              <Route path='/login' exact element={<LoginPage />}/>
            </Routes>
          </div>
        </div>
    </BrowserRouter>
    </>
  );
}

export default App;
