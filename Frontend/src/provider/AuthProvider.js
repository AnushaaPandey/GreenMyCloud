// // AuthProvider.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AuthContext from '../context/AuthContext'

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     checkLogin();
//   }, []);

//   const checkLogin = () => {
//     axios.get('http://127.0.0.1:8000')
//       .then(response => {
//         if (response.data) {
//           setUser(response.data);
//         } else {
//           setUser(false);
//         }
//       })
//       .catch(error => {
//         console.error(error);
//         setUser(false);
//       });
//   };

//   const login = (credentials) => {
//     axios.post('http://127.0.0.1:8000/login', credentials)
//       .then(response => {
//         setUser(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//         setUser(false);
//       });
//   };

//   const logout = () => {
//     axios.post('http://127.0.0.1:8000/logout')
//       .then(() => {
//         setUser(false);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;









// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     checkLogin();
//   }, []);

//   const checkLogin = () => {
//     axios.get('http://127.0.0.1:8000')
//       .then(response => {
//         if (response.data) {
//           setUser(response.data);
//         } else {
//           setUser(false);
//         }
//       })
//       .catch(error => {
//         console.error(error);
//         setUser(false);
//       });
//   };

//   const login = (credentials) => {
//     axios.post('http://127.0.0.1:8000/login', credentials)
//       .then(response => {
//         setUser(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//         setUser(false);
//       });
//   };

//   const logout = () => {
//     axios.post('http://127.0.0.1:8000/logout')
//       .then(() => {
//         setUser(false);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
