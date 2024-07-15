import React, {useState} from 'react';
import {useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Search from '../../components/search/Search'
import NamePage from '../../components/namePage/NamePage'
import '../../style.css';
import ListCompetition from '../../components/competition/ListCompetition'
import Button from "../../components/button/Button";


const Calendar = () => {


    const [allCompetitions, setAllCompetitions] = useState([]);
    const [competitions, setCompetitions] = useState([]);
    const [period, setPeriod] = useState('will');


    useEffect(() => {
        fetch('http://localhost:8080/api/v1/general/competitions')
            .then((res) => res.json())
            .then((result) => {
                setAllCompetitions(result);
                setCompetitions(result.filter(competition => competition?.status === "FUTURE" || competition?.status === "PRESENT"));
            });
    }, []);

    const checkPeriod = () => {
        if (period === 'will') {
            return "Смотреть прошедшие соревнования"
        } else {
            return "Смотреть текущие и будущие соревнования"
        }
    }

    const onClick = () => {
        if (period === 'will') {
            setPeriod('was');
            const filteredCompetitions = allCompetitions.filter(competition => competition?.status === "PAST");
            setCompetitions(filteredCompetitions);
        } else {
            setPeriod('will');
            const filteredCompetitions = allCompetitions.filter(competition => competition?.status === "FUTURE" || competition?.status === "PRESENT");
            setCompetitions(filteredCompetitions);
        }
    }

    return (
        <div className={'page-content'}>
            <Navbar/>
            <NamePage name={'Соревнования'}/>
            <Search/>
            <Button
                parametr={checkPeriod()}
                className='competiitonBtn'
                functionClick={onClick}
            />
            <ListCompetition parametr={competitions}/>
        </div>
    )
}

export default Calendar