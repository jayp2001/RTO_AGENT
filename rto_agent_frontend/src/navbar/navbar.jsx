import { Link, NavLink } from "react-router-dom";
import "./navbar.css"

function NaveBar() {
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
                            <NavLink to="/add" activeClassName="active" className="navLink">Add Admin </NavLink>
                            <NavLink to="/list" activeClassName="active" className="navLink">Admin List</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NaveBar;