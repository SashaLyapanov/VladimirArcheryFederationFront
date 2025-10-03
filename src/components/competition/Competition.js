import '../competition/style.css'
import {useNavigate} from 'react-router'
import {formatDateLocal} from "../../utils/date-utils";

const Competition = ({competition}) => {

    const navigate = useNavigate()

    const onClickCompetition = (competition) => {
        navigate(`/competition/${competition?.id}`)
    }
    return (
        <>
            <div className='competition' id={competition?.date} onClick={() => onClickCompetition(competition)}>
                <div className='title_container'>
                    <p className='title_competition fonts-roboto-regular'>{competition?.name}</p>
                </div>
                <div className='info_container'>
                    <div className='inf_competition'>
                        <p className='inf_competition_subtitle fonts-roboto-regular'>{"Место проведения: "}</p>
                        <p className='inf_competition_text fonts-roboto-regular'>{competition?.place}</p>
                    </div>
                    <div className='inf_competition'>
                        <p className='inf_competition_subtitle fonts-roboto-regular'>{"Спортивная дисциплина:"}</p>
                        <p className='inf_competition_text fonts-roboto-regular'>{competition?.type.name}</p>
                    </div>
                    <div className='inf_competition'>
                        <p className='inf_competition_subtitle fonts-roboto-regular'>{"Даты проведения:"}</p>
                        <p className='inf_competition_text fonts-roboto-regular'>{formatDateLocal(competition?.date)} - {formatDateLocal(competition?.endDate)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Competition;