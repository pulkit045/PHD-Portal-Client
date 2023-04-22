import { useLocation } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";

import './App.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import useToken from './auth/useToken';
// import ForgotPassword from "./pages/ForgotPassword"
import Page404 from './pages/Page404';
import Scholar from './Scholar';
import Faculty from './Faculty';
import Fic from './Fic';
import { useEffect, useState } from 'react';


function App() {
  const location = useLocation();
  const { token, setToken } = useToken();
  const [decodedToken, setDecodedToken] = useState()
  useEffect(() => {
    setDecodedToken(decodeToken(token));
  }, [token])

  // if (location.pathname === '/forgot-password') {
  //   localStorage.removeItem("token");
  //   return <ForgotPassword />;
  // }

  if (location.pathname === "/404") return <Page404 />

  if (location.pathname === "/signup") {
    return <SignUp />
  }
  if (location.pathname === "/signin") {
    return <SignIn setToken={setToken} />
  }

  // console.log("token", token)

  if (!token) {
    return <SignIn setToken={setToken} />;
  }

  if (isExpired(token)) {
    localStorage.removeItem('token');
    return <SignIn setToken={setToken} />;
  }

  
  // console.log("decode", decodedToken)

  if (decodedToken && decodedToken.role === "scholar" ) return <Scholar notMtech={true}/>
  if (decodedToken && decodedToken.role === "mtech" ) return <Scholar notMtech={false}/>
  if (decodedToken && decodedToken.role === "faculty") return <Faculty />
  if (decodedToken && decodedToken.role === "fic") return <Fic />
  return <Page404 />
}

export default App;
