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
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(3);

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const fetchArticles = async (page) => {
        try {
            setLoading(true);
            const response = await apiService.get(`/general/getArticlesWithPagination?numPage=${page}&pageSize=${pageSize}`);
            const result = await response.json();

            setArticles(result.content || []); // Spring Data возвращает статьи в content
            setTotalPages(result.totalPages || 0);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    function checkAdminRole(role) {
        return role === "ADMIN";
    }

    const onClick = () => {
        navigate('/createArticle');
    }

    // Функции для пагинации
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Генерация номеров страниц для отображения
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

        // Корректируем startPage если мы в конце
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div>
            <Navbar/>
            <div className={"page-content"}>
                {checkAdminRole(user?.userData?.role) &&
                    <Button parametr={"Создать новость"} className='button editButton headerButton'
                            functionClick={onClick}/>
                }
                <NamePage name={'Новости'}/>

                {loading ? (
                    <div className="loading">Загрузка...</div>
                ) : (
                    <>
                        <ListArticles articles={articles}/>

                        {/* Пагинация */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className={`pagination-btn ${currentPage === 0 ? 'disabled' : ''}`}
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 0}
                                >
                                    Назад
                                </button>

                                <div className="pagination-pages">
                                    {getPageNumbers().map(page => (
                                        <button
                                            key={page}
                                            className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => handlePageClick(page)}
                                        >
                                            {page + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className={`pagination-btn ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Вперед
                                </button>
                            </div>
                        )}

                        {/* Информация о текущей странице */}
                        <div className="pagination-info">
                            Страница {currentPage + 1} из {totalPages}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ArticleList;