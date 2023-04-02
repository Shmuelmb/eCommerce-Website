import React, { useEffect } from "react";
import "./RegisterPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Modal from "@mui/material/Modal";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../.js/constant-vars";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [obj, setObj] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [disButton, setDisButton] = useState(true);

  useEffect(() => {
    const checkLenOfInput = (arr) => arr.every((val) => val.length > 0);
    const objVal = Object.values(obj);
    if (checkLenOfInput(objVal) && obj.password.length > 7) {
      setDisButton(false);
    } else {
      setDisButton(true);
    }
  }, [obj]);

  //func
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const isPassBiggerThenEight = (pass) =>
    pass.length < 8
      ? setError("The Password must contain at least eigth digits")
      : setError(" ");

  //modal
  const [isRegister, setIsRegister] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const register = async (user) => {
    try {
      const newUser = JSON.stringify(user);
      const response = await fetch(`${BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: newUser,
      });
      const data = await response.json();
      if (!data.register) {
        setIsRegister(false);
      } else {
        setIsRegister(true);
        setTimeout(() => navigate(data.navigate), 5000);
      }
      setOpenModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <TextField
          className="register-input"
          onChange={(event) => {
            setObj({ ...obj, email: event.target.value });
          }}
          placeholder="Email"
          variant="standard"
          helperText="please enter your email address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          className="register-input"
          onChange={(event) => {
            setObj({ ...obj, username: event.target.value });
          }}
          placeholder="User name"
          variant="standard"
          helperText="please enter your username"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          className="register-input"
          onChange={(e) => {
            isPassBiggerThenEight(e.target.value);
            setObj({ ...obj, password: e.target.value });
          }}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          variant="standard"
          helperText={error ? error : "please enter your password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={() => register(obj)}
          disabled={disButton}
          variant="filledTonal"
          endIcon={<SendIcon />}
        >
          Register
        </Button>
      </div>
      <Modal className="modal-box" open={openModal} onClose={handleClose}>
        <div className="modal-message">
          <h3>{isRegister ? "Login success" : "Login error"}</h3>
          <p>
            {isRegister
              ? "Great!, please login with your username and password in the next page"
              : "The username or email is already in use, please choose another username or email"}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterPage;
