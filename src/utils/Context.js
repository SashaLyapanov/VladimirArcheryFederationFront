import {createContext, useEffect, useState} from "react";

export const CustomContext = createContext()
export const SportContext = createContext()
export const CompetitionContext = createContext()

export const Context = (props) => {

    const [user, setUser] = useState({
        email: ''
    })

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

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        if (localStorage.getItem('sport') != null) {
            setSports(JSON.parse(localStorage.getItem('sport')))
        }
        if (localStorage.getItem('competitions') != null) {
            setCompetition(JSON.parse(localStorage.getItem('competitions')))
        }
    }, [])

    const value = {
        user,
        setUser
    }

    return <CompetitionContext.Provider value={competitionValue}>
        <SportContext.Provider value={sportsValue}>
            <CustomContext.Provider value={value}>
                {props.children}
            </CustomContext.Provider>
        </SportContext.Provider>
    </CompetitionContext.Provider>

}