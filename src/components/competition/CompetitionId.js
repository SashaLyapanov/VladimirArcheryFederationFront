import Button from '../button/Button'
import {useContext, useState} from 'react'
import {CustomContext} from '../../utils/Context'
import {useNavigate} from 'react-router'
import {useEffect} from "react";
import {formatDateLocal} from "../../utils/date-utils";

const CompetitionId = (competitionId) => {

    const {user, setUser} = useContext(CustomContext);
    const navigate = useNavigate();
    const [competition, setCompetition] = useState();
    const [alreadyReg, setAlreadyReg] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/general/competition?id=' + competitionId?.competitionId);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result) {
                    setCompetition(result);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        const checkAlreadyReg = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/sportsman/checkApplication?sportsmanId=' + user?.id + '&competitionId=' + competitionId?.competitionId);
                const result = await response.json();
                setAlreadyReg(result);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchData();
        checkAlreadyReg();
    }, [competitionId]);


    const onclick = (id) => {
        if (!user.role) {
            navigate('/login')
        } else if (id==='registration') {
            navigate(`/registrationSports/${competitionId?.competitionId}`)
        } else if (id==='listApplication') {
            navigate(`/applicationsList/${competitionId?.competitionId}`)
        } else if (id==='editCompetition') {
            navigate(`/editCompetition/${competitionId?.competitionId}`)
        }
    }

    const checkSportsman = () => {
        return !user.role || user.role === 'SPORTSMAN';
    }

    const checkAlreadyRegistration = () => {
        if (alreadyReg) {
            return alreadyReg === true;
        }
    }

    const checkCompetitionPeriod = () => {
        return  competition?.status === 'FUTURE' || competition?.status === 'PRESENT';
    }

    const checkAdmin = () => {
        return user.role === 'ADMIN';
    }

    const checkCompetitionIsFuture = () => {
        return competition?.status === 'FUTURE';
    }

    const bowTypeList = competition?.bowTypeList.map(bowType => bowType.bowTypeName).join(', ');

    return (
        <div className='competitions'>
            <div className='container margin-competition'>
                <p className="fonts-roboto-black name-competition">{competition?.name}</p>
                <div className="content-competition-container">
                    <p className="content-competition fonts-roboto-light">Даты проведения: <span
                            className="content-competition-details"> {competition?.date && formatDateLocal(competition?.date)} - {competition?.endDate && formatDateLocal(competition?.endDate)}</span>
                    </p>
                    <p className="content-competition fonts-roboto-light">Место проведения: <span
                        className="content-competition-details"> {competition?.place}</span></p>
                    <p className="content-competition fonts-roboto-light">Вид соревнований: <span
                        className="content-competition-details">{competition?.type?.name}</span></p>
                    <p className="content-competition fonts-roboto-light">Классы лука: <span
                        className="content-competition-details">{bowTypeList}</span></p>
                    <p className="content-competition fonts-roboto-light">Главный судья: <span
                        className="content-competition-details">{competition?.mainJudge}</span></p>
                </div>

                <div>
                    <p className="content-competition-label">Описание мероприятия:</p>
                    <p className="content-competition-description fonts-roboto-light">{competition?.description}</p>
                </div>

                <div className='button_flex line-block'>
                    {checkSportsman() && checkCompetitionPeriod() && checkAlreadyRegistration() && <Button parametr='Зарегистрироваться'
                                                 id='registration'
                                                 functionClick={()=> onclick('registration')}
                    />}
                    {<Button parametr='Список зарегистрированных спортсменов'
                                                 className='long_button'
                                                 functionClick={()=> onclick('listApplication')}
                                                 id='listApplication'/>
                    }
                    {checkAdmin() && checkCompetitionIsFuture() && <Button
                        parametr='Редактировать соревнование'
                        className='long_button'
                        id='editCompetition'
                        functionClick={()=> onclick('editCompetition')}
                    />}
                </div>
            </div>
        </div>

    )
}

export default CompetitionId