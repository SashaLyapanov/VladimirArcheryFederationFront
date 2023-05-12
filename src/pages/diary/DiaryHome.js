import MenuDiary from "../../components/diary/MenuDiary"
import Diary from "../../components/diary/Diary"
import '../../components/diary/diary.css'
import '../../style.css'

const DiaryHome = () => {

    function component(id){
        if (id == 'calendar'){
            return <Diary/>
        }
    }


    return (
        <div className="diary">
            <MenuDiary />
            <Diary/>
        </div>
    )
}

export default DiaryHome