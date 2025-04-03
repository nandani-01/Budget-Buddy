
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right" });

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => navigate("/"), 1000);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError("Something went wrong. Try again.");
    }

    setInputValue({ email: "", password: "", username: "" });
  };

  return (
    <section className="bg-warning min-vh-100 d-flex align-items-center justify-content-center">
  <div className="container">
        <div className="row gx-lg-5 align-items-center">
          <div className="col-lg-6 mb-5">
            <h1 className="my-5 display-3 fw-bold">
              The best offer <br />
              <span className="text-primary">for your business</span>
            </h1>
            <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="col-lg-6">
          <div className="card mx-auto" style={{ maxWidth: "500px" }}> 
              <div className="card-body py-5 px-md-5">
                <h2>Signup Account</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    {/* <label>Email</label> */}
                    <input
                      type="email"
                      name="email"
                      value={email}
                      className="form-control"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    {/* <label>Username</label> */}
                    <input
                      type="text"
                      name="username"
                      value={username}
                      className="form-control"
                      placeholder="Enter your username"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    {/* <label>Password</label> */}
                    <input
                      type="password"
                      name="password"
                      value={password}
                      className="form-control"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>

                  <p className="mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>

                  <div className="text-center mt-3">
                    <GoogleOAuthProvider clientId="163584497548-6uovpebrvioqdepje90dinuagvi60ulc.apps.googleusercontent.com">
                      <GoogleLogin
                        onSuccess={(response) => {
                          console.log("Google Login Success:", response);
                          handleSuccess("Logged in successfully with Google!");
                        }}
                        onError={() => handleError("Google Login Failed")}
                      />
                    </GoogleOAuthProvider>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Signup;
