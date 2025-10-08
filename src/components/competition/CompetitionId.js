import Button from '../button/Button'
import {useContext, useState} from 'react'
import {CustomContext} from '../../utils/Context'
import {useNavigate} from 'react-router'
import {useEffect} from "react";
import {formatDateLocal} from "../../utils/date-utils";
import RemoveAppModal from "../modalWindows/RemoveAppModal";
import Files from "./Files";
import {apiService} from "../../utils/ApiService";

const CompetitionId = (competitionId) => {


    const {user} = useContext(CustomContext);
    const navigate = useNavigate();
    const [competition, setCompetition] = useState();
    const [alreadyReg, setAlreadyReg] = useState();
    const [removeModalView, setRemoveModalView] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/general/competition?id=' + competitionId?.competitionId);
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
                const response = await apiService.get('/sportsman/checkApplication?sportsmanId=' + user?.userData?.id + '&competitionId=' + competitionId?.competitionId, true);
                const result = await response.json();
                setAlreadyReg(result);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchData();
        if (user?.accessToken && user?.userData?.role === "SPORTSMAN") {
            checkAlreadyReg();
        }
    }, [competitionId]);


    const onclick = (id) => {
        if (id === 'listApplication') {
            navigate(`/applicationsList/${competitionId?.competitionId}`)
        } else if (!user?.userData?.role) {
            navigate('/login')
        } else if (id === 'registration') {
            navigate(`/registrationSports/${competitionId?.competitionId}`)
        } else if (id === 'removeApplication') {
            setRemoveModalView(true);
        } else if (id === 'editCompetition') {
            navigate(`/editCompetition/${competitionId?.competitionId}`)
        } else if (id === 'addProtocols') {
            navigate(`/addProtocols/${competitionId?.competitionId}`)
        } else if (id === 'downloadStartProtocols') {
            fetchStartProtocol(competitionId?.competitionId);
        }
    }

    const fetchStartProtocol = async (competitionId) => {
        setIsDownloading(true);
        try {
            const response = await apiService.get('/admin/generateProtocol?competitionId=' + competitionId, true);

            if (response.ok) {
                // Получаем blob из ответа
                const blob = await response.blob();

                // Создаем URL для blob
                const url = window.URL.createObjectURL(blob);

                // Получаем имя файла из заголовков или генерируем его
                const contentDisposition = response.headers.get('Content-Disposition');
                let filename = 'start_protocol.xlsx'; // значение по умолчанию

                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1];
                    }
                }

                // Создаем временную ссылку для скачивания
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);

                // Программно кликаем по ссылке для скачивания
                link.click();

                // Убираем ссылку из DOM
                document.body.removeChild(link);

                // Освобождаем память от blob URL
                window.URL.revokeObjectURL(url);

            } else {
                console.error('Ошибка при загрузке файла:', response.status);
            }
        } catch (error) {
            console.error('Произошла ошибка', error);
        } finally {
            setIsDownloading(false);
        }
    }

    const checkSportsman = () => {
        return user?.userData?.role === 'SPORTSMAN';
    }

    const checkAlreadyRegistration = () => {
        if (alreadyReg) {
            return alreadyReg === true;
        }
    }

    const checkCompetitionPeriod = () => {
        return competition?.status === 'FUTURE' || competition?.status === 'PRESENT';
    }

    const checkAdmin = () => {
        return user?.userData?.role === 'ADMIN';
    }

    const checkCompetitionIsFuture = () => {
        return competition?.status === 'FUTURE';
    }

    const getStatus = () => {
        if (competition?.status === 'FUTURE') {
            return 'Будущие соревнования, открытые для регистрации';
        } else if (competition?.status === 'PRESENT') {
            return 'Текущие соревнования';
        } else if (competition?.status === 'PAST') {
            return 'Прошедшие соревнования';
        } else if (competition?.status === 'CANCELLED') {
            return 'Отмененные соревнования';
        }
    }

    const bowTypeList = competition?.bowTypeList.map(bowType => bowType.bowTypeName).join(', ');

    return (
        <div className='competitions'>
            <div className='container margin-competition'>
                {removeModalView && <RemoveAppModal competitionId={competitionId} closeModal={setRemoveModalView}/>}
                <p className="fonts-roboto-black name-competition">{competition?.name}</p>
                <div className="content-competition-container">
                    <p className="content-competition fonts-roboto-light">Даты проведения: <span
                        className="content-competition-details"> {competition?.date && formatDateLocal(competition?.date)} - {competition?.endDate && formatDateLocal(competition?.endDate)}</span>
                    </p>
                    <p className="content-competition fonts-roboto-light">Место проведения: <span
                        className="content-competition-details"> {competition?.place}</span></p>
                    <p className="content-competition fonts-roboto-light">Вид соревнований: <span
                        className="content-competition-details">{competition?.type?.name}</span></p>
                    <p className="content-competition fonts-roboto-light">Временной статус соревнований: <span
                        className="content-competition-details">{getStatus()}</span></p>
                    <p className="content-competition fonts-roboto-light">Классы лука: <span
                        className="content-competition-details">{bowTypeList}</span></p>
                    <p className="content-competition fonts-roboto-light">Главный судья: <span
                        className="content-competition-details">{competition?.mainJudge}</span></p>
                </div>

                <div>
                    <h2 className="fonts-roboto-black content-competition-label">Описание мероприятия:</h2>
                    <p className="content-competition-description">{competition?.description}</p>
                </div>

                <Files props={competition}/>

                <div className='button_flex line-block max_button_width button_flex_mobile'>
                    {checkSportsman() && checkCompetitionPeriod() && checkAlreadyRegistration() &&
                        <Button parametr='Зарегистрироваться'
                                className='long_button'
                                id='registration'
                                functionClick={() => onclick('registration')}
                        />}
                    {checkSportsman() && !checkAlreadyRegistration() &&
                        <Button parametr='Отменить заявку'
                                className='long_button'
                                functionClick={() => onclick('removeApplication')}
                                id='removeApplication'/>
                    }
                    {<Button parametr='Список зарегистрированных спортсменов'
                             className='long_button'
                             functionClick={() => onclick('listApplication')}
                             id='listApplication'/>
                    }
                    {checkAdmin() && <Button
                        parametr='Редактировать соревнование'
                        className='long_button'
                        id='editCompetition'
                        functionClick={() => onclick('editCompetition')}
                    />}
                    {checkAdmin() && <Button
                        parametr='Добавить файлы протоколов'
                        className='long_button'
                        id='addProtocols'
                        functionClick={() => onclick('addProtocols')}
                    />}
                    {checkAdmin() && <Button
                        parametr={isDownloading ? 'Скачивание...' : 'Скачать стартовый протокол'}
                        className='long_button'
                        id='downloadStartProtocols'
                        functionClick={() => onclick('downloadStartProtocols')}
                        disabled={isDownloading}
                    />}
                </div>
            </div>
        </div>

    )
}

export default CompetitionId