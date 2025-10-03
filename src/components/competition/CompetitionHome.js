import {useEffect} from 'react';
import {useState} from 'react';
import React from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css';
import './style.css';
import Competition from './Competition.js';
import {apiService} from "../../utils/ApiService";

const CompetitionHome = () => {

    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        apiService.get('/general/availableCompetitions')
            .then((res) => res.json())
            .then((result) => {
                setCompetitions(result);
            });
    }, []);

    let i = 0

    function listCompetiton(competition) {
        while (i < 3) {
            i += 1
            return <Competition competition={competition}/>
        }
    }

    return (
        <div>
            <div className='container container_for_competition margin'>
                <p className='fonts-roboto-black title'>Ближайшие соревнования</p>
                <div className='list_items'>
                    {competitions.map((competition) => (
                        listCompetiton(competition)
                    ))}
                </div>
                <a href='/competition' className='fonts-roboto-regular link'>Еще...</a>
            </div>
        </div>
    )
}

export default CompetitionHome