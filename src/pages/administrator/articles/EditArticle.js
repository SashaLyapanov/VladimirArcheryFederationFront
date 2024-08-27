import {useEffect, useState} from "react";
import axios from "../../../utils/axios";
import Navbar from "../../../components/navbar/Navbar";
import NamePage from "../../../components/namePage/NamePage";
import EditArticleForm from "../articles/EditArticleForm";
import {useParams} from "react-router";

const EditArticle = () => {
    const articleId = useParams();
    const [article, setArticle] = useState();

    useEffect(() => {
        {
            axios.get('/general/getArticle?articleId=' + articleId?.aritcleId)
                .then(resp => {
                    setArticle(resp.data)
                })
                .catch(e => {
                        console.error(e);
                    }
                )
        }}, [articleId])

    return (
        <div>
            <Navbar/>
            <div className={'page-content'}>
                <NamePage name={'Редактирование новости'}/>
                {article && <EditArticleForm info={article}/>}
            </div>
        </div>
    )
}

export default EditArticle;