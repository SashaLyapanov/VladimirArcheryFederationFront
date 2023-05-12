import SearchSports from "../../components/search/searchSports"
import Navbar from "../../components/navbar/Navbar"
import NamePage from '../../components/namePage/NamePage'
import SportsListAdmin from "../../components/sports/SportsListAdmin"
import SportsList from "../../components/sports/SportsList"
import React, {useEffect, useState} from "react"
import axios from "axios"
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'


const ListSportsman = () => {
    const {user, setUser} = useContext(CustomContext)

    const [sports, setSports] = useState([]);
    
    function listSportsman(role) {
      if (role == 'admin') {
          fetch('http://localhost:3001/sports')
            .then((res) => res.json())
            .then((result) => {
              setSports(result);
            });
          return <SportsListAdmin sports={sports}/>        
      } else if(role == 'trainer') {
        fetch('http://localhost:3001/sports')
            .then((res) => res.json())
            .then((result) => {
              setSports(result);
            });
          return <SportsList sports={sports}/>
      }
    }

      // axios.get('/sports')
      // .then((res) => res.json())
      //     .then((result) => {
      //       setNews(result);
      //     });
      
      //     console.log(sports)

    return (
        <>
        <Navbar/>
        <NamePage name={'Спортсмены'}/>
        <SearchSports/>
        <div className="container">
          {listSportsman(user.role)}
        </div>
        </>
    )
}

export default ListSportsman