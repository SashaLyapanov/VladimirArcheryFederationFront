import Navbar from "../../components/navbar/Navbar";
import NamePage from "../../components/namePage/NamePage";
import React, {useState} from "react";
import ListArticles from "../../components/news/ListArticles";
import {useEffect} from "react";

const ArticleList = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/general/getArticles')
            .then((res) => res.json())
            .then((result) => {
                setArticles(result);
            });
    }, []);

    return (
        <div>
            <Navbar/>
            <div className={"page-content"}>
                <NamePage name={'Новости'}/>
                <ListArticles articles={articles}/>
            </div>
        </div>
    )

}

export default ArticleList;