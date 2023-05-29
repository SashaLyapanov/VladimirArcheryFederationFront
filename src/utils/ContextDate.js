import { createContext, useEffect, useState } from "react";

export const DatesContext = createContext()

export const ContextDate = (props) => {

    const [dates, setDates] = useState(new Date())

    // useEffect(() => {
    //     setDates(new Date())
    // }, [])

    const datesValue = {
        dates,
        setDates
    }

    return  <DatesContext.Provider value={datesValue}>
                {props.children}
            </DatesContext.Provider>
        
}