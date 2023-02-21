import React from "react";
import "./Register.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";

import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [obj, setObj] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [disButton, setDisButton] = useState(true);
  //func
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const isPassBiggerThenEight = (pass) =>
    pass.length < 8
      ? setError("The Password must contain at least eigth digits")
      : setError(" ");
  const x = () => {
    Object.keys(obj).forEach((key) => {
      if (!obj[key]) {
        setDisButton(true);
      } else {
        setDisButton(false);
      }
    });
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <TextField
          onChange={(event) => {
            setObj({ ...obj, email: event.target.value });
            x();
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
          onChange={(event) => {
            setObj({ ...obj, username: event.target.value });
            x();
          }}
          placeholder="User name"
          variant="standard"
          helperText="please enter your username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          onChange={(e) => {
            isPassBiggerThenEight(e.target.value);
            setObj({ ...obj, password: e.target.value });
            x();
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
          onClick={() => console.log(obj)}
          disabled={disButton}
          variant="filledTonal"
          endIcon={<SendIcon />}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
