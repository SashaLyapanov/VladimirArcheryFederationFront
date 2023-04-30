import React, {useState} from 'react';
import {useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Search from '../../components/search/search'
import NamePage from '../../components/namePage/NamePage'
import '../../style.css';
import ListCompetition from '../../components/competition/ListCompetition'

const Calendar = () => {
    // const nameInput = [
    //     {
    //         name: 'Название',
    //         placeholder: 'Введите название',
    //         type: 'text'
    //     },
    //     {
    //         name: 'Дата проведения',
    //         placeholder: 'Выберите дату',
    //         type: 'date'
    //     }
    // ]

    const [competitions, setNews] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:3001/competitions')
          .then((res) => res.json())
          .then((result) => {
            setNews(result);
          });
      }, []);

    return(
        <>
            <Navbar/>
            <NamePage name={'Календарь'}/>
            <Search/>
            <ListCompetition parametr={competitions}/>
        </>
    )
}

export default Calendar