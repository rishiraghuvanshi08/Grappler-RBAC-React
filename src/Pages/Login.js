import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { DoLogin } from "../Authentication";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoginStatus } from "../Slices/loginSlice";
import { jwtDecode } from 'jwt-decode';
// import { useDispatch } from "react-redux";
// import { addUserData } from "../Slices/UserSlice";
import Modal from 'react-bootstrap/Modal';
import { sendOtp } from "../Slices/otpSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  const togglePasswordVisibility = () => {
    setLoginDetails({
      ...loginDetails,
      showPassword: !loginDetails.showPassword,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const notify2 = () =>{
    toast.success("Login Success");
  }
  const notify = (msg) => toast(msg);
  const handleChange = (e, field) => {
    let actualValue = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue
    })
  }
  const [emailDetails, setemailDetails] = useState({
    email: '',
  });
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [backendMessage, setBackendMessage] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  //for forgot password
  const openForgotPasswordModal = () => {
    setemailDetails({
      email: ' ',
    });
    setIsForgotPasswordModalOpen(true);
  };
  const handleemailDetailsChange = (e, field) => {
    setIsEmailEmpty(false);
    const actualValue = e.target.value;
    setemailDetails({
      ...emailDetails,
      [field]: actualValue,
    });
  };
  const loginForm = () =>{
    dispatch(getLoginStatus(loginDetails))
      .then((data) => {
        if (data != undefined) {
          DoLogin(data, () => {
            console.log("Login details is saved to localStorage", data);
          });
          notify2();
          const data2 = localStorage.getItem('data');
          const parsedData = JSON.parse(data2);
          const decodedToken = jwtDecode(parsedData.jwtToken);
          const role = decodedToken.role;
          if (role == "ROLE_ADMIN") {
            navigate("/admin/dashboard");
          }
          else {
            navigate("/users/dashboard");
          }
        }
        else {
          // setShowAlert(true);
          toast.error("Login failed! Invalid Credentials.");
        }
      });
  }
  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };
  function validateEmail(email) {
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email);
  }
  const handleFormSubmitForEmail = (e) => {
    e.preventDefault();
    if (emailDetails.email.trim() === '') {
      setIsEmailEmpty(true);
      return;
    }
    if (!validateEmail(emailDetails.email)) {
      notify('Invalid email format');
    }
    else {
      dispatch(sendOtp(emailDetails))
        .then((data) => {
          handleBackendMessage(data.message);
          setIsForgotPasswordModalOpen(false);
          notify(data.message);
        })
    }
  };
  const handleBackendMessage = (message) => {
    setBackendMessage(message);
  };
  return (
    <div className="formParent">
      <Container className="formParent-container" style={{ 'display': 'flex', 'justifyContent': 'center' }}>
        <Form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">Email address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={loginDetails.email}
              onChange={(e) => handleChange(e, 'email')}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={loginDetails.password}
              onChange={(e) => handleChange(e, 'password')}
              required
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ margin: "20px" }}
            onClick={loginForm}
          >
            Login
          </Button>
          <button className="btn btn-secondary" onClick={openForgotPasswordModal}>
            Forgot Password
          </button>
          <Modal show={isForgotPasswordModalOpen} onHide={closeForgotPasswordModal}>
            <Modal.Header closeButton>
              <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div>
                  <label htmlFor="email">Enter Email: </label> &nbsp; &nbsp;
                  <input
                    type="email"
                    id="email"
                    value={emailDetails.email}
                    onChange={(e) => handleemailDetailsChange(e, 'email')}
                    placeholder="Enter your email"
                    aria-required="true"
                    required
                  />
                  {isEmailEmpty && <p style={{ color: 'red' }}>Please input your email!</p>}
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeForgotPasswordModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleFormSubmitForEmail}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Container>
    </div>
  )
}
export default Login