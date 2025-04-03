import axios from "axios";
import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () =>{
    const navigate = useNavigate()
useEffect(() => {
    axios
      .get("http://localhost:4000/api/profile", { withCredentials: true })
      .catch(() => {
        navigate("/login"); 
      });
  }, [navigate]);
    return(
        <h1>welcome to Profile</h1>
    );
}

export default Profile;