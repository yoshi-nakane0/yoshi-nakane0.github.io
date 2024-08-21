import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../context/data.json';
import '../styles/Schedule.css';

interface ScheduleItem {
  date: string;
  time: string | null;
  currency: string | null;
  event: string;
  actual: string | null;
  forecast: string | null;
  previous: string | null;
}

const SchedulePage: React.FC = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [showPastEvents, setShowPastEvents] = useState(true);

  const groupedEvents: { [date: string]: ScheduleItem[] } = {};
  data.forEach(item => {
    if (!groupedEvents[item.date]) {
      groupedEvents[item.date] = [];
    }
    groupedEvents[item.date].push(item);
  });

  const togglePastEvents = () => {
    setShowPastEvents(!showPastEvents);
  };

  return (
    <div className="schedule-header">
        <Link to="/" className="header-button">Back to Home!!!!!</Link>
        <button onClick={togglePastEvents} className="header-button">
          {showPastEvents ? '非表示' : '表示'}
        </button>

      <div className="schedule-content">
        {Object.entries(groupedEvents)
          .filter(([date]) => showPastEvents || date >= today)
          .map(([date, events]) => (
            <div key={date} className="schedule-date">
              <h2 className="schedule-date-title">{date}</h2>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>時間</th>
                    <th>通貨</th>
                    <th>イベント</th>
                    <th>結果</th>
                    <th>予想</th>
                    <th>前回</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((item, index) => (
                    <tr key={index}>
                      <td>{item.time || '-'}</td>
                      <td>{item.currency || '-'}</td>
                      <td className="event-cell">{item.event}</td>
                      <td>{item.actual || '-'}</td>
                      <td>{item.forecast || '-'}</td>
                      <td>{item.previous || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SchedulePage;
