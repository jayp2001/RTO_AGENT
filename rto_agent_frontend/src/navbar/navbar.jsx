import { Link, NavLink } from "react-router-dom";
import "./navbar.css"
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js'
function NaveBar() {
    const location = useLocation();
    const decryptData = (text) => {
        const key = process.env.REACT_APP_AES_KEY;
        const bytes = CryptoJS.AES.decrypt(text, key);
        const data = bytes.toString(CryptoJS.enc.Utf8)?JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):0;
        return (data);
    };

    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):{}
    if (!user) {
        return null;
    }
    const role = user && user.isAdminrights ? decryptData(user.isAdminrights) : 0;
    console.log('<L>', role)
    if (location.pathname.toLowerCase() === "/login") {
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
                            <NavLink to="/dashboard" activeClassName="active" className="navLink">Dashboard </NavLink>
                            {role === 1 &&
                                <>
                                    <NavLink to="/list" activeClassName="active" className="navLink">Agent List</NavLink>
                                    <NavLink to="/add" activeClassName="active" className="navLink">Add Agent </NavLink>
                                </>}
                            <NavLink to="/addDealer" activeClassName="active" className="navLink">add Dealer </NavLink>
                            <NavLink to="/addBook" activeClassName="active" className="navLink">add Book </NavLink>
                            <NavLink to="/bookList" activeClassName="active" className="navLink">BookList</NavLink>
                            <NavLink to="/TTO" activeClassName="active" className="navLink">TTO BookList</NavLink>
                            <NavLink to="/RRF" activeClassName="active" className="navLink">RRF BookList</NavLink>
                            <NavLink to="/OTHER" activeClassName="active" className="navLink">OTHER BookList</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NaveBar;