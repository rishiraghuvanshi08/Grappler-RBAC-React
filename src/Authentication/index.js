import Swal from 'sweetalert2';
import setAuthToken from './setAuthToken';
import { useNavigate } from 'react-router-dom';
// isLoggedIn =>
export const IsLoggedIn = () => {
    let data = localStorage.getItem("data");
    if(data != null) {
        const parsedData = JSON.parse(data);
        setAuthToken(parsedData.jwtToken);
        return true;
    }
    else {
        return false;
    }
};
// doLogin => data => set to localstorage
export const DoLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
}
// doLogout => remove from localstorage
export const DoLogout = () => {
    localStorage.removeItem("data");
    setAuthToken();
    Swal.fire(
        'Logout Successful!',
    )
}
// Get currentUser
export const getCurrentUserDetails = () => {
    if(IsLoggedIn) {
        return JSON.parse(localStorage.getItem("data"));
    }
    else {
        return false;
    }
}
