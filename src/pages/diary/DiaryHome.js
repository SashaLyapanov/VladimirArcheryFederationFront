import MenuDiary from "../../components/diary/MenuDiary"
import Diary from "../../components/diary/Diary"
import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import '../../components/diary/diary.css'
import '../../style.css'
import { useContext, useState } from 'react'
import { CustomContext } from "../../utils/Context"

const DiaryHome = ({sport}) => {

    const {user, setUser} = useContext(CustomContext)

    function component(id){
        if (id == 'calendar'){
            return <Diary/>
        }
    }

    function userDiary(role){
        if(role == "SPORTSMAN"){
            return <NamePage name={`Дневник спортсмена`}/>
        } else {
            <NamePage name={`Дневник спортсмена: ${sport?.surname} ${sport?.firstName}`}/>
        }
    }


    return (
        <>
            <Navbar/>
            {userDiary(user?.role)}
            <Diary/>
            </>
    )
}

export default DiaryHome