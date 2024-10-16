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
                    <p className='title_competition fonts-roboto-black'>{competition?.name}</p>
                    <p className='inf_competition fonts-roboto-regular'>{competition?.place}</p>
                </div>
                <div>
                    <p className='inf_competition fonts-roboto-regular'>{"Категориия соревнований:"} <br/> {competition?.type.name}</p>
                </div>
                <div>
                    <p className='inf_competition fonts-roboto-regular'>{"Дата начала:"} <br/> {formatDateLocal(competition?.date)}</p>
                </div>
                <div>
                    <p className='inf_competition fonts-roboto-regular'>{"Дата окончания:"} <br/> {formatDateLocal(competition?.endDate)}</p>
                </div>
            </div>
        </>
    )
}

export default Competition;