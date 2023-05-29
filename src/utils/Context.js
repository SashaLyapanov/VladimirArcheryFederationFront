import { createContext, useEffect, useState } from "react";

export const CustomContext = createContext()
export const SportContext = createContext()
export const CompetitionContext = createContext()

export const Context = (props) => {


    
    const [user, setUser] = useState({
        email: ''
    })
    
    useEffect(() => {
        if (localStorage.getItem('user') !== null){
        setUser(JSON.parse(localStorage.getItem('user')))
        }
        if(localStorage.getItem('date') != null){
            
        }
    }, [])


    const value = {
        user,
        setUser
    }


    const [sport, setSports] = useState()
    const sportsValue = {
        sport,
        setSports
    }


    const [competitions, setCompetition] = useState()
    const competitionValue = {
        competitions,
        setCompetition
    }


    return  <CompetitionContext.Provider value={competitionValue}>
            <SportContext.Provider value={sportsValue}>
            <CustomContext.Provider value={value}>
                {props.children}
            </CustomContext.Provider>
            </SportContext.Provider>
            </CompetitionContext.Provider>
        
}