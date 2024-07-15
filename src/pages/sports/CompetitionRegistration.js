import Navbar from '../../components/navbar/Navbar';
import Registration from '../../components/competition/Registration';
import NamePage from '../../components/namePage/NamePage';
import {useParams} from "react-router";
import React from "react";

const CompetitionRegistration = () => {

    const competitionId = useParams();

    return (
        <div>
            <Navbar/>
            <div className={"page-content"}>
                <NamePage name={'Регистрация на соревнования'}/>
                <Registration competitionId={competitionId}/>
            </div>
        </div>
    );
}

export default CompetitionRegistration