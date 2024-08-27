import Navbar from "../../components/navbar/Navbar";
import NamePage from "../../components/namePage/NamePage";
import React, {useContext, useState} from "react";
import ListArticles from "../../components/news/ListArticles";
import {useEffect} from "react";
import {CustomContext} from "../../utils/Context";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router";

const ArticleList = () => {

    const {user} = useContext(CustomContext)
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/general/getArticles')
            .then((res) => res.json())
            .then((result) => {
                setArticles(result);
            });
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
                {checkAdminRole(user.role) &&
                    <Button parametr={"Создать новость"} className='button editButton' functionClick={onClick}/>
                }
                <NamePage name={'Новости'}/>
                <ListArticles articles={articles}/>
            </div>
        </div>
    )

}

export default ArticleList;