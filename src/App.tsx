import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Schedule from './pages/Schedule.tsx';
import News from './pages/News.tsx';
import Earning from './pages/Earning.tsx';
import Target from './pages/Target.tsx';
import Control from './pages/Control.tsx';
import Trending from './pages/Trending.tsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/news" element={<News />} />
        <Route path="/earning" element={<Earning />} />
        <Route path="/target" element={<Target />} />
        <Route path="/control" element={<Control />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Router>
  );
}

export default App;