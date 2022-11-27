import { BrowserRouter ,Route,Routes } from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import AddAdminPage from "./pages/addAdmin/addAdmin";
import NaveBar from "./navbar/navbar";
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
        <NaveBar/>
        <Routes>
          <Route path='/add' exact element={<AddAdminPage />}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
