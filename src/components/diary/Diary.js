import CalendarDiary from "./CalendarDiary"
import TrainingDiary from "./TrainingDiary"

const Diary = () => {
    return (
        <div className="container">
            <p></p>
            <div className="diary">
                <CalendarDiary/>
                <TrainingDiary/>
            </div>
        </div>
    )
}

export default Diary