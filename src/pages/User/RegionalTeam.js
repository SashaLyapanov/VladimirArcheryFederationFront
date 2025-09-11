import Navbar from "../../components/navbar/Navbar";
import NamePage from "../../components/namePage/NamePage";
import SportsmanList from "../../components/sports/SportsmanList";
import {useContext, useEffect, useState} from "react";
import FilesList from "../../components/regionalTeam/FilesList";
import {CustomContext} from "../../utils/Context";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router";
import {apiService} from "../../utils/ApiService";

const RegionalTeam = () => {

    const {user} = useContext(CustomContext);
    const navigate = useNavigate();
    const [sportsmen, setSportsmen] = useState();
    const [filesList, setFilesList] = useState([]);

    useEffect(() => {
        const fetchSportsmen = async () => {
            try {
                await apiService.get('/general/regionalTeam')
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
                await apiService.get('/general/regionalTeamFiles')
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

    function checkAdminRole(role) {
        return role === "ADMIN";
    }

    const editFiles = () => {
        navigate('/editRegionalTeamFiles');
    }

    return (
        <div>
            <Navbar/>
            <div className="page-content">
                <NamePage name='Сборная команда Владимирской области'/>
                <div style={{marginBottom: '20px'}}>
                    <div>
                        <h2 className='info-block'>Справочная информация</h2>
                        {checkAdminRole(user?.userData?.role) && <Button parametr={"Редактировать файлы"} className='button editButton' functionClick={editFiles}/>}
                        <br/>
                        <br/>
                    </div>
                    {filesList && <FilesList filesList={filesList} source="regionalTeam"/>}
                </div>
                <h2 className='info-block'>Члены региональной сборной команды</h2>
                <SportsmanList sportsmen={sportsmen}/>
            </div>
        </div>
    )
}

export default RegionalTeam;