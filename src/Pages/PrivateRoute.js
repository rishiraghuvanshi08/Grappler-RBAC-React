import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import { IsLoggedIn } from '../Authentication';
import NavBar from '../Components/NavBar';
import { jwtDecode } from 'jwt-decode';
import UserNavbar from '../Components/UserNavbar';

const PrivateRoute = ({ allowedRoles }) => {

    const data = localStorage.getItem('data');
    const parsedData = data ? JSON.parse(data) : null;
    let userRole = '';

    if (parsedData && parsedData.jwtToken) {
        const decodedToken = jwtDecode(parsedData.jwtToken);
        userRole = decodedToken.role;
    }

    if (IsLoggedIn() && userRole == allowedRoles) {
        return (
            <>
                {userRole == "ROLE_ADMIN" ? <NavBar /> : <UserNavbar/>}
                <Outlet />
            </>
        )
    }
    else {
        return <Navigate to={"/login"} />;
    }
}
export default PrivateRoute