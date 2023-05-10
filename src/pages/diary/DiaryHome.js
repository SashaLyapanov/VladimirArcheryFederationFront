import MenuDiary from "../../components/diary/MenuDiary"
import CalendarDiary from "../../components/diary/CalendarDiary"
import '../../components/diary/diary.css'
import '../../style.css'

const DiaryHome = () => {

    function component(id){
        if (id == 'calendar'){
            return <CalendarDiary/>
        }
    }


    return (
        <div className="diary">
            <MenuDiary />
            <CalendarDiary/>
        </div>
    )
}

export default DiaryHome