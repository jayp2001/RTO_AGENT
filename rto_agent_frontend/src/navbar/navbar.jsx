import { Link, NavLink } from "react-router-dom";
import "./navbar.css"
import { useLocation } from 'react-router-dom';
function NaveBar() {
    const location = useLocation();
    if (location.pathname === "/login") {
        return null;
    }
    return (
        <>
            <div className="mainContainer">
                <div className="navBarContainerWrapper justify-center flex">
                    <div className='navBar_container'>
                        <div className="navLinkHeader">
                            RTO Agent
                            <hr className="hr"></hr>
                        </div>
                        <div className="navLinkWrapper flex flex-col">
                            <NavLink to="/list" activeClassName="active" className="navLink">Admin List</NavLink>
                            <NavLink to="/add" activeClassName="active" className="navLink">Add Admin </NavLink>
                            <NavLink to="/dashboard" activeClassName="active" className="navLink">Dashboard </NavLink>
                            <NavLink to="/addDealer" activeClassName="active" className="navLink">add Dealer </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NaveBar;