import '../competition/style.css'
import { useNavigate } from 'react-router'
import axios from '../../utils/axios'


const Competition = ({competition}) => {

    const formatDate = (date) => {
        date = date.split('T')[0]
        console.log(date)
        return date
    }

    

    const navigate = useNavigate()

    const onClickCompetition = (e) => {
        let date = formatDate(competition?.date)
        console.log(date)
        console.log(competition)
        // navigate('/competition/competitionId')    
    }
    
    return(
        <>
         <div className='competition' id={competition?.date} onClick={onClickCompetition}>
            <div className='title_container'>
                <p className='title_competition fonts-roboto-black'>{competition?.name}</p>
                <p className='inf_competition fonts-roboto-regular'>{competition?.place}</p>
            </div>
            <div>
                <p className='inf_competition fonts-roboto-regular'>{competition?.category}</p>
            </div>
            <div>
                <p className='inf_competition fonts-roboto-regular sports'>{competition?.sports}</p>
            </div>
            <div>
                <p className='inf_competition fonts-roboto-regular'>{formatDate(competition?.date)}</p>
            </div>
            <div>
                <p className='inf_competition fonts-roboto-regular'>{formatDate(competition?.date)}</p>
            </div>
         </div>
        </>
    )
}

export default Competition;