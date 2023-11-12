import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getUsersData, deleteUserData } from "../Slices/UserSlices";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../Slices/UserSlices";
import Swal from "sweetalert2";
const Users = () => {
  const { users, isLoading, error } = useSelector((state) => state.userList);
  console.log("users", users);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [emptyFieldErrors, setEmptyFieldErrors] = useState({
    name: false,
    email: false,
    designation: false,
  });
  const [emailFormatError, setEmailFormatError] = useState(false);
  const handleClose = () => {
    setShow(false);
    setEmptyFieldErrors({
      name: false,
      email: false,
      designation: false,
    });
    setEmailFormatError(false);
  };
  const dispatch = useDispatch();
  const deleteUser = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserData(index));
      }
    });
  };
  function validateEmail(email) {
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email);
  }
  const updateUser = () => {
    const newEmptyFieldErrors = {};
    if (!name) {
      newEmptyFieldErrors.name = true;
    }
    if (!email) {
      newEmptyFieldErrors.email = true;
    }
    if (!designation) {
      newEmptyFieldErrors.designation = true;
    }
    setEmptyFieldErrors(newEmptyFieldErrors);
    if (!email) {
      setEmailFormatError(false); // Email not required, so clear the error
    } else if (validateEmail(email)) {
      setEmailFormatError(false);
    } else {
      setEmailFormatError(true);
    }
    if (
      !Object.values(newEmptyFieldErrors).some((value) => value) &&
      !emailFormatError
    ) {
      setEmptyFieldErrors({
        name: false,
        email: false,
        designation: false,
      });
      dispatch(updateUserData(id, name, email, designation));
      handleClose();
    }
  };
  const handleNameChange = (value) => {
    setName(value);
    if (value) {
      setEmptyFieldErrors((prevErrors) => ({
        ...prevErrors,
        name: false,
      }));
    }
  };
  const handleDesignationChange = (value) => {
    setDesignation(value);
    if (value) {
      setEmptyFieldErrors((prevErrors) => ({
        ...prevErrors,
        designation: false,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleButtonClick = (item) => {
    setName(item.name);
    setEmail(item.email);
    setId(item.id);
    setDesignation(item.designation);
    setShow(true);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
    if (value) {
      setEmptyFieldErrors((prevErrors) => ({
        ...prevErrors,
        email: false,
      }));
      if (validateEmail(value)) {
        setEmailFormatError(false);
      } else {
        setEmailFormatError(true); // Set emailFormatError to true if the email format is invalid
      }
    } else {
      setEmailFormatError(false); // Clear the error if the email field is empty
    }
  };
  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <>
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Heirachy</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
            {users !== undefined &&
              users.map((item, index) => (
                <tr key={index}>
                  <th>{item.id}</th>
                  <th>{item.name}</th>
                  <th>{item.email}</th>
                  <th>{item.designation}</th>
                  <th>
                    <button
                      className="tableButton"
                      onClick={() =>
                        navigate(`/admin/users/hierarchy/reporting/${item.id}`)
                      }
                    >
                      View
                    </button>
                  </th>
                  <th>
                    <button
                      className="tableButton"
                      onClick={() => deleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    {item.id === 1 ? (
                      <button
                        disabled={true}
                        style={{ backgroundColor: "blue" }}
                        className="tableButton"
                        onClick={() => handleButtonClick(item)}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className="tableButton"
                        onClick={() => handleButtonClick(item)}
                      >
                        Edit
                      </button>
                    )}
                  </th>
                </tr>
              ))}
          </thead>
        </Table>
        <Button
          variant="primary"
          type="submit"
          style={{ margin: "20px" }}
          onClick={() => navigate("/admin/users/addUser")}
        >
          ADD USER
        </Button>
      </>
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
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
              {emptyFieldErrors.name && (
                <p style={{ color: "red" }}>Name is required</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emptyFieldErrors.email && (
                <p style={{ color: "red" }}>Email is required</p>
              )}
              {emailFormatError && (
                <p style={{ color: "red" }}>Invalid email format</p>
              )}
            </Form.Group>
            <Form.Group
              controlId="dob"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                value={designation}
                placeholder="Update designation"
                onChange={(e) => handleDesignationChange(e.target.value)}
              />
              {emptyFieldErrors.designation && (
                <p style={{ color: "red" }}>Designation is required</p>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              style={{ margin: "20px" }}
              onClick={updateUser}
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
    </div>
  );
};
export default Users;