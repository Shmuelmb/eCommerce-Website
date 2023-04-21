import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "@mui/material/Modal";
import Cookies from "universal-cookie";
import { GlobalContext } from "../../GlobalContext/GlobalContext";
import { BASE_URL } from "../../../.js/constant-vars";
import { scrollToTop } from "../../../.js/functions";

const LoginPage = () => {
  const { setIsAuth, setLoadingAppData } = useContext(GlobalContext);
  //init package
  const cookies = new Cookies();
  //useState
  const navigate = useNavigate("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [obj, setObj] = useState({
    username: "",
    password: "",
  });
  const [disButton, setDisButton] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  //useEffect
  useEffect(() => {
    const checkLenOfInput = (arr) => arr.every((val) => val.length > 0);
    const objVal = Object.values(obj);
    if (checkLenOfInput(objVal) && obj.password.length > 7) {
      setDisButton(false);
    } else {
      setDisButton(true);
    }
  }, [obj]);

  useEffect(() => {
    scrollToTop();
  }, []);
  //func
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const isPassBiggerThenEight = (pass) =>
    pass.length < 8
      ? setError("The Password must contain at least eight digits")
      : setError(" ");

  const expiresDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  };
  //api func
  const login = async (checkUser) => {
    try {
      const newUser = JSON.stringify(checkUser);
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: newUser,
      });
      const user = await response.json();

      if (!user.login) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
        setIsAuth(true);
        setLoadingAppData(true);

        cookies.set("TOKEN", user.accessToken, {
          expires: expiresDate(),
        });
        setTimeout(() => navigate(user.navigate), 3000);
      }
      setOpenModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login">
          <TextField
            onChange={(event) => {
              setObj({ ...obj, username: event.target.value });
            }}
            type="text"
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
            onClick={() => login(obj)}
            disabled={disButton}
            variant="filledTonal"
            endIcon={<SendIcon />}
          >
            Login
          </Button>
          <p onClick={() => navigate("/register")}>
            Already have an account? Click Here
          </p>
        </div>
        {/* <img className="img2" src={loginImg} alt="s" /> */}
      </div>
      <Modal className="modal-box" open={openModal} onClose={handleClose}>
        <div className="modal-message">
          <h3>{!isLogin ? "Login error" : "Login success!"}</h3>
          <p>
            {!isLogin
              ? "The username or password is incorrect, please try agein "
              : "You'll be taken straight to the homepage"}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;
