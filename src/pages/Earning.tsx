// Earning.tsx
import React, { useState, useEffect } from 'react';
import earningData from '../context/earning.json';
import '../styles/earning.css';

const EarningsTable = () => {
  const [earningsDataState, setEarningsDataState] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const savedData = localStorage.getItem('earningsData');
    
    let mergedData = [...earningData];
    
    if (savedData) {
      const parsedSavedData = JSON.parse(savedData);
      const savedMap = new Map();
      parsedSavedData.forEach(item => {
        savedMap.set(`${item.date}-${item.company}`, item);
      });

      mergedData = mergedData.map(item => 
        savedMap.has(`${item.date}-${item.company}`) 
          ? savedMap.get(`${item.date}-${item.company}`)
          : item
      );
    }

    const filteredData = mergedData
      .filter(item => item.date >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setEarningsDataState(filteredData);
  }, []);

  useEffect(() => {
    localStorage.setItem('earningsData', JSON.stringify(earningsDataState));
  }, [earningsDataState]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${month}/${day}`;
  };

  const getNearestStyle = (text) => {
    const t = text || '';
    if (t.includes('上昇')) return { color: 'limegreen' };
    if (t.includes('下落')) return { color: 'red' };
    return {};
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
          {/* Table headers remain same */}
          <tbody>
            {earningsDataState.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'earnings-table-row-even' : 'earnings-table-row-odd'}>
                {/* Table cells with safety checks */}
                <td className="circle" style={getNearestStyle(item.near1)}>
                  {(item.near1 || '').includes('上昇') && '↑'}
                  {(item.near1 || '').includes('下落') && '↓'}
                </td>
                {/* Other table cells */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsTable;
