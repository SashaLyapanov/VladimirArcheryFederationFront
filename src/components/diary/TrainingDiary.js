import addTraining from "../../img/add.png"
import { useNavigate } from "react-router"
import {useState} from 'react'
import { useContext} from 'react'
import { DatesContext } from '../../utils/ContextDate'

const TrainingDiary = () => {

    const navigate = useNavigate()
    const {dates, setDates} = useContext(DatesContext)
    console.log(dates)

    const trainingContent = () => {
        navigate('/training')
    }

    const trainingAdd = () => {
        navigate('/trainingAdd')
    }


    return <div className="training">
        <header className="training-date fonts-roboto-light">
            <p>{dates.getDate()}</p>
        </header>
        <div className="training-content">
            <div className="training-active training-block fonts-roboto-light"
                    onClick={trainingContent}>
                <p>Тренировка 1</p>
            </div>
            <div className="training-add training-block fonts-roboto-light"
                onClick={trainingAdd}>
                <img src={addTraining} className="training-add-image"/>
                <p>Добавить тренировку</p>
            </div>
        </div>
    </div>
}
export default TrainingDiary