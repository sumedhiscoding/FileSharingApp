import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DownloadPage from "./pages/DownloadPage";
import Password from "./pages/Password";
const App = () => {
  const [backendpath,setBackendPath]=useState("");
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/file/:id" element={<DownloadPage />} />
        <Route path="/file/password/:id" element={<Password/>} />
      </Routes>
    
    </Router>
  );
};

export default App;
