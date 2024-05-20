import { createContext } from "react";

// export const AuthContext = createContext(null)


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    return(
        <AuthContext.Provider value={'http://localhost:8000'}>{children}</AuthContext.Provider>
    );
}
