import React from 'react';
import {Link} from "react-router-dom";

const SmallNews = ({ news, imgSrc }) => {
    return (
        <Link to={`/article/${news?.id}`}>
            <div className="small_news_content">
                <img src={imgSrc} alt={"Картинка новости"} className="photo_news_small"/>
                <div className="text_small_news">
                    <p className="fonts-roboto-black title_small_news">{news?.name}</p>
                    <p className="fonts-roboto-regular date_small_news">
                        {news?.body.substring(0, 30)} ...
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default SmallNews;