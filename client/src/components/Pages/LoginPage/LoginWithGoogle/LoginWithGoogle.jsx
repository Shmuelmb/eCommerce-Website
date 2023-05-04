import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React, { useContext } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../../../GlobalContext/GlobalContext";
import { useNavigate } from "react-router-dom";
function LoginWithGoogle() {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(GlobalContext);
  const cookies = new Cookies();
  const expiresDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  };

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    const token = googleData.credential;
    cookies.set("TOKEN", token, {
      expires: expiresDate(),
    });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/google-login`,
        {
          method: "POST",
          body: JSON.stringify({
            token: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = await res.json();
      setIsAuth(true);
      cookies.set("TOKEN", user.accessToken, {
        expires: expiresDate(),
      });
      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <GoogleLogin
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginWithGoogle;
