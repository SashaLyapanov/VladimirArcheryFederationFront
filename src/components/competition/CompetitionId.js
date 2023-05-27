import Button from '../button/Button'
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router'
import { CompetitionContext } from '../../utils/Context'

const CompetitionId = () => {

    const {user, setUser} = useContext(CustomContext)
    const navigate = useNavigate()
    const {competitions, setCompetition} = useContext(CompetitionContext)
    console.log(competitions)

    const formatDate = (date) => {
        date = date.split('T')[0]
        return date
    }

    function registrationGroup(role){
        if(role == "COACH"){
            return <Button parametr='Зарегистрироваться' 
            functionClick={onclick}
            id='group'/>
        }
    }

    const onclick = (e) => {
        if(!user.role){
            navigate('/login')  
        } 
        else if (e.target.id == 'group'){
            navigate('/registrationGroup')
        }  else {
            navigate('/registrationSports')
        } 
    }


    return (
        <div className='competitions'>
            <div className='container margin-competition'>
                <p className="fonts-roboto-black name-competition">{competitions?.name}</p>
                <p className="content-competition fonts-roboto-light">{formatDate(competitions?.date)} - {formatDate(competitions?.date)}</p>
                <p className="content-competition fonts-roboto-light">{competitions?.place}</p>
                <p className="content-competition fonts-roboto-light">Тип лука: {competitions?.type?.name}</p>
                <p className="content-competition fonts-roboto-light">Категория:</p>
                <p className="content-competition fonts-roboto-light">Описание</p>
                <div className='button_flex'>
                <Button parametr='Зарегистрироваться' 
                        functionClick={onclick}
                        id='user'/>
                {registrationGroup(user.role)}
                </div>
            </div>    
        </div>

    )
}

export default CompetitionId