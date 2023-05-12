import CalendarDiary from "./CalendarDiary"
import TrainingDiary from "./TrainingDiary"

const Diary = () => {
    return (
        <div className="diary">
            <CalendarDiary/>
            <TrainingDiary/>
        </div>
    )
}

export default Diary