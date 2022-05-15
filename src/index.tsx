import * as React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import { HomePage } from "./HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SummaryPage } from "./SummaryPage";
import { EditPage } from "./EditPage";

ReactDOM.render(
  <Router>
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<EditPage />} path="/edit/:id" />
      <Route element={<SummaryPage />} path="/summary" />
    </Routes>
  </Router>,
  document.getElementById("root")
);
