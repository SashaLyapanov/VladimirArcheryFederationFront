import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import "../news/style.css"
import '../../style.css';
import news_0 from '../../img/news_0.jpg'
// import news_1 from '../../img/news_1.jpg'
import news_2 from '../../img/news_2.jpg'
import news_3 from '../../img/news_3.jpg'
import news_4 from '../../img/news_4.jpg'
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

  console.log(news[1]?.title);

//   fetch('http://localhost:3001/news')
//   .then((res) => res.json())
//   .then((result) => {
//     // we received our list of posts
//     console.log(result.title);
//   });



//   const [news, setNews] = useState(
//     [
//         {id: 1, title: 'Соревнование 1', date: '28 февраля'},
//         {id: 2, title: 'Соревнование 2', date: '1 марта'},
//         {id: 3, title: 'Соревнование 3', date: '2 марта'},
//         {id: 4, title: 'Соревнование 4', date: '3 марта'},
//     ]
//   )
    return(
        <div className="news">
            <div className="container container_for_news">
                <a href="@">
                <div className="big_news_content">
                    <img src={news_0} className="photo_news_big"/>
                    <div className="text_big_news">
                        <p className="fonts-roboto-regular date_big_news">{news[0]?.date}</p>
                        <p className="fonts-roboto-black title_big_news">{news[0]?.title}</p>
                    </div>
                </div>
                </a>
                <div className="news_container">
                    <div className="small_news">
                        <SmallNews news={news[1]}/>
                        <SmallNews news={news[2]}/>
                    </div>
                    <div className="small_news margin">
                        <SmallNews news={news[3]}/>
                        <SmallNews news={news[4]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News;