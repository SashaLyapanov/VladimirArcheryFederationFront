import Navbar from "../../components/navbar/Navbar";
import NamePage from "../../components/namePage/NamePage";
import SportsmanList from "../../components/sports/SportsmanList";
import {useEffect, useState} from "react";
import FilesList from "../../components/regionalTeam/FilesList";

const RegionalTeam = () => {

    const [sportsmen, setSportsmen] = useState();
    const [filesList, setFilesList] = useState();

    useEffect(() => {
        const fetchSportsmen = async () => {
            try {
                await fetch('http://localhost:8080/api/v1/general/regionalTeam')
                    .then((res) => res.json())
                    .then((result) => {
                        setSportsmen(result);
                    });
            } catch (e) {
                console.error(e);
            }
        };
        const fetchFilesList = async () => {
            try {
                await fetch('http://localhost:8080/api/v1/general/regionalTeamFiles')
                    .then((res) => res.json())
                    .then((result) => {
                        setFilesList(result);
                    })
            } catch (e) {
                console.error(e);
            }
        }
        fetchSportsmen();
        fetchFilesList();
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="page-content">
                <NamePage name='Сборная команда Владимирской области'/>
                <div style={{marginBottom: '20px'}}>
                    <h2 className='info-block'>Справочная информация</h2>
                    {filesList && <FilesList filesList={filesList}/>}
                </div>
                <h2 className='info-block'>Члены региональной сборной команды</h2>
                <SportsmanList sportsmen={sportsmen}/>
            </div>
        </div>
    )
}

export default RegionalTeam;