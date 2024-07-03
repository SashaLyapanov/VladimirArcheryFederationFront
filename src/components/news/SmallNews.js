import React, {useState} from 'react';
import {useEffect} from 'react';
import {Link} from "react-router-dom";

const SmallNews = ({news}) => {
    const [imgState, setImgState] = useState();

    useEffect(() => {
        fetchArticleImages(news?.link);
    }, [news]);

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
        <Link to={`/article/${news?.id}`}>
            <div className="small_news_content">
                <img src={imgState} alt={"Картинка новости"} className="photo_news_small"/>
                <div className="text_small_news">
                    <p className="fonts-roboto-black title">{news?.name}</p>
                    <p className="fonts-roboto-regular date_big_news">{news?.body.substring(0, 50)} ...</p>
                </div>
            </div>
        </Link>
    );
}

export default SmallNews;