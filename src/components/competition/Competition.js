import '../competition/style.css'
import { useNavigate } from 'react-router'
import axios from '../../utils/axios'
import { useContext } from 'react'
import { CompetitionContext } from '../../utils/Context'


const Competition = ({competition}) => {

    const {competitions, setCompetition} = useContext(CompetitionContext)

    const formatDate = (date) => {
        date = date.split('T')[0]
        return date
    }

    

    const navigate = useNavigate()

    const onClickCompetition = (e) => {
        navigate('/competition/competitionId')
        // console.log(competition)
        setCompetition(competition)   
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