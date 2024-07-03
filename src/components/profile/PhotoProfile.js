import Button from '../button/Button'
import photo from '../../img/photo.png'
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router'

const PhotoProfile = ({btnStatus}) => {

    const navigate = useNavigate()

    const onClickBlock = (e) => {
        
        if(document.getElementById('button-block').innerHTML == 'Заблокировать'){
            document.getElementById('button-block').innerHTML = 'Разблокировать'
        } else {
            document.getElementById('button-block').innerHTML = 'Заблокировать'
        }
    }

    const {user, setUser} = useContext(CustomContext)

    function buttonStatus(status){
        if(status != 'none'){
            return <Button parametr={'Редактировать профиль'}
                            id={'button-edit'}
                            functionClick={onClick}/>
        } else {
            return <Button parametr={'Дневник спортсмена'}
                            id={'button-edit'}
                            functionClick={onClickDiary}/>
        }
    }

    function buttonBlock(role){
        if(role == 'ADMIN'){
            return <div className='button-block'>
                        <Button id={'button-block'}
                                parametr={'Заблокировать'} 
                                className={''}
                                functionClick={onClickBlock}/>
                        </div>
        }
    }

    const onClick = () => {
        document.getElementById('button-save').classList.remove('button-display')
        document.getElementById('button-save').classList.add('button')
        document.getElementById('button-edit').classList.add('button-display')
        const inputs = document.getElementsByClassName('input_profile')
        for (var input of inputs) {
            input.classList.add('input_profile_edit')
            input.removeAttribute('disabled');
        }
        
    }

    const onClickDiary = () => {
        navigate('/diaryCoach')
    }



    return(
        <div>
            <div className="photo">
                <img src={photo}/>
            </div>
            {buttonStatus(btnStatus)}
            {buttonBlock(user.role)}
            
        </div>
    )
}

export default PhotoProfile