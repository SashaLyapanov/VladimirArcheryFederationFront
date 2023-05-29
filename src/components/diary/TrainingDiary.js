import addTrainingImage from "../../img/add.png"
import { useNavigate } from "react-router"
import {useEffect, useState} from 'react'
import { useContext} from 'react'
import { CustomContext } from "../../utils/Context"
import { DatesContext, TrainingContext } from '../../utils/ContextDate'
import Button from "../button/Button"
import axios from "../../utils/axios"
import { render } from "react-dom"

const TrainingDiary = () => {

    const navigate = useNavigate()
    const {dates, setDates} = useContext(DatesContext)
    const {user, setUser} = useContext(CustomContext)
    const {training, setTraining} = useContext(TrainingContext)
    const [typeTraining, setTypeTraining] = useState()
    const [dateTraining, setDateTraining] = useState()
    const [listTraining, setListTraining] = useState([])



    const newTraining = {
        "date": dateTraining,
        "sessionType": {
            "id": typeTraining
        },
        "sportsman": {
            "id": user?.id
        }

    }

    const trainingContent = (e) => {
        console.log(e.target.id)
        axios.get(`sportsman/diary/getSessionExercises?id=${e.target.id}`)
        .then(({data}) => setTraining(data))
        navigate('/training')
    }


    useEffect(() => {
        if(dates.getMonth() < 10){
            let date = `${dates.getFullYear()}/0${dates.getMonth()}/${dates.getDate()}`
            axios.get(`sportsman/diary/allSportsmanSessionsByDay?email=${user?.email}&date=${date}`)
            .then(({data}) => setListTraining(data))
        } else{
            let date = `${dates.getFullYear()}/${dates.getMonth()}/${dates.getDate()}`
            axios.get(`sportsman/diary/allSportsmanSessionsByDay?email=${user?.email}&date=${date}`)
            .then(({data}) => setListTraining(data))
        }

        
    },[dates, user])

    useEffect(() => {
        if(dates.getMonth() < 10){
            setDateTraining(`${dates.getFullYear()}-0${dates.getMonth()}-${dates.getDate()}`)
        } else{
            setDateTraining(`${dates.getFullYear()}-${dates.getMonth()}-${dates.getDate()}`)
        }
        
    }, [dates])

    const trainingAdd = () => {
        document.querySelector('.training-add').classList.add('next')
        document.getElementById('next-1').classList.remove('next')
        document.getElementById('list-competition').classList.add('next')
    }

    const month = [ "января", 
                    "февраля", 
                    "марта", 
                    "апреля", 
                    "мая", 
                    "июня", 
                    "июля", 
                    "августа", 
                    "сентября", 
                    "октября", 
                    "ноября",
                    "декабря"]

    const dayWeek = ["понедельник",
                    "вторник",
                    "среда",
                    "четверг",
                    "пятница",
                    "суббота",
                    "воскресенье",]

    const addTraining = () => {
        document.getElementById('next-1').classList.add('next')
        axios.post('sportsman/diary/createSession', newTraining)
        document.querySelector('.training-add').classList.remove('next')
        window.location.reload()
    }

    

    return <div className="training">
        
        <header className="training-date fonts-roboto-light">
            <p>{`${dates.getDate()} ${month[dates.getMonth()]}, ${dayWeek[dates.getDay()]}`}</p>
        </header>
        <div className="training-content">
            <div id="list-competition">
            {listTraining.map(training => (
                <div className="training-active training-block fonts-roboto-light"
                     onClick={trainingContent}
                     id={training?.id}>
                    <p id={training?.id}>{training?.sessionType?.sessionTypeName} тренировка</p>
                </div>
            ))}
           </div>
            <div className="training-add training-block fonts-roboto-light"
                onClick={trainingAdd}>
                <img src={addTrainingImage} 
                className="training-add-image"
                id='training-add'/>
                <p>Добавить тренировку</p>
            </div>
            <form className="training-add-form">
                <div id='next-1' className="next">
                    <div className="container-pole name_profile training-pole">
                        <p className='fonts-roboto-regular name_profile'>Дата</p>
                        <input 
                            type='text' 
                            className='fonts-roboto-thin input_profile input_profile_edit'
                            value={dateTraining}
                            disabled
                        />
                    </div>
                    <div className="container-pole name_profile training-pole">
                        <p className='fonts-roboto-regular name_profile'>Тип тренировки</p>
                        <select className='fonts-roboto-thin input_profile input_profile_edit'
                        value={typeTraining} 
                        onChange={e => setTypeTraining(e.target.value)}
                        >
                            <option value='' disabled selected hidden>Выберите тип тренировки</option>
                            <option value='1'>Мужской</option>
                            <option value='2'>Женский</option>
                        </select>
                    </div>
                    <Button parametr={'Создать'}
                            functionClick={addTraining}
                            type={'button'}/>
                </div>
            </form>
        </div>
    </div>
}
export default TrainingDiary