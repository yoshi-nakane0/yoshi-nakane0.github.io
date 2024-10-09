import React, { useState, useEffect } from 'react';
import '../styles/target.css';

export default function TargetPage() {

  const [trades, setTrades] = useState(() => {
    const savedTrades = localStorage.getItem('trades');
    return savedTrades
      ? JSON.parse(savedTrades)
      : [
          { id: 1, date: '', type: 'Long', entryPrice: '', exitPrice: '' },
        ];
  });

  const [timeData, setTimeData] = useState(() => {
    const savedTimeData = localStorage.getItem('timeData');
    return savedTimeData
      ? JSON.parse(savedTimeData)
      : [
          { period: 'Day', times: [5, 25, 72], values: ['38,893', '37,584', '38,256'] },
          { period: 'Week', times: [13, 26, 52], values: ['37,805', '38,324', '37,005'] },
          { period: 'Month', times: [12, 24, 60], values: ['37,865', '33,866', '29,097'] },
        ];
  });

  const [currentPrice, setCurrentPrice] = useState(() => {
    const savedCurrentPrice = localStorage.getItem('currentPrice');
    return savedCurrentPrice ? savedCurrentPrice : '';
  });

  const [entryLong, setEntryLong] = useState(() => {
    const savedEntryLong = localStorage.getItem('entryLong');
    return savedEntryLong ? savedEntryLong : '';
  });

  const [entryShort, setEntryShort] = useState(() => {
    const savedEntryShort = localStorage.getItem('entryShort');
    return savedEntryShort ? savedEntryShort : '';
  });

  useEffect(() => {
    localStorage.setItem('trades', JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    localStorage.setItem('timeData', JSON.stringify(timeData));
  }, [timeData]);

  useEffect(() => {
    localStorage.setItem('currentPrice', currentPrice);
  }, [currentPrice]);

  useEffect(() => {
    localStorage.setItem('entryLong', entryLong);
  }, [entryLong]);

  useEffect(() => {
    localStorage.setItem('entryShort', entryShort);
  }, [entryShort]);

  const formatNumberWithCommas = (value: string): string => {
    const num = value.replace(/,/g, '');
    if (num === '') return '';
    const parsed = Number(num);
    if (isNaN(parsed)) return value;
    return parsed.toLocaleString();
  };

  const handleTradeChange = (id: number, field: string, value: string) => {
    let formattedValue = value;
    if (field === 'entryPrice' || field === 'exitPrice') {
      formattedValue = formatNumberWithCommas(value);
    }
    setTrades(trades.map(trade =>
      trade.id === id ? { ...trade, [field]: formattedValue } : trade
    ));
  };

  const handleCurrentPriceChange = (value: string) => {
    const formattedValue = formatNumberWithCommas(value);
    setCurrentPrice(formattedValue);
  };

  const handleEntryLongChange = (value: string) => {
    const formattedValue = formatNumberWithCommas(value);
    setEntryLong(formattedValue);
  };

  const handleEntryShortChange = (value: string) => {
    const formattedValue = formatNumberWithCommas(value);
    setEntryShort(formattedValue);
  };

  const addTrade = () => {
    const newId = trades.length > 0 ? Math.max(...trades.map(t => t.id)) + 1 : 1;
    setTrades([
      ...trades,
      { id: newId, date: '', type: '', entryPrice: '', exitPrice: '' },
    ]);
  };

  const deleteTrade = (id: number) => {
    setTrades(trades.filter(trade => trade.id !== id));
  };

  const handleValueChange = (periodIndex: number, valueIndex: number, newValue: string) => {
    const updatedTimeData = timeData.map((period, pIdx) => {
      if (pIdx === periodIndex) {
        let formattedValue = formatNumberWithCommas(newValue);
        const newValues = [...period.values];
        newValues[valueIndex] = formattedValue;
        return { ...period, values: newValues };
      }
      return period;
    });
    setTimeData(updatedTimeData);
  };

  const getMaErrorStatus = (value: string): boolean => {
    if (currentPrice === '') return false;
    const numericCurrentPrice = Number(currentPrice.replace(/,/g, ''));
    const numericMAValue = Number(value.replace(/,/g, ''));
    if (isNaN(numericCurrentPrice) || isNaN(numericMAValue)) return false;
    return Math.abs(numericCurrentPrice - numericMAValue) <= 200;
  };

  return (
    <div className="main-container">
      <div className="status-bar">
        <button className="status-bar-item" onClick={() => { window.location.href = '/'; }}>
          ホーム
        </button>
      </div>
      <div className="content">
        {/* 現在値入力欄の追加 */}
        <h2>Current Value</h2>
        <div className="current-price-input">
          <input
            type="text"
            id="currentPrice"
            value={currentPrice}
            placeholder=""
            onChange={e => handleCurrentPriceChange(e.target.value)}
          />
        </div>
        <h2>Entry Point</h2>
        <div className="entry-summary-widget">
          <div className="summary-item">
            <span>Long:</span>
            <input
              type="text"
              value={entryLong}
              placeholder=""
              onChange={e => handleEntryLongChange(e.target.value)}
            />
          </div>
          <div className="summary-item">
            <span>Short:</span>
            <input
              type="text"
              value={entryShort}
              placeholder=""
              onChange={e => handleEntryShortChange(e.target.value)}
            />
          </div>
        </div>
        
        <div className="trade-history">
          <div className="trade-header">
            <h3>Trade History</h3>
            <button className="add-button" onClick={addTrade}>Add</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Type</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {trades.map(trade => {
                const colorClass = trade.type === 'Long' ? 'text-red' : trade.type === 'Short' ? 'text-blue' : '';
                return (
                  <tr key={trade.id}>
                    <td>
                      <input
                        type="text"
                        value={trade.date}
                        placeholder=""
                        onChange={e => handleTradeChange(trade.id, 'date', e.target.value)}
                        className={`${colorClass} date-input`}
                      />
                    </td>
                    <td>
                      <select
                        value={trade.type}
                        onChange={e => handleTradeChange(trade.id, 'type', e.target.value)}
                        className={colorClass}
                      >
                        <option value=""></option>
                        <option value="Long">Long</option>
                        <option value="Short">Short</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={trade.entryPrice}
                        placeholder=""
                        onChange={e => handleTradeChange(trade.id, 'entryPrice', e.target.value)}
                        className={colorClass}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={trade.exitPrice}
                        placeholder=""
                        onChange={e => handleTradeChange(trade.id, 'exitPrice', e.target.value)}
                        className={colorClass}
                      />
                    </td>
                    <td>
                      <button className="delete-button" onClick={() => deleteTrade(trade.id)}>Del</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="time-data-table">
          <h2>Moving Average (10.8)</h2>
          <table>
            <thead>
              <tr>
                {timeData.map((period) => (
                  <React.Fragment key={period.period}>
                    <th>{period.period}</th>
                    <th>Value</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Assuming all periods have the same number of entries */}
              {timeData[0].times.map((time, index) => (
                <tr key={index}>
                  {timeData.map((period, pIdx) => (
                    <React.Fragment key={pIdx}>
                      <td>{period.times[index]} MA</td>
                      <td>
                        <input
                          type="text"
                          value={period.values[index]}
                          onChange={e => handleValueChange(pIdx, index, e.target.value)}
                          className={getMaErrorStatus(period.values[index]) ? 'error' : ''}
                        />
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
