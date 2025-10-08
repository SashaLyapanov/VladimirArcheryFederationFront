import React, {useContext, useEffect, useState} from "react";
import Navbar from "../navbar/Navbar";
import NamePage from "../namePage/NamePage";
import ApplicationList from "../sports/ApplicationList";
import {useParams} from "react-router";
import {CustomContext} from "../../utils/Context";
import {apiService} from "../../utils/ApiService";

const ListRegSportsmen = () => {

    const competitionId = useParams();

    const {user} = useContext(CustomContext);
    const [applications, setApplications] = useState([]);
    const [competition, setCompetition] = useState();

    useEffect(() => {
        if (!competitionId?.competitionId) return;

        // Всегда грузим карточку соревнования (если публичный эндпоинт)
        (async () => {
            try {
                const res = await apiService.get(`/general/competition?id=${competitionId.competitionId}`, false);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                setCompetition(await res.json());
            } catch (e) {
                console.error(e);
            }
        })();

        // Грузим список спортсменов ТОЛЬКО когда есть токен
        // if (!user?.accessToken) return;

        (async () => {
            try {
                const res = await apiService.get(`/sportsman/sportsmenByCompetitionAndBowType?id=${competitionId?.competitionId}&bowTypeName=all`, false)
                if (!res.ok) {
                    // при 401/500 не пытаемся парсить список
                    console.error('HTTP error:', res.status);
                    setApplications([]); // гарантируем массив
                    return;
                }
                const data = await res.json().catch(() => null);
                // Гарантируем массив: если бэк вернул объект/строку — поставим []
                setApplications(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
                setApplications([]); // на ошибках тоже массив
            }
        })();
    }, [competitionId?.competitionId, user?.accessToken]);

    return (
        <div>
            <Navbar/>
            <div className={"container"}>
                <div className={"page-content"}>
                    <NamePage name={'Список зарегистрированных спортсменов на ' + competition?.name}/>
                    <h3 className='info-block fonts-roboto-black'>Количество зарегистрированных участников: {applications.length}</h3>
                    <ApplicationList applications={Array.isArray(applications) ? applications : []}/>
                </div>
            </div>
        </div>
    )

}

export default ListRegSportsmen;