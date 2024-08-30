//Earning.tsx
import React from 'react';
import earningData from '../context/earning.json';
import '../styles/earning.css';

const EarningsTable = () => {
  // Sort data by date (ascending)
  const sortedData = earningData.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // 日付を月/日の形式に変換する関数
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${month}/${day}`;
  };

  return (
    <div className="earnings-table-container">
      <div className="status-bar"> 
        <button className="status-bar-item" onClick={() => { window.location.href = '/'; }}>
          ホーム
        </button>
      </div>
      <div className="schedule-table-container"> {/* スクロール可能なコンテナを追加 */}
      <table className="earnings-table">
        <thead>
          <tr className="earnings-table-header">
            <th>発表日</th>
            <th>企業名</th>
            <th>業種</th>
            <th>EPS</th>
            <th>EPS</th>
            <th className="revenue-header">売上</th>
            <th className="revenue-header">売上</th>
            <th className="revenue-header">直近</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'earnings-table-row-even' : 'earnings-table-row-odd'}>
              <td>{formatDate(item.date)}</td> {/* 日付フォーマット関数を適用 */}
              <td>{item.company}</td>
              <td>{item.industry}</td>
              <td className="circle">{item.eps1}</td>
              <td>{item.eps2}</td>
              <td className="circle">{item.sales1}</td>
              <td>{item.sales2}</td>
              <td>{item.nearest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default EarningsTable;