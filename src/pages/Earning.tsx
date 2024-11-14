//Earning.tsx
import React, { useState } from 'react';
import earningData from '../context/earning.json';
import '../styles/earning.css';

const EarningsTable = () => {
  const today = new Date().toISOString().slice(0, 10);

  const sortedData = earningData
    .filter(item => item.date >= today)
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const [earningsDataState, setEarningsDataState] = useState(sortedData);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${month}/${day}`;
  };

  const getNearestStyle = (text) => {
    if (text.includes('上昇')) {
      return { color: 'limegreen' };
    } else if (text.includes('下落')) {
      return { color: 'red' };
    } else {
      return {};
    }
  };

  const epsOptions = ['⭕️', '❌'];
  const salesOptions = ['⭕️', '❌'];

  const handleEpsChange = (index, value) => {
    const updatedData = [...earningsDataState];
    updatedData[index].eps1 = value;
    setEarningsDataState(updatedData);
  };

  const handleSalesChange = (index, value) => {
    const updatedData = [...earningsDataState];
    updatedData[index].sales1 = value;
    setEarningsDataState(updatedData);
  };

  return (
    <div className="earnings-table-container">
      <div className="status-bar">
        <button className="status-bar-item" onClick={() => { window.location.href = '/'; }}>
          ホーム
        </button>
      </div>
      <div className="schedule-table-container">
        <table className="earnings-table">
          <thead>
            <tr className="earnings-table-header">
              <th className="revenue-header">発表日</th>
              <th>企業</th>
              <th>業種</th>
              <th>EPS1</th>
              <th>EPS2</th>
              <th className="revenue-header">次回</th>
              <th className="revenue-header">売上1</th>
              <th className="revenue-header">売上2</th>
              <th className="revenue-header">次回</th>
            </tr>
          </thead>
          <tbody>
            {earningsDataState.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'earnings-table-row-even' : 'earnings-table-row-odd'}>
                <td>{formatDate(item.date)}</td>
                <td>{item.company}</td>
                <td>{item.industry}</td>
                <td className="circle">
                  <select value={item.eps1} onChange={(e) => handleEpsChange(index, e.target.value)}>
                    {epsOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="circle">{item.eps2}</td>
                <td className="circle" style={getNearestStyle(item.near1)}>
                  {item.near1.includes('上昇') && '↑'}
                  {item.near1.includes('下落') && '↓'}
                </td>
                <td className="circle">
                  <select value={item.sales1} onChange={(e) => handleSalesChange(index, e.target.value)}>
                    {salesOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="circle">{item.sales2}</td>
                <td className="circle" style={getNearestStyle(item.near2)}>
                  {item.near2.includes('上昇') && '↑'}
                  {item.near2.includes('下落') && '↓'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsTable;
