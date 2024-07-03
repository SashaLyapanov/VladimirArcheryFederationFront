import React from "react";
import ArticleWindow from "./ArticleWindow";

const ListArticles = ({articles}) => {

    return(
        <div className='competitions'>
            <div className='container container_for_competition'>
                <div className='list_competition'>
                    {articles.map((article) => (
                        <ArticleWindow article={article}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListArticles;