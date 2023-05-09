import SearchSports from "../../components/search/searchSports"
import Navbar from "../../components/navbar/Navbar"
import NamePage from '../../components/namePage/NamePage'
import SportsListAdmin from "../../components/sports/SportsListAdmin"
import React, {useEffect, useState} from "react"

const ListSportsman = () => {

    const [sports, setNews] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:3001/sports')
          .then((res) => res.json())
          .then((result) => {
            setNews(result);
          });
      }, []);

    return (
        <>
        <Navbar/>
        <NamePage name={'Спортсмены'}/>
        <SearchSports/>
        <SportsListAdmin sports={sports}/>
        </>
    )
}

export default ListSportsman