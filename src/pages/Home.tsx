//Home.tsx
import React from 'react';
import {
  CalendarDays, Newspaper, Landmark, Target, Film, Network
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const menuItems = [
  { icon: CalendarDays, label: 'Schedule', gradientStart: '#2e26dd', gradientEnd: '#83b3ec', link: '/schedule'},
  { icon: Newspaper, label: 'News', gradientStart: '#9B51E0', gradientEnd: '#b47de8', link: '/news'},
  { icon: Landmark, label: 'Earning', gradientStart: '#E91E63', gradientEnd: '#f382a8', link: '/earning'},
  { icon: Target, label: 'Target', gradientStart: '#f7bc88', gradientEnd: '#F2994A', link: '/target' },
  { icon: Film, label: 'Control', gradientStart: '#56CCF2', gradientEnd: '#0a96e6', link: '/control' },
  { icon: Network, label: 'Trending', gradientStart: '#27AE60', gradientEnd: '#6ede9d', link: '/trending' },
];

const Home = () => {
  return (
    <div className="app-container">
      <div className="content">
        <main>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item.label} className="menu-item-wrapper">
                <Link to={item.link} className="menu-item">
                  <div className="icon-wrapper" style={{ background: `linear-gradient(135deg, ${item.gradientStart}, ${item.gradientEnd})` }}>
                    <item.icon size={24} color="white" />
                  </div>
                  <span>{item.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
      <nav className="bottom-nav">
        <button className="nav-button active">
          <CalendarDays size={24} />
        </button>
        <button className="nav-button">
          <Newspaper size={24} />
        </button>
        <button className="nav-button">
          <Network size={24} />
        </button>
      </nav>
    </div>
  );
}

export default Home;