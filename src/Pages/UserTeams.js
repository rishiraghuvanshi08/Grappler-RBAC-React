import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getProjectData, deleteProjectData, updateProjectData, deleteProjectTeamData, addProjecTeamData, getUserProjectsData } from "../Slices/ProjectSlices";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserTeamData } from "../Slices/TeamSlice";
import { getUsersDataId } from "../Slices/LoginUserSlice";

const UserTeams = () => {
    const { teams } = useSelector((state) => state.teamsList);
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
                dispatch(getUserTeamData(userId));
            });
    }, []);

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
                        {teams !== undefined &&
                            teams.map((item, index) => (
                                <tr key={index}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    {/* <th><button className="tableButton" onClick={() => teamMember(item.id)}>View Members</button></th>
                <th><button className="tableButton" onClick={() => handleButtonClick(item)}>Edit</button></th> */}
                                </tr>
                            ))}
                    </thead>
                </Table>
            </>
        </div>
    )
}

export default UserTeams
