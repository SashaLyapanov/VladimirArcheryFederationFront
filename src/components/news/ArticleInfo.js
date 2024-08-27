import {useEffect, useState} from "react";
import React from "react";
import {formatDateLocal} from "../../utils/date-utils";
import Button from "../button/Button";
import {useNavigate} from "react-router";
import {useContext} from "react";
import {CustomContext} from "../../utils/Context";

const ArticleInfo = (articleId) => {
    const [imgState, setImgState] = useState();
    const [article, setArticle] = useState();
    const navigate = useNavigate();
    const {user} = useContext(CustomContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/general/getArticle?articleId=' + articleId?.articleId);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result) {
                    setArticle(result);
                    fetchArticleImage(result?.link);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [articleId]);

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
    }

    function checkAdminRole(role) {
        return role === "ADMIN";
    }

    const onClick = () => {
        navigate(`/editArticle/${articleId?.articleId}`);
    }

    const deleteClick = async () => {
        const response = await fetch('http://localhost:8080/api/v1/admin/deleteArticle?articleId=' + articleId?.articleId, {
            method: "post"
        });
        if (response.ok) {
            alert('Новость успешно удалена')
            navigate(`/articleList`);
        } else {
            console.error('Ошибка при удалении новости');
        }
    }

    return (
        <div>
            {checkAdminRole(user.role) &&
                <div>
                    <Button parametr={"Удалить"} className='button editButton' functionClick={deleteClick}/>
                    <Button parametr={"Редактировать"} className='button editButton' functionClick={onClick}/>
                    <br/>
                </div>}
            <div className='container'>
                <p className='center_position article_header fonts-roboto-black'>{article?.name}</p>
                <p className='article-date'>{article?.dateTime && formatDateLocal(article?.dateTime)}</p>
                <div className="img-block">
                    <img src={imgState} alt={"Картинка новости"} className={'img-block img'}/>
                </div>
                <div>
                    <p className={'article_info'}>{article?.body}</p>
                </div>
            </div>
        </div>
    );

}

export default ArticleInfo;