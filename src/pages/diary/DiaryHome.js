import MenuDiary from "../../components/diary/MenuDiary"
import Diary from "../../components/diary/Diary"
import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import '../../components/diary/diary.css'
import '../../style.css'

const DiaryHome = () => {

    function component(id){
        if (id == 'calendar'){
            return <Diary/>
        }
    }


    return (
        <>
            <Navbar/>
            <NamePage name={'Дневник спортсмена'}/>
            <Diary/>
            </>
    )
}

export default DiaryHome