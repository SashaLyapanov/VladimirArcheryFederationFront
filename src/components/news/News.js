import {useEffect} from 'react';
import {useState} from 'react';
import React from 'react';
import "../news/style.css"
import '../../style.css';
import SmallNews from './SmallNews';
import {Link} from "react-router-dom";


const News = () => {

    const [news, setNews] = useState([]);
    const [imgState, setImgState] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/general/getArticles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setNews(result);
                if (result.length > 0) {
                    fetchArticleImages(result[0]?.link);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const fetchArticleImages = async (link) => {
        try {
            const response = await fetch('http://localhost:8081/articleImages/download?fileName=' + link)
            if (response.ok) {
                const blob = await response.blob();
                const objectURL = URL.createObjectURL(blob);
                setImgState(objectURL);
            } else {
                console.error('Ошибка при загрузке изображения');
            }
        } catch (error) {
            console.error('Произошла ошибка', error);
        }
    }

    return (
        <div className="news">
            <div className="container container_for_news">
                <div className="news_container">
                    <Link to={`/article/${news[0]?.id}`}>
                        <div className="big_news_content">
                            <img src={imgState} alt={"Картинка новости"} className="photo_news_big"/>
                            <div className="text_big_news">
                                <p className="fonts-roboto-black title">{news[0]?.name}</p>
                                <p className="fonts-roboto-regular date_big_news">{news[0]?.body.substring(0, 50)} ...</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="news_container">
                    {news.length > 0 &&
                        <div className="small_news">
                            <SmallNews news={news[1]}/>
                            <SmallNews news={news[2]}/>
                        </div>}
                    { news.length > 0 &&
                        <div className="small_news margin-small-news">
                            <SmallNews news={news[3]}/>
                            <SmallNews news={news[4]}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default News;