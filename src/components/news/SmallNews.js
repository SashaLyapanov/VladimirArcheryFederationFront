import React from 'react';
import news_1 from '../../img/news_1.jpg';

const SmallNews = ({news}) => {
    return (
        <a href="@">
            <div className="small_news_content">
                <img src={news_1} className="photo_news_small"/>
                <div className="text_small_news">
                    <p className="fonts-roboto-regular date_small_news">{news?.date}</p>
                    <p className="fonts-roboto-black title_small_news">{news?.title}</p>
                </div>
            </div>
        </a>
    );
}

export default SmallNews;