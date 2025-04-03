import react, { useEffect } from "react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const Dashboard = () =>{
const navigate = useNavigate()
useEffect(() => {
    axios
      .get("http://localhost:4000/api/dashboard", { withCredentials: true })
      .catch(() => {
        navigate("/login"); 
      });
  }, [navigate]);
    return(
        <h1>welcome to dashboard</h1>
    );
}

export default Dashboard