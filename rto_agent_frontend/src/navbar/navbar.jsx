import { Link, NavLink } from "react-router-dom";
import "./navbar.css"
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TransformIcon from '@mui/icons-material/Transform';
import CarRentalIcon from '@mui/icons-material/CarRental';
function NaveBar() {
    const location = useLocation();
    const decryptData = (text) => {
        const key = process.env.REACT_APP_AES_KEY;
        const bytes = CryptoJS.AES.decrypt(text, key);
        const data = bytes.toString(CryptoJS.enc.Utf8) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : 0;
        return (data);
    };

    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    if (!user) {
        return null;
    }
    const role = user && user.isAdminrights ? decryptData(user.isAdminrights) : 0;
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
                        <div className="navLinkWrapper gap-1 flex flex-col">
                            <NavLink to="/dashboard" activeClassName="active" className="navLink"><DashboardIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;Dashboard</NavLink>
                            {role === 1 &&
                                <>
                                    <NavLink to="/list" activeClassName="active" className="navLink"><DashboardIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;Agent List</NavLink>
                                    <NavLink to="/add" activeClassName="active" className="navLink"><DashboardIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;Add Agent </NavLink>
                                </>}
                            <NavLink to="/addDealer" activeClassName="active" className="navLink"><AddBusinessIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;Add Dealer </NavLink>
                            <NavLink to="/addBook" activeClassName="active" className="navLink"><PostAddIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;Add Book </NavLink>
                            <NavLink to="/bookList" activeClassName="active" className="navLink"><ImportContactsIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;BookList</NavLink>
                            <NavLink to="/TTO" activeClassName="active" className="navLink"><TransformIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;TTO BookList</NavLink>
                            <NavLink to="/RRF" activeClassName="active" className="navLink"><AutorenewIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;RRF BookList</NavLink>
                            <NavLink to="/OTHER" activeClassName="active" className="navLink"><CarRentalIcon style={{ marginTop: '-5px' }} />&nbsp;&nbsp;OTHER BookList</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NaveBar;