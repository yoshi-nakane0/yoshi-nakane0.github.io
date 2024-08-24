// News.tsx
import React, { useState, useEffect } from 'react';
import '../styles/news.css';
import newsData from '../context/news.json'; // news.jsonをimport

interface NewsItem { 
  title: string; 
  content: string; 
}

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]); // 型を明示的に指定
  const [selectedNews, setSelectedNews] = useState<string | null>(null);

  useEffect(() => {
    setNewsItems(newsData); 
  }, []);

  const handleClick = (content: string) => {
    setSelectedNews(content);
  };

  return (
    <div className="news-container">
      <div className="status-bar">
        <button className="status-bar-item" onClick={() => { window.location.href = '/'; }}>
          ホーム
        </button>
      </div>
      <h1 className="news-heading">ニュース</h1>

      <ul className="news-list">
  {newsItems.map((item: { title: string; content: string }, index: number) => (
    <li key={index} className="news-item">
      <span onClick={() => handleClick(item.content)} className="news-link">
        {item.title}
      </span>
    </li>
  ))}
</ul>
      {selectedNews && (
        <div className="news-content">
          <p dangerouslySetInnerHTML={{ __html: selectedNews.replace(/\n/g, '<br />') }} /> 
        </div>
      )}
    </div>
  );
};

export default News;
