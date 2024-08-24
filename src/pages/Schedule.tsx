/* Schedule.tsx */
import React, { useState } from 'react';
import data from '../context/data.json';
import '../styles/Schedule.css';

const SchedulePage: React.FC = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [showPastEvents, setShowPastEvents] = useState(false);

  const groupedEvents = data.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {} as { [date: string]: typeof data });

  return (
    <div className="schedule-container"> 
      <div className="status-bar"> 
        <button className="status-bar-item" onClick={() => { window.location.href = '/'; }}>
          ホーム
        </button>
        <button onClick={() => setShowPastEvents(!showPastEvents)} className="status-bar-item">
          {showPastEvents ? '切替' : '切替'}
        </button>
        <button className="status-bar-item" onClick={() => { window.location.href = 'https://www.forexfactory.com/calendar'; }}>
          リンク
        </button>
      </div>
      
      <div className="schedule-content">
        {Object.entries(groupedEvents)
          .filter(([date]) => showPastEvents || date >= today)
          .map(([date, events]) => (
            <div key={date} className="schedule-date">
              <h2 className="schedule-date-title">{date}</h2>
              <div className="schedule-table-container"> {/* スクロール可能なコンテナを追加 */}
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
                    {events.map((item, index) => (
                      <tr key={index}>
                        <td>{item.time || '-'}</td>
                        <td>{item.currency || '-'}</td>
                        <td className="event-cell">
  {item.event.length > 25 ? item.event.substring(0, 25) + "..." : item.event}
</td>
                        <td>{item.impact || '-'}</td>
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
