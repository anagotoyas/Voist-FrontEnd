import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";
import Cookie from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false)

  const signup = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      if (error.response && Array.isArray(error.response.data)) {
        console.error(error.response.data);
        setErrors(error.response.data);
      } else {
        console.error();
        setErrors([error.response.data.message]);
      }
    } finally{
      setLoading(false)
    }
  };

  const signin = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      if (error.response && Array.isArray(error.response.data)) {
        console.error(error.response.data);
        setErrors(error.response.data);
      } else {
        console.error();
        setErrors([error.response.data.message]);
      }
    } finally {
     
      setLoading(false);
    
    }
  };

  const signout = async ()=>{
    await axios.post("/signout")
    Cookie.remove('token')
    setUser(null)
    setIsAuth(false)
  }

  useEffect(()=>{
    // setLoading(true)
    if(Cookie.get('token')){
      axios.get('/profile').then(res=>{
        setUser(res.data)
        console.log(res.data)
        setIsAuth(true)
        setLoading(false)
      }).catch(()=>{
       setUser(null)
       setIsAuth(false)
      //  setLoading(false)

      }).finally(()=>{
        setLoading(false)
      })
    } 
  },[])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin,
        signout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
