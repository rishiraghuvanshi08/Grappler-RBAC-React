import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getTeamData, deleteTeamData, updateTeamData, addTeamData } from "../Slices/TeamSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { updateProjectData } from "../Slices/ProjectSlices";
import { getUsersData, deleteUserData } from "../Slices/UserSlices";
import { toast } from "react-toastify";

const Teams = () => {
  const { teams, isTeamsLoading, teamsError } = useSelector((state) => state.teamsList);
  console.log(teams);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [view, setView] = useState(false);
  const [userIds, setUserIds] = useState([""]);
  const [numUserIds, setNumUserIds] = useState(1);
  const handleClose = () => {
    setShow(false);
    setAddShow(false);
    setUserIds([""]);
  };
  const dispatch = useDispatch();

  const updateTeam = (name) => {
    console.log("update team details ", name, teamId);
    const teamNameExists = teams.some((team) => team.name === name);
    if (teamNameExists) {
      notify("Team with the same name already exists");
    }
    else if (name) {
      dispatch(updateTeamData(teamId, name));
      handleClose();
    }
  };

  const notify = (msg) => {
    toast(msg);
  };

  const addTeam = (name) => {
    console.log("Add team details ", name, userIds);
    console.log("team ", teams);
    console.log("outside", userIds);
    if (!userIds || userIds.length === 0 || userIds == '') {
      console.log("hsgdhs", userIds);
      notify("At least one team member should be selected");
      return;
    }

    const teamNameExists = teams.some((team) => team.name === name);
    if (teamNameExists) {
      notify("Team with the same name already exists");
      return;
    }
    if (name) {
      const teamData = {
        id: '',
        name: name,
        teamMembers: userIds.map(userId => ({ user: { id: userId } }))
      };
      dispatch(addTeamData(teamData));
      handleClose();
    }

  };

  const addUserIdField = () => {
    setUserIds([...userIds, ""]);
    setNumUserIds(numUserIds + 1);
  };

  const removeUserIdField = () => {
    if (numUserIds > 1) {
      setUserIds(userIds.slice(0, numUserIds - 1));
      setNumUserIds(numUserIds - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (item) => {
    setName(item.name);
    setTeamId(item.id);
    setShow(true);
  };

  const handleAddButtonClick = (item) => {
    setAddShow(true);
  };

  const teamMember = (IdTeam) => {
    navigate(`/admin/teams/${IdTeam}/teamDetails`)
  };

  useEffect(() => {
    dispatch(getTeamData());
  }, [dispatch]);

  if (isTeamsLoading) {
    return <div>Loading...</div>;
  }

  if (teamsError) {
    return <div>Error: {teamsError.message}</div>;
  }

  return (
    <div>
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Teams Members</th>
            <th>Edit</th>
          </tr>
          {teams !== undefined &&
            teams.map((item, index) => (
              <tr key={index}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th><button className="tableButton" onClick={() => teamMember(item.id)}>View Members</button></th>
                <th><button className="tableButton" onClick={() => handleButtonClick(item)}>Edit</button></th>
              </tr>
            ))}
        </thead>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  defaultValue={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ margin: "20px" }}
                onClick={() => updateTeam(name)}
              >
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={addShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter New Team Name"
                  defaultValue={""}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              {userIds.map((userId, index) => (
                <Form.Group className="mb-3" controlId={`userId${index}`} key={index}>
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter User ID"
                    defaultValue={userId}
                    onChange={(e) => {
                      const updatedUserIds = [...userIds];
                      updatedUserIds[index] = e.target.value;
                      setUserIds(updatedUserIds);
                    }}
                    required
                  />
                  {index === userIds.length - 1 && (
                    <span onClick={addUserIdField} style={{ cursor: "pointer", marginLeft: "10px" }}>
                      +
                    </span>
                  )}
                  {index === 0 && userIds.length > 1 && (
                    <span onClick={removeUserIdField} style={{ cursor: "pointer", marginLeft: "10px" }}>
                      -
                    </span>
                  )}
                </Form.Group>
              ))}
              <Button
                variant="primary"
                type="submit"
                style={{ margin: "20px" }}
                onClick={() => addTeam(name)}
              >
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Table>
      <Button
        variant="primary"
        type="submit"
        style={{ margin: "20px" }}
        onClick={handleAddButtonClick}
      >
        ADD TEAM
      </Button>
    </div>
  );
};

export default Teams;