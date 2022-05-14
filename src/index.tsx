import * as React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import { Home } from "./Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EditPage } from "./EditPage";

ReactDOM.render(
  <Router>
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<EditPage />} path="/edit/:id" />
    </Routes>
  </Router>,
  document.getElementById("root")
);
