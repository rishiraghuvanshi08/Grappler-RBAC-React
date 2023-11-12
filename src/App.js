import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
// import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Project from "./Pages/Project";
import Login from "./Pages/Login";
import Hierachy from "./Pages/Hierachy";
import AddUser from "./Pages/AddUser";
import HeirachyId from "./Pages/HierarchyId";
import AddProject from "./Pages/AddProject";
import Teams from "./Pages/Teams";
import TeamMember from "./Pages/TeamMember";
import { ToastContainer } from "react-toastify";
import PrivateRoute from './Pages/PrivateRoute';
// import { DoLogout } from '../Authentication'
// import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UsersDashboard from "./Pages/UserDashboard";
import UserProjects from "./Pages/UserProjects";
import UserTeams from "./Pages/UserTeams";
import AdminDashboard from "./Pages/AdminDashboard";
import Errors from "./Pages/Error";
function App() {

  return (
    <div className="App">
      <Router>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PrivateRoute allowedRoles="ROLE_ADMIN" />} >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="hierarchy" element={<Hierachy />} />
              <Route path="users" element={<Users />} />
              <Route path="teams" element={<Teams />} />
              <Route path="teams/:id/teamDetails" element={<TeamMember />} />
              <Route path="projects" element={<Project />} />
              <Route path="users/addUser" element={<AddUser />} />
              <Route
                path="users/hierarchy/reporting/:id"
                element={<HeirachyId />}
              />
              <Route path="projects/addProject" element={<AddProject />} />
            </Route>
            <Route path="/users" element={<PrivateRoute allowedRoles="ROLE_USER" />} >
              <Route path="dashboard" element={<UsersDashboard />} />
              <Route path="projects" element={<UserProjects />} />
              <Route path="teams" element={<UserTeams />} />
            </Route>
            <Route path='*' element={<Errors />} />
          </Routes>
        </div>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
