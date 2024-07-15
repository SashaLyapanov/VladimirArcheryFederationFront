import SearchSports from "../../components/search/searchSports"
import Navbar from "../../components/navbar/Navbar"
import NamePage from '../../components/namePage/NamePage'
import SportsListAdmin from "../../components/sports/SportsListAdmin"
import ApplicationList from "../../components/sports/ApplicationList"
import React, {useEffect, useState} from "react"
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'


const ListSportsman = ({urls, role}) => {
    const {user, setUser} = useContext(CustomContext)
    const [sports, setSports] = useState([]);
    // const url = 'http://localhost:8080/api/v1/admin/sportsmen'
  
  useEffect(() => {
    fetch(urls)
    // .then((res) => console.log(res))})
    .then((res) => res.json())
    .then((result) => {
        setSports(result);
      });
    }, []);

    function listSportsmen(role) {
      if (role == "ADMIN"){
        return <SportsListAdmin sports={sports}/>
      } else if (role == "COACH"){
        return <ApplicationList sports={sports}/>
      }
    }

    return (
        <>
        <Navbar/>
        <NamePage name={'Спортсмены'}/>
        <SearchSports role={role}/>
        <div className="container">
          {listSportsmen(user.role)}
        </div>
        </>
    )
}

export default ListSportsman