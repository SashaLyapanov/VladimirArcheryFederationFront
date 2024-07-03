import React from 'react';
import Navbar from '../../components/navbar/Navbar'
import '../../style.css';
import CompetitionId from '../../components/competition/CompetitionId';
import {useParams} from "react-router";

const Competition = () => {

    const competitionId = useParams();

    return (
        <div>
            <Navbar/>
            <div className={'page-content'}>
                <CompetitionId competitionId={competitionId?.competitionId}/>
            </div>
        </div>
    )
}

export default Competition