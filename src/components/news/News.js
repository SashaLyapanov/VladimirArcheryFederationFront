import {useEffect, useState} from 'react';
import React from 'react';
import "../news/style.css"
import '../../style.css';
import {Link} from "react-router-dom";
import {apiService} from "../../utils/ApiService";
import {apiServiceFileManager} from "../../utils/ApiServiceFileManager";
import SmallNews from "./SmallNews";

const News = () => {
    const [news, setNews] = useState([]);
    const [imgStates, setImgStates] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 831);

    // Определяем мобильное устройство
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 831);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Загрузка новостей
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/general/getArticlesForHomePage');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setNews(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Загрузка изображений для всех новостей
    useEffect(() => {
        const fetchArticleImages = async () => {
            const newImgStates = {};

            for (const item of news) {
                if (!item?.link) continue;

                try {
                    const response = await apiServiceFileManager.get(
                        "/articleImages/download?fileName=" + item.link
                    );
                    if (!response.ok) {
                        console.error("Ошибка при загрузке изображения для", item.link);
                        continue;
                    }
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    newImgStates[item.id] = objectURL;
                } catch (error) {
                    console.error("Произошла ошибка при загрузке изображения", error);
                }
            }

            setImgStates(newImgStates);
        };

        if (news.length > 0) {
            fetchArticleImages();
        }

        // Очистка URL при размонтировании
        return () => {
            Object.values(imgStates).forEach(url => URL.revokeObjectURL(url));
        };
    }, [news]);

    // Навигация по слайдам
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % news.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
    };

    // Если новостей нет — ничего не рендерим
    if (!news.length) return null;

    // Десктопная версия (ваш оригинальный код)
    if (!isMobile) {
        return (
            <div className="news">
                <div className="container container_for_news">
                    <div className="news_container">
                        <Link to={`/article/${news[0]?.id}`}>
                            <div className="big_news_content">
                                <img src={imgStates[news[0]?.id]} alt={"Картинка новости"} className="photo_news_big"/>
                                <div className="text_big_news">
                                    <p className="fonts-roboto-black title">{news[0]?.name}</p>
                                    <p className="fonts-roboto-regular date_big_news">{news[0]?.body.substring(0, 50)} ...</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="news_container">
                        {news.length > 1 &&
                            <div className="small_news">
                                <SmallNews news={news[1]} imgSrc={imgStates[news[1]?.id]}/>
                                <SmallNews news={news[2]} imgSrc={imgStates[news[2]?.id]}/>
                            </div>}
                        {news.length > 3 &&
                            <div className="small_news margin-small-news">
                                <SmallNews news={news[3]} imgSrc={imgStates[news[3]?.id]}/>
                                <SmallNews news={news[4]} imgSrc={imgStates[news[4]?.id]}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    // Мобильная версия - слайдер
    return (
        <div className="news-mobile">
            <div className="container">
                <div className="news-slider">
                    <div className="slider-container">
                        <div
                            className="slides-wrapper"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`
                            }}
                        >
                            {news.map((item, index) => (
                                <div key={item.id} className="slide">
                                    <Link to={`/article/${item.id}`}>
                                        <div className="slide-content">
                                            <img
                                                src={imgStates[item.id]}
                                                alt={"Картинка новости"}
                                                className="slide-image"
                                            />
                                            <div className="slide-text">
                                                <p className="fonts-roboto-black slide-title">{item.name}</p>
                                                <p className="fonts-roboto-regular slide-date">
                                                    {item.body.substring(0, 80)}...
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Стрелки навигации */}
                    <button className="slider-arrow slider-arrow-prev" onClick={prevSlide}>
                        ‹
                    </button>
                    <button className="slider-arrow slider-arrow-next" onClick={nextSlide}>
                        ›
                    </button>

                    {/* Индикаторы */}
                    <div className="slider-indicators">
                        {news.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;