import React from "react";
import ArticleWindow from "./ArticleWindow";

const ListArticles = ({articles}) => {

    return(
        <div className='competitions'>
            <div className='container container_for_competition'>
                <div className='list_items'>
                    {articles.map((article) => (
                        <ArticleWindow key={article?.id} article={article}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListArticles;