/* Schedule.tsx */
import React, { useState } from 'react';
import data from '../context/schedule.json';
import '../styles/schedule.css';

const SchedulePage: React.FC = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Define country priority (JPY first, then USD)
  const countryPriority: { [key: string]: number } = {
    'JPY': 1,
    'USD': 2,
  };

  // Group events by date and sort them
  const groupedEvents = data.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {} as { [date: string]: typeof data });

  // Sort events within each date by country priority and time
  Object.values(groupedEvents).forEach(events => {
    events.sort((a, b) => {
      // First sort by country priority
      const priorityA = countryPriority[a.currency] || 999;
      const priorityB = countryPriority[b.currency] || 999;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If same country, sort by time
      if (!a.time) return 1;
      if (!b.time) return -1;
      return a.time.localeCompare(b.time);
    });
  });

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="schedule-container"> 
      <div className="status-bar"> 
        <button className="status-bar-item" onClick={() => { window.location.href = '/'; }}>
          ホーム
        </button>
        <button onClick={() => setShowPastEvents(!showPastEvents)} className="status-bar-item">
          {showPastEvents ? '切替' : '切替'}
        </button>
        <button 
          className="status-bar-item" 
          onClick={() => { window.open('https://www.forexfactory.com/calendar', '_blank'); }}
        >
          リンク
        </button>
      </div>
      
      <div className="schedule-content">
        {sortedDates
          .filter(date => showPastEvents || date >= today)
          .map(date => (
            <div key={date} className="schedule-date">
              <h2 className="schedule-date-title">{date}</h2>
              <div className="schedule-table-container">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>時間</th>
                      <th>国</th>
                      <th>指標</th>
                      <th>⭐️</th>                    
                      <th>前回</th>
                      <th>予想</th>
                      <th>結果</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedEvents[date].map((item, index) => (
                      <tr key={index}>
                        <td>{item.time || '-'}</td>
                        <td>{item.currency || '-'}</td>
                        <td className={item.impact === '★★' ? 'important-event' : ''}>
                          {item.event.length > 25 ? item.event.substring(0, 25) + "..." : item.event}
                        </td>
                        <td className={
                          item.impact === '★★' ? 'important-impact' : 
                          item.impact === '★' ? 'medium-event' : ''
                        }>
                          {item.impact || '-'}
                        </td>                        
                        <td>{item.previous || '-'}</td>
                        <td>{item.forecast || '-'}</td>
                        <td>{item.actual || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SchedulePage;
