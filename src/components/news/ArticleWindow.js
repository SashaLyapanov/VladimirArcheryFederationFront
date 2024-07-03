import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {formatDateLocal} from "../../utils/date-utils";


const ArticleWindow = ({article}) => {

    const [imgState, setImgState] = useState();

    useEffect(() => {
        const fetchArticleImage = async (link) => {
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
        };
        fetchArticleImage(article?.link);
    }, [article])

    return (
        <div style={{width: '100%'}}>
            <Link to={`/article/${article?.id}`} style={{textDecoration: 'none'}}>
                <div className="article-block">
                    <img src={imgState} alt={'Картинка новости'} className={'article-image'}/>
                    <div className="article-details">
                        <h2 className="article-title">{article?.name}</h2>
                        <p className="article-date">{article?.dateTime && formatDateLocal(article?.dateTime)}</p>
                        <p className="article-body">{article?.body.substring(0, 532)} ...</p>
                    </div>
                </div>
            </Link>
        </div>
    )


}

export default ArticleWindow;