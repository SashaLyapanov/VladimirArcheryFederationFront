import Button from '../button/Button'
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router'

const CompetitionId = () => {

    const {user, setUser} = useContext(CustomContext)
    const navigate = useNavigate()

    const onclick = () => {
        navigate('/registrationSports')
    }

      const onclickGroup = () => {
        navigate('/registrationGroup')
    }

    function buttonBlock(role){
        if(role == 'trainer'){
            return <Button parametr='Зарегистрировать группу' 
                            functionClick={onclickGroup}/>
                        
        }
    }

    return (
        <div className='competitions'>
            <div className='container margin-competition'>
                <p className="fonts-roboto-black name-competition">Название соревнования</p>
                <p className="inf-competition fonts-roboto-light">Дата:</p>
                <p className="inf-competition fonts-roboto-light">Тип лука:</p>
                <p className="inf-competition fonts-roboto-light">Категория:</p>
                <p className="content-competition fonts-roboto-light">Описание</p>
                <div className='button_flex'>
                <Button parametr='Зарегистрироваться' 
                        functionClick={onclick}/>
                {buttonBlock(user.role)}
                </div>
            </div>

            
        </div>

    )
}

export default CompetitionId