import { useLocation } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import ScholarProvider from "./hook/useGetScholar";
import FacultyProvider from "./hook/useGetFaculty";

import './App.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import useToken from './auth/useToken';
// import ForgotPassword from "./pages/ForgotPassword"
import Page404 from './pages/Page404';
import Scholar from './Scholar';
import Faculty from './Faculty';
import Fic from './Fic';
import Director from './Director';
import Examcell from './Examcell';
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
    localStorage.removeItem('shouldLoad');
    return <SignIn setToken={setToken} />;
  }

  
  // console.log("decode", decodedToken)

  if (decodedToken && decodedToken.role === "scholar" ) return <ScholarProvider><Scholar notMtech={true}/></ScholarProvider>
  if (decodedToken && decodedToken.role === "mtech" ) return <ScholarProvider><Scholar notMtech={false}/></ScholarProvider>
  if (decodedToken && decodedToken.role === "faculty") return <FacultyProvider><Faculty /></FacultyProvider>
  if (decodedToken && decodedToken.role === "fic") return <Fic />
  if (decodedToken && decodedToken.role === "director") return <Director />
  if (decodedToken && decodedToken.role === "ecell") return <Examcell />
  return <Page404 />
}

export default App;
