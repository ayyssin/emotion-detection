import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { checkText } from "./api";
import Admin from "./components/Admin";

import InputForm from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputForm />}></Route>
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
