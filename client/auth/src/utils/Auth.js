// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [cookies] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null represents loading state

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.token) {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/verify-user",
            {},
            { withCredentials: true }
          );

          if (data.status) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error verifying user:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, [cookies.token]);

  return { isAuthenticated };
};

export default useAuth;
