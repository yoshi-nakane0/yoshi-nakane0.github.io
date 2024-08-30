import React from 'react';
import {
  CalendarDays, Newspaper, Landmark, Target, Hand, Flame, Zap, Wifi, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/home.css';


const menuItems = [
  { icon: CalendarDays, label: 'Schedule', link: '/schedule' },
  { icon: Newspaper, label: 'News', link: '/news' },
  { icon: Landmark, label: 'Earning', link: '/earning' },
  { icon: Target, label: 'Target', link: '/target' },
  { icon: Hand, label: 'Control', link: '/control' },
  { icon: Flame, label: 'Trending', link: '/trending' },
  { icon: Zap, label: 'Quick', link: '/quick' },
  { icon: Wifi, label: 'Network', link: '/network' },
  { icon: Settings, label: 'Settings', link: '/settings' },
];

const SquareMenu = () => {
  const date = new Date().toLocaleString();

  return (
    <main className="flex flex-col items-center justify-center p-4"> 
      <div className="container mx-auto"> {/* コンテナを追加 */}
        <h1 className="text-3xl font-bold text-white mb-2">Stock Market Analysis</h1>
        <p className="text-xl text-white text-center mb-8">{date}</p>

        <div className="grid grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.link} className="menu-item"> 
              <item.icon className="text-white" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </main> 
  );
}

export default SquareMenu;