import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Header from "./components/Header";
import ScholarProvider from "./hook/useGetScholar";
import FacultyProvider from "./hook/useGetFaculty";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <ScholarProvider>
        <FacultyProvider>
          <App />
        </FacultyProvider>
      </ScholarProvider>
    </Router>
  </React.StrictMode>
);
