import { useLocation } from 'react-router-dom';
// import * as jwt from 'jsonwebtoken';

import './App.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import useToken from './auth/useToken';
// import ForgotPassword from "./pages/ForgotPassword"
import Page404 from './pages/Page404';


function App() {
  const location = useLocation();
  const { token, setToken } = useToken();

  // if (location.pathname === '/forgot-password') {
  //   localStorage.removeItem("token");
  //   return <ForgotPassword />;
  // }

  if (location.pathname === "/404") return <Page404 />

  if (location.pathname === "/signup") {
    return <SignUp />
  }

  // console.log("token", token) 

  if (!token) {
    return <SignIn setToken={setToken} />;
  }

  // const payload = jwt.decode(token);
  // // console.log(payload);
  // // console.log(Date.now()/1000)
  // if (payload.exp <= Date.now() / 1000) {
  //   localStorage.removeItem('token');
  //   return <SignIn setToken={setToken} />;
  // }

  return <Page404 />

}

export default App;
