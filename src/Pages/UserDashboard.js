import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserIdData } from "../Slices/UserSlices";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { getUserProjectsData } from "../Slices/ProjectSlices";
import { getUserTeamData } from "../Slices/TeamSlice";
import { getUsersDataId } from "../Slices/LoginUserSlice";
import { passwordChange } from "../Slices/PasswordChangeSlice";
import { notify } from "../Components/Toastify";

const UsersDashboard = () => {
  const { user, error } = useSelector((state) => state.loginUser);
  const { projects } = useSelector((state) => state.projectList);
  const { teams } = useSelector((state) => state.teamsList);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setdesignation] = useState("");
  const [uid, setUId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const totalProjects = projects.length;
  const totalTeams = teams.length;
  // console.log(users);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordChangeError: "",
    showPassword: false,
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [newPasswordMatchMessage, setNewPasswordMatchMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handlePasswordModalClose = () => {
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      passwordChangeError: "",
      showPassword: false,
    });
    setShowPasswordModal(false);
  };
  const toggleShowPassword = () => {
    setPasswordData({ ...passwordData, showPassword: !passwordData.showPassword });
  };
  const handlePasswordChange = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setNewPasswordMatchMessage("");
    let hasError = false;
    if (!oldPassword) {
      setOldPasswordError("Please input your old password.");
      hasError = true;
    }
    if (!newPassword) {
      setNewPasswordError("Please input your new password.");
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please input your confirm password.");
      hasError = true;
    }
    else if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters.");
      hasError = true;
    }
    else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords should match.");
      hasError = true;
    }
    if (!hasError) {
      dispatch(passwordChange(passwordData))
        .then((data) => {
          if (data.message == 'Cannot be same as old Password') {
            setNewPasswordMatchMessage("Cannot be same as old Password");
            hasError = true;
          }
          else {
            setPasswordData({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
              passwordChangeError: "",
              showPassword: false,
            });
            setShowPasswordModal(false)
            notify(data.message);
          }
        })
    }
  };
  const handlePasswordModalShow = () => {
    setShowPasswordModal(true);
  };

  const data = localStorage.getItem('data');
  const parsedData = data ? JSON.parse(data) : null;
  let userEmail = '';

  if (parsedData && parsedData.email) {
    const email = parsedData.email;
    userEmail = email;
  }

  function validateEmail(email) {
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    let hasError = false;

    if (!name) {
      setNameError("Please enter a name.");
      hasError = true;
    }

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter email.");
      hasError = true;
    }

    if (nameError || emailError) {
      hasError = true;
    }
    if (!hasError) {
      dispatch(updateUserIdData(uid, name, email, designation));
      setNameError("");
      setEmailError("");
      handleClose();
    }
  };
  const handleButtonClick = (item) => {
    setName(item.name);
    setEmail(item.email);
    setUId(item.id);
    setdesignation(item.designation);
    setShow(true);
  };

  useEffect(() => {
    dispatch(getUsersDataId(userEmail))
      .then((userId) => {
        dispatch(getUserProjectsData(userId));
        dispatch(getUserTeamData(userId));
      });
  }, []);

  useEffect(() => {


  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-4"></p>
                <div className="d-flex justify-content-center mb-2">
                  <button className="btn btn-primary" style={{ marginRight: "10px" }} onClick={handlePasswordModalShow}>Change Password</button>
                  <button outline className="btn btn-secondary" onClick={() => handleButtonClick(user)} >Edit</button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>ID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.id}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Designation</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.designation}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">Active Projects</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '20px' }}><strong>{totalProjects}</strong></MDBCardText>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">My Teams</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '20px' }}><strong>{totalTeams}</strong></MDBCardText>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
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
                onChange={(e) => {
                  setNameError(""); 
                  setName(e.target.value)}
                }
              />
              {nameError && <p className="text-danger">{nameError}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={email || " "}
                onChange={(e) => {
                  setEmailError("");
                  setEmail(e.target.value)}
                }
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </Form.Group>
            <Form.Group
              controlId="dob"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="test"
                defaultValue={designation}
                placeholder="Update designation"
                disabled="true"
                onChange={(e) => setdesignation(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: "20px" }}
              // onClick={() => updateUser(uid, name, email, designation)}

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
      <Modal show={showPasswordModal} onHide={handlePasswordModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Enter Old Password"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, oldPassword: e.target.value })
                  }
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  <FontAwesomeIcon icon={showOldPassword ? faEye : faEyeSlash} />
                </Button>
              </div>
              <p className="text-danger">{oldPasswordError}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
                </Button>
              </div>
              <p className="text-danger">{newPasswordError}</p>
              <p className="text-danger">{newPasswordMatchMessage}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                </Button>
              </div>
              <p className="text-danger">{confirmPasswordError}</p>
            </Form.Group>
          </Form>
          <p className="text-danger">{passwordData.passwordChangeError}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePasswordChange}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}
export default UsersDashboard