import React, {useState} from 'react';
import {useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Search from '../../components/search/search'
import NamePage from '../../components/namePage/NamePage'
import '../../style.css';
import CompetitionId from '../../components/competition/CompetitionId';

const Competition = () => {

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
            <CompetitionId />
        </>
    )
}

export default Competition