import React, {useContext, useEffect, useState} from "react";
import Navbar from "../navbar/Navbar";
import NamePage from "../namePage/NamePage";
import ApplicationList from "../sports/ApplicationList";
import {useParams} from "react-router";
import {CustomContext} from "../../utils/Context";

const ListRegSportsmen = () => {

    const competitionId = useParams();

    const {user, setUser} = useContext(CustomContext);
    const [applications, setApplications] = useState([]);
    const [competition, setCompetition] = useState();

    useEffect(() => {
        if (!competitionId?.competitionId) return;

        // Всегда грузим карточку соревнования (если публичный эндпоинт)
        (async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/v1/general/competition?id=${competitionId.competitionId}`
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                setCompetition(await res.json());
            } catch (e) {
                console.error(e);
            }
        })();

        // Грузим список спортсменов ТОЛЬКО когда есть токен
        if (!user?.accessToken) return;

        (async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/v1/sportsman/sportsmenByCompetitionAndBowType?id=${competitionId.competitionId}&bowTypeName=all`,
                    { headers: { Authorization: `Bearer ${user.accessToken}` } } // Content-Type для GET не нужен
                );
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
            <div className={"page-content"}>
                <NamePage name={'Список зарегистрированных спортсменов на ' + competition?.name}/>
                <h3 className='info-block'>Количество зарегистрированных участников: {applications.length}</h3>
                <ApplicationList applications={Array.isArray(applications) ? applications : []}/>
            </div>
        </div>
    )

}

export default ListRegSportsmen;