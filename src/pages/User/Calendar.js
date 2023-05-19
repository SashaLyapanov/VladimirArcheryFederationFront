import React, {useState} from 'react';
import {useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Search from '../../components/search/search'
import NamePage from '../../components/namePage/NamePage'
import '../../style.css';
import ListCompetition from '../../components/competition/ListCompetition'


const Calendar = () => {


  const [competitions, setNews] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/general/competitions')
    // .then((res) => console.log(res))})
    .then((res) => res.json())
    .then((result) => {
        setNews(result);
      });
    }, []);

    return(
        <>
            <Navbar/>
            <NamePage name={'Соревнования'}/>
            <Search/>
            <ListCompetition parametr={competitions}/>
        </>
    )
}

export default Calendar