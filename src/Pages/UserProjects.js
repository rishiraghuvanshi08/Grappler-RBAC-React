import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getProjectData, deleteProjectData, updateProjectData, deleteProjectTeamData, addProjecTeamData, getUserProjectsData} from "../Slices/ProjectSlices";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUsersDataId } from "../Slices/LoginUserSlice";

const UserProjects = () => {
  const { projects } = useSelector((state) => state.projectList);
  const dispatch = useDispatch();

  const data = localStorage.getItem('data');
  const parsedData = data ? JSON.parse(data) : null;
  let userEmail = '';

  if (parsedData && parsedData.email) {
    const email = parsedData.email;
    userEmail = email;
  }

  useEffect(() => {
    dispatch(getUsersDataId(userEmail))
      .then((userId) => {
        dispatch(getUserProjectsData(userId));
      });
  },[]);

  // if (isProjectLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (projectError) {
  //   return <div>Error: {projectError.message}</div>;
  // }
  
  return (
    <div>
    <>
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
          </tr>
          {projects !== undefined &&
            projects.map((item, index) => (
              <tr key={index}>
                <th>{item.id}</th>
                <th>{item.name}</th>              
              </tr>
            ))}
        </thead>
      </Table>
    </>
  </div>
  )
}

export default UserProjects
