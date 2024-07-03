import { createContext, useState } from "react";

export const DatesContext = createContext()
export const TrainingContext = createContext()

export const ContextDate = (props) => {

    const [dates, setDates] = useState(new Date())

    const datesValue = {
        dates,
        setDates
    }

    const [training, setTraining] = useState(new Date())

    const trainingValue = {
        training,
        setTraining
    }

    return  <TrainingContext.Provider value={trainingValue}>
            <DatesContext.Provider value={datesValue}>
                {props.children}
            </DatesContext.Provider>
            </TrainingContext.Provider>
        
}