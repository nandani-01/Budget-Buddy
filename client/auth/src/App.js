import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login, Signup, Home, Dashboard, Profile, RecordForm, TransactionList } from "./pages";
import Navbar from "./components/Navbar";
import PrivateNavbar from "./components/private/privateNavbar";
import Transactionlist from "./pages/Transactionlist";
import useAuth from "./utils/Auth";


function App() {
  // const [cookies] = useCookies(["token"]);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     console.log(cookies.token)
  //     if(cookies.token){
  //       try {
  //         console.log("hello")
  //         const { data } = await axios.post(
  //           "http://localhost:4000/verify-user",
  //           {},
  //           { withCredentials: true }
  //         );
  
  //         if (data.status) {
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(false);
  //         }
  //       } catch (error) {
  //         console.error("Error verifying user:", error);
  //         setIsAuthenticated(false);
  //       }
  //     }
  //     else{
  //       setIsAuthenticated(false);
  //       return ;
  //     }
      
  //   };

  //   verifyUser();
  // }, [cookies.token]); // Only depend on `cookies.token` to avoid unnecessary re-renders

  // useEffect(() => {
  //   console.log("Authentication status:", isAuthenticated);
  // }, [isAuthenticated]); // Logs whenever authentication state changes

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/record" element={<RecordForm />} />
        <Route path="/record/transactions" element={<TransactionList />} />
        <Route path="/api/dashboard" element={<Dashboard />} />
        <Route path="/api/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
