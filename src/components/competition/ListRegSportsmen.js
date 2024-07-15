import React, {useEffect, useState} from "react";
import Navbar from "../navbar/Navbar";
import NamePage from "../namePage/NamePage";
import ApplicationList from "../sports/ApplicationList";
import {useParams} from "react-router";

const ListRegSportsmen = () => {

    const competitionId = useParams();

    const [applications, setApplications] = useState([]);
    const [competition, setCompetition] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/sportsman/sportsmenByCompetitionAndBowType?id=' + competitionId?.competitionId + '&bowTypeName=all')
            .then((res) => res.json())
            .then((result) => {
                setApplications(result);
            });
        fetch('http://localhost:8080/api/v1/general/competition?id=' + competitionId?.competitionId)
            .then((res) => res.json())
            .then((result) => {
                setCompetition(result);
            })
    }, [competitionId]);

    return (
        <div>
            <Navbar/>
            <div className={"page-content"}>
                <NamePage name={'Список зарегистрированных спортсменов на ' + competition?.name}/>
                <h3 className='info-block'>Количество зарегистрированных участников: {applications.length}</h3>
                <ApplicationList applications={applications}/>
            </div>
        </div>
    )

}

export default ListRegSportsmen;