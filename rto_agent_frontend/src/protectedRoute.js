import React from 'react'
import {useSelector} from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"; 
import jwt_decode from 'jwt-decode'

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    let location = useLocation();
    // if(!user){
    //     return(<Navigate to="/login" state={{ from: location }} replace />)
    // }
    const decoded = jwt_decode(user.token);
    const expirationTime = (decoded.exp * 1000) - 60000
    const auth = new Date(expirationTime) > new Date() ? true : false
    console.log('<<>>',new Date(expirationTime),decoded,new Date(expirationTime) > new Date() ? true : false)
    return(
        auth?
        <Outlet />:
        <Navigate to="/login" state={{ from: location }} replace />
    )

    // if(!user) {
    //     return <Navigate to="/" state={{ from: location}} replace />
    // }
 

};

export default ProtectedRoute;