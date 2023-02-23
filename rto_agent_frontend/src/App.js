import { BrowserRouter ,Route,Routes } from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import AddAdminPage from "./pages/addAdmin/addAdmin";
import AgentList from "./pages/agentList/agentList";
import NaveBar from "./navbar/navbar";
import './App.css';
import LoginPage from "./pages/login/login";
import ProtectedAdminRoute from "./protectedAdminRoute";
import Dashboard from "./agentPages/dashboard/dashboard";
import ProtectedAgentRoutes from "./protectedAgentRoutes";
import Nav from "./agentPages/dashboard/components/nav/nav";
import DealerDetail from "./agentPages/dealerDetail/dealerDetail";
import AddDealer from "./agentPages/addDealer/addDealer";
import AddBook from "./agentPages/addBook/addBook";

function App() {
  return (
    <>
    <BrowserRouter>
        <div className="flex mainBodyWrapper">
          <NaveBar/>
          <div className="mainBody">
              <Nav/>
              <div className="mt-8">
                <Routes>
                  <Route path="/" element={<ProtectedAdminRoute/>}>
                    <Route path='add' exact element={<AddAdminPage />}/>
                    <Route path='list' exact element={<AgentList />}/>
                  </Route>
                  <Route path="/" element={<ProtectedAgentRoutes/>}>
                    <Route path="/addDealer" element={<AddDealer/>}/>
                    <Route path="/addBook" element={<AddBook/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/dealer/:id" element={<DealerDetail/>}/>
                  </Route>
                  <Route path='/login' exact element={<LoginPage />}/>
                </Routes>
            </div>
          </div>
        </div>
    </BrowserRouter>
    </>
  );
}

export default App;
