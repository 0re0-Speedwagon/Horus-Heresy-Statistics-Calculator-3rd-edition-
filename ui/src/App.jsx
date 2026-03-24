import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import About from "./Routing/About";
import Info from "./Routing/Info";
import Home from "./Routing/Home";

export default function App() {

return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Statistics" element={<Info />} />
        </Routes>
      </Router>
    );
}