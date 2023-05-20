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
import PageNotFoundRedirect from "./pageNotFound";
import VehicleDetail from "./agentPages/vehicleDetail/vehicleDetail";
import TtoBookList from "./agentPages/ttoBookList/ttoBookList";
import RrfBookList from "./agentPages/rrfBookList/rrfBookList";
import OtherBookList from "./agentPages/otherBookList/otherBookList";
import AllBookList from "./agentPages/allBookList/allBookList";
import EditDealer from "./agentPages/editDealer/editDealer";
import EditBook from "./agentPages/editVehicleDetail/editVehicleDetail";

function App() {
  const [y, setY] = React.useState(window.scrollY);

  const handleNavigation = React.useCallback(
    (e) => {
      const window = e.currentTarget;
      setY(window.scrollTop);
    },
    [y]
  );

  React.useEffect(() => {
    // setY(window.scrollY);
    document.querySelector('.mainBody').addEventListener("scroll", handleNavigation,true);

    return () => {
      document.querySelector('.mainBody').removeEventListener("scroll", handleNavigation,true);
    };
  }, [handleNavigation]);

  return (
    <>
    <BrowserRouter>
        <div className="flex mainBodyWrapper">
          <NaveBar/>
          <div className="mainBody">
              <Nav scrollH={y}/>
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
                    <Route path="/editDealer/:id" element={<EditDealer/>}/>
                    <Route path="/vehicleDetail/:id" element={<VehicleDetail/>}/>
                    <Route path="/editVehicleDetail/:id" element={<EditBook/>}/>
                    <Route path="/TTO" element={<TtoBookList/>}/>
                    <Route path="/RRF" element={<RrfBookList/>}/>
                    <Route path="/OTHER" element={<OtherBookList/>}/>
                    <Route path="/bookList" element={<AllBookList/>}/>
                  </Route>
                  <Route path='/login' exact element={<LoginPage />}/>
                  <Route path='*' element={<PageNotFoundRedirect/>}/>
                </Routes>
            </div>
          </div>
        </div>
    </BrowserRouter>
    </>
  );
}

export default App;
