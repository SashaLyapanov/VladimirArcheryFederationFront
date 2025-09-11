import Navbar from "../../components/navbar/Navbar";
import NamePage from "../../components/namePage/NamePage";
import React, {useContext, useState} from "react";
import ListArticles from "../../components/news/ListArticles";
import {useEffect} from "react";
import {CustomContext} from "../../utils/Context";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router";
import {apiService} from "../../utils/ApiService";

const ArticleList = () => {

    const {user} = useContext(CustomContext)
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Создаем флаг для отслеживания mounted состояния
        let isMounted = true;

        const fetchArticles = async () => {
            try {
                const response = await apiService.get('/general/getArticles');
                const result = await response.json();

                // Проверяем, что компонент еще mounted перед обновлением состояния
                if (isMounted) {
                    setArticles(result);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();

        // Cleanup функция - возвращаем функцию, а не Promise!
        return () => {
            isMounted = false;
        };
    }, []);

    function checkAdminRole(role) {
        return role === "ADMIN";
    }

    const onClick = () => {
        navigate('/createArticle');
    }

    return (
        <div>
            <Navbar/>

            <div className={"page-content"}>
                {checkAdminRole(user?.userData?.role) &&
                    <Button parametr={"Создать новость"} className='button editButton' functionClick={onClick}/>
                }
                <NamePage name={'Новости'}/>
                <ListArticles articles={articles}/>
            </div>
        </div>
    )

}

export default ArticleList;