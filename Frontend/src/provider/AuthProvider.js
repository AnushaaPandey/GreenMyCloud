
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = (props) => {
  // user null = loading
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    axios.get("http://localhost:8000").then((response) => {
      if (response.data) {
        setUser(true);
        // getUserData();
      } else {
        setUser(false);
        // setUserData(null);
      }
    }).catch((error) => {
      console.error(error);
      setUser(false);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};


