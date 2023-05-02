import './nav.css'
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function Nav({ scrollH }) {
    // const [y, setY] = React.useState(window.scrollY);
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const navigate = useNavigate();
    var greetMsg = 'Hello';
    var data = [
        [22, 'Working late'],
        [18, 'Good evening'],
        [12, 'Good afternoon'],
        [5, 'Good morning'],
        [0, 'Whoa, early bird']
    ],
        hr = new Date().getHours();
    for (var i = 0; i < data.length; i++) {
        if (hr >= data[i][0]) {
            greetMsg = data[i][1];
            break;
        }
    }
    // console.log('>>><<<', scrollH)

    // const handleNavigation = React.useCallback(
    //     (e) => {
    //         const window = e.currentTarget;
    //         console.log(window.scrollY);
    //         if (y > window.scrollY) {
    //             console.log("scrolling up");
    //         } else if (y < window.scrollY) {
    //             console.log("scrolling down");
    //         }
    //         setY(window.scrollY);
    //     },
    //     [y]
    // );

    // React.useEffect(() => {
    //     setY(window.scrollY);
    //     window.addEventListener("scroll", handleNavigation);

    //     return () => {
    //         window.removeEventListener("scroll", handleNavigation);
    //     };
    // }, [handleNavigation]);

    if (location.pathname.toLowerCase() === "/login") {
        return null;
    }
    console.log(location.pathname.split('/').at(-1))
    const currentPath = location.pathname;
    const logout = () => {
        if (window.confirm("Are you sure !,you want to logout")) {
            localStorage.removeItem('userInfo');
            navigate(`/login`)
        }
    }
    const handleClick = (e) => {
        e.preventDefault()
    }
    console.log('<><>', scrollH)
    if (!scrollH) {
        scrollH = 1
    }
    return (
        <div className={scrollH > 1 ? 'tt' : 'ttg'}>
            <div className='h-full w-full grid grid-cols-12 breadCumContainer'>
                <div className='h-full w-full col-span-4 grid content-center'>
                    <div>
                        <div className='breadcumWrapper'>
                            {
                                location.pathname.split('/').at(-1) === 'dashboard'
                                &&
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink className='activeNav' onClick={handleClick} to="/dashboard">
                                        Home
                                    </NavLink>

                                </Breadcrumbs>
                            }
                            {
                                location.pathname.split('/').at(-1) === 'addDealer'
                                &&
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink to="/dashboard">
                                        Home
                                    </NavLink>
                                    <NavLink className='activeNav' onClick={handleClick} to="/addDealer">
                                        Add Dealer
                                    </NavLink>
                                </Breadcrumbs>
                            }
                            {
                                location.pathname.split('/').at(-1) === 'addBook'
                                &&
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink to="/dashboard">
                                        Home
                                    </NavLink>
                                    <NavLink className='activeNav' onClick={handleClick} to="/addBook">
                                        Add Book
                                    </NavLink>
                                </Breadcrumbs>
                            }
                            {
                                location.pathname.split('/').at(-2) === 'dealer'
                                &&
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink to="/dashboard">
                                        Home
                                    </NavLink>
                                    <NavLink to="/dashboard">
                                        Dealer List
                                    </NavLink>
                                    <NavLink className='activeNav' onClick={handleClick} to="/dealer">
                                        Dealer Detail
                                    </NavLink>
                                </Breadcrumbs>
                            }
                            {
                                location.pathname.split('/').at(-2) === 'vehicleDetail'
                                &&
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink to="/dashboard">
                                        Home
                                    </NavLink>
                                    <NavLink to="/TTO">
                                        Book List
                                    </NavLink>
                                    <NavLink className='activeNav' onClick={handleClick} to="/vehicleDetail">
                                        Vehicle Detail
                                    </NavLink>
                                </Breadcrumbs>
                            }
                            {
                                location.pathname.split('/').at(-1) === 'TTO'
                                &&
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink to="/dashboard">
                                        Home
                                    </NavLink>
                                    <NavLink className='activeNav' onClick={handleClick} to="/TTO">
                                        TTO Book List
                                    </NavLink>
                                </Breadcrumbs>
                            }
                            {
                                location.pathname.split('/').at(-1) === 'RRF'
                                &&
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink to="/dashboard">
                                        Home
                                    </NavLink>
                                    <NavLink className='activeNav' onClick={handleClick} to="/RRF">
                                        RRF Book List
                                    </NavLink>
                                </Breadcrumbs>
                            }
                            {
                                location.pathname.split('/').at(-1) === 'OTHER'
                                &&
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink to="/dashboard">
                                        Home
                                    </NavLink>
                                    <NavLink className='activeNav' onClick={handleClick} to="/OTHER">
                                        Other Book List
                                    </NavLink>
                                </Breadcrumbs>
                            }


                        </div>
                        <div className='greeting'>
                            {greetMsg}, {user?.userName}
                        </div>
                    </div>
                </div>
                <div className='h-full w-full col-span-2 col-start-11 grid content-center'>
                    <button className='flex justify-end logout' onClick={() => logout()}>
                        <LogoutIcon />&nbsp;&nbsp;<div>Logout</div>
                    </button>
                </div>
            </div>
        </div >

    )
}

export default Nav;