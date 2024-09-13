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

  // 文字列に基づいてスタイルを決定する関数
  const getNearestStyle = (text) => {
    if (text.includes('上昇')||text.includes('上方修正')) {
      return { color: 'limegreen' }; // 黄緑色
    } else if (text.includes('下落')||text.includes('下方修正')) {
      return { color: 'red' }; // 赤色
    } else {
      return {}; // デフォルトのスタイル
    }
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
            <th className="revenue-header">発表日</th>
            <th>企業</th>
            <th>業種</th>
            <th>EPS</th>
            <th>予想</th>
            <th className="revenue-header">次回</th>
            <th className="revenue-header">売上</th>
            <th className="revenue-header">予想</th>
            <th className="revenue-header">次回</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'earnings-table-row-even' : 'earnings-table-row-odd'}>
              <td>{formatDate(item.date)}</td> {/* 日付フォーマット関数を適用 */}
              <td>{item.company}</td>
              <td>{item.industry}</td>
              <td className="circle">{item.eps1}</td>
              <td className="circle" style={getNearestStyle(item.eps2)}> 
                {item.eps2.includes('上方修正') && '↑'}
                {item.eps2.includes('下方修正') && '↓'}
              </td>
              <td className="circle" style={getNearestStyle(item.near1)}> 
                {item.near1.includes('上昇') && '↑'}
                {item.near1.includes('下落') && '↓'}
              </td>
              <td className="circle">{item.sales1}</td>
              <td className="circle" style={getNearestStyle(item.sales2)}> 
                {item.sales2.includes('上方修正') && '↑'}
                {item.sales2.includes('下方修正') && '↓'}
              </td>
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