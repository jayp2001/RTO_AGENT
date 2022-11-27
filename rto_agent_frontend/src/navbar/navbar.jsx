import { Link,NavLink } from "react-router-dom";
import "./navbar.css"

function NaveBar(){
    return(
        <>
            <div className='navBar_container flex items-center'>
                <div className='grid grid-rows-1'>
                    <div className='grid grid-cols-12 navbar_wrapper'>
                        <div className='nav_header_text col-span-3'>
                            <NavLink to="/add" activeClassName="active" className="Home">Add Admin </NavLink>
                        </div>

                        <div className='nav_header_text col-span-2'>
                            <NavLink to="/list" activeClassName="active" className="Home">Admin List</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NaveBar;