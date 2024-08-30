import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Schedule from './pages/Schedule.tsx';
import News from './pages/News.tsx';
import Earning from './pages/Earning.tsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/news" element={<News />} />
        <Route path="/earning" element={<Earning />} />
      </Routes>
    </Router>
  );
}

export default App;