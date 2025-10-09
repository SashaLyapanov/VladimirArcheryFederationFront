import SearchSports from "../../components/search/searchSports"
import Navbar from "../../components/navbar/Navbar"
import NamePage from '../../components/namePage/NamePage'
import SportsListAdmin from "../../components/sports/SportsListAdmin"
import ApplicationList from "../../components/sports/ApplicationList"
import React, {useEffect, useState} from "react"
import {useContext} from 'react'
import {CustomContext} from '../../utils/Context'
import {apiService} from "../../utils/ApiService";
import {useLocation} from "react-router";


const ListSportsman = ({role}) => {
    const params = new URLSearchParams(document.location.search);
    const location = useLocation();

    const {user} = useContext(CustomContext)
    const [sports, setSports] = useState([]);

    useEffect(() => {
        if (params.get('surname') === '' && params.get('name') === '' && params.get('patronymic') === '' ||
            params.get('name') === null && params.get('name') === null && params.get('patronymic') === null) {
            const getSportsmen = async () => {
                try {
                    const response = await apiService.get('/admin/sportsmen', true);
                    const result = await response.json();
                    setSports(result);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            }
            if (user?.accessToken) {
                getSportsmen();
            }
        } else {
            const getSportsmen = async () => {
                try {
                    const response = await apiService.get('/admin/sportsmenByFIO?surname=' + params.get('surname') + '&name=' + params.get('name') + '&patronymic=' + params.get('patronymic'), true);
                    const result = await response.json();
                    setSports(result);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            }
            if (user?.accessToken) {
                getSportsmen();
            }
        }
    }, [user, location]);

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
            <div className={"container"}>
                <div className={"page-content"}>
                    <NamePage name={'Спортсмены'}/>
                    <SearchSports role={role}/>
                    <div>
                        {listSportsmen(user?.userData?.role)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListSportsman