import SearchSports from "../../components/search/searchSports"
import Navbar from "../../components/navbar/Navbar"
import NamePage from '../../components/namePage/NamePage'
import SportsListAdmin from "../../components/sports/SportsListAdmin"
import ApplicationList from "../../components/sports/ApplicationList"
import React, {useEffect, useState} from "react"
import {useContext} from 'react'
import {CustomContext} from '../../utils/Context'
import {apiService} from "../../utils/ApiService";


const ListSportsman = ({urls, role}) => {
    const {user} = useContext(CustomContext)
    const [sports, setSports] = useState([]);

    useEffect(() => {
        const getSportsmen = async () => {
            try {
                const response = await apiService.get(urls, true);
                const result = await response.json();
                setSports(result);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        if (user?.accessToken) {
            getSportsmen();
        }
    }, [user]);

    function listSportsmen(role) {
        if (role === "ADMIN") {
            return <SportsListAdmin sports={sports} user={user}/>
        } else if (role === "COACH") {
            return <ApplicationList sports={sports} user={user}/>
        }
    }

    return (
        <div>
            <Navbar/>
            <div className={"page-content"}>
                <NamePage name={'Спортсмены'}/>
                <SearchSports role={role}/>
                <div className="container">
                    {listSportsmen(user?.userData?.role)}
                </div>
            </div>
        </div>
    )
}

export default ListSportsman