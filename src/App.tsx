import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Schedule from './pages/Schedule.tsx';
import News from './pages/News.tsx';
import Finances from './pages/Finances.tsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/news" element={<News />} />
        <Route path="/finances" element={<Finances />} />
      </Routes>
    </Router>
  );
}

export default App;