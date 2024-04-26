// in js:
import React, { useState, useEffect, useRef, createContext} from "react";


const Context = createContext()

const Provider = ( { children } ) => {


  const [ domain, setDomain ] = useState("http://10.0.2.2:8000")
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)


  
  function initsettingsapp(){

    fetch(`${domain}/api/v1.0/app/settings`,  {
      method: 'GET'
    })
    .then (res => {
      if (res.ok){
        return res.json()
      }else{
        throw res.json()
      }
    })
    .then(json=> {
      console.log(json)
    })
    .catch(error => {
      console.log(error)
    })

  }

  useEffect(()=> {
    initsettingsapp()
  }, [])

  const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn
  }

  return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };

// for tsx:
// import React, { useState, createContext, ReactNode } from "react";

// interface GlobalContextProps {
//   isLoggedIn: boolean;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Context = createContext<GlobalContextProps>({
//   isLoggedIn: false,
//   setIsLoggedIn: () => {}
// });

// interface ProviderProps {
//   children: ReactNode;
// }

// const Provider: React.FC<ProviderProps> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   const globalContext = {
//     isLoggedIn,
//     setIsLoggedIn
//   };

//   return <Context.Provider value={globalContext}>{children}</Context.Provider>;
// };

// export { Context, Provider };




