import { useContext, useState, useEffect } from 'react'
import { TrainingContext } from "../../utils/ContextDate"
import axios from '../../utils/axios'

const Training = () => {

    const {training, setTraining} = useContext(TrainingContext)
    const [exersises, setExercises] = useState([])

    // useEffect(() => {
    //     axios.get(`sportsman/diary/getSessionExercises?id=${training?.id}`)
    //     .then((data) => setExercises(data))
    // },[training])


    return <div>
        <div id="list-competition">
            {exersises.map(exercise => (
                <div className="training-active training-block fonts-roboto-light"
                    //  onClick={trainingContent}
                     id={exercise?.id}>
                    <p id={exercise?.id}>Упражнение</p>
                </div>
            ))}
           </div>
    </div>
    
}

export default Training