import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import EditEmployee from "./Page/EditEmployee";
import AddEmployee from "./Page/AddEmployee";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/employee/:id" element={<EditEmployee />} />
      <Route path="/add-employee" element={<AddEmployee />} />
    </Routes>
  </Router>
);
