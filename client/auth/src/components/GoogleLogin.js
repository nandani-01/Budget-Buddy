import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api";
import PropTypes from "prop-types";

const GoogleLogin = ({ setUser }) => {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        console.log("Auth Code:", authResult.code);
        const result = await googleAuth(authResult.code);
        setUser(result?.data?.data?.user);
        alert("Successfully logged in!");
      } else {
        console.error("Authentication failed:", authResult);
        throw new Error("Invalid Google Authentication response.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Login failed. Please try again.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Login error:", error);
      alert("Google login failed. Please try again.");
    },
    flow: "auth-code",
  });

  return (
    <button
      style={{
        padding: "10px 20px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
      onClick={googleLogin}
    >
      Sign in with Google
    </button>
  );
};

GoogleLogin.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default GoogleLogin;
