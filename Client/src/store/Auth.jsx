import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// auth provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services,setService]=useState("")
const authorizationToken=`Bearer ${token}`
  const storeTokenInLS = (Token) => {
    setToken(Token)
    localStorage.setItem("token", Token);
  };

  let isLogin = !!token;
  // Autatication

  const userAuthentication=async()=>{
    try {
      const res= await fetch("http://localhost:5000/api/auth/user",{
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    })
    if (res.ok) {
      const data = await res.json();
      setUser(data.userData);
    } else {
      console.log("Error fetching user data");
    }
    } catch (error) {
      console.log(error);
    }
  }
  const getServicesData=async()=>{
    try {
      const res= await fetch("http://localhost:5000/api/data/service",{
      method: "GET",
    })
    if (res.ok) {
      const data = await res.json();
      setService(data.data)
    } else {
      console.log("Error fetching user data");
    }
      
    } catch (error) {
      console.log(`server error ${error}`);
    }
  }
  useEffect(() => {
    getServicesData()
    userAuthentication();
  }, []);

  // take care of the logout functionality
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{services, isLogin,authorizationToken, storeTokenInLS, LogoutUser ,user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};