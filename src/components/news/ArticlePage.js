import Navbar from "../navbar/Navbar";
import ArticleInfo from "./ArticleInfo";
import {useParams} from "react-router";

const ArticlePage = () => {
    const {articleId} = useParams();

    return (
        <div>
            <Navbar/>
            <div className={'page-content'}>
                <ArticleInfo articleId={articleId}/>
            </div>
        </div>
    );

}

export default ArticlePage;