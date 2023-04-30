import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import "../news/style.css"
import '../../style.css';
import news_0 from '../../img/news_0.jpg'
import SmallNews from './SmallNews';


const News = () => {
    

    const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/news')
      .then((res) => res.json())
      .then((result) => {
        setNews(result);
      });
  }, []);

    return(
        <div className="news">
            <div className="container container_for_news">
            <div className="news_container">
                <a href="@">
                <div className="big_news_content">
                    <img src={news_0} className="photo_news_big"/>
                    <div className="text_big_news">
                        <p className="fonts-roboto-regular date_big_news">{news[0]?.date}</p>
                        <p className="fonts-roboto-black title">{news[0]?.title}</p>
                    </div>
                </div>
                </a>
                </div>
                <div className="news_container">
                    <div className="small_news">
                        <SmallNews news={news[1]}/>
                        <SmallNews news={news[2]}/>
                    </div>
                    <div className="small_news margin-small-news">
                        <SmallNews news={news[3]}/>
                        <SmallNews news={news[4]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News;