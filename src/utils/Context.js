import { createContext, useEffect, useState } from "react";

export const CustomContext = createContext()
export const SportContext = createContext()

export const Context = (props) => {


    
    const [user, setUser] = useState({
        email: ''
    })
    
    useEffect(() => {
        if (localStorage.getItem('user') !== null){
        setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])


    const value = {
        user,
        setUser
    }


    const [sports, setSports] = useState()

    const sportsValue = {
        sports,
        setSports
    }

    return <SportContext.Provider value={sportsValue}>
            <CustomContext.Provider value={value}>
                {props.children}
            </CustomContext.Provider>
            </SportContext.Provider>
}