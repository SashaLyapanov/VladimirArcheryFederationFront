import Button from '../button/Button'
import photo from '../../img/photo.png'
import {useContext, useEffect, useState} from 'react'
import { CustomContext } from '../../utils/Context'

const PhotoProfile = ({btnStatus}) => {

    const {user, setUser} = useContext(CustomContext);
    const [avatarImg, setAvatarImg] = useState(null);

    user && console.log(user)

    useEffect(() => {
        const fetchAratarImg = async () => {
            try {
                const response = await fetch(`http://localhost:8081/personalAccount/download?fileName=${user?.id}_Аватарка.png`)
                if (response.ok) {
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    setAvatarImg(objectURL);
                } else {
                    console.error('Ошибка при загрузке изображения');
                }
            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };
        fetchAratarImg();
    }, [])

    function buttonStatus(status){
        if(status !== 'none'){
            return <Button parametr={'Редактировать профиль'}
                            id={'button-edit'}
                            functionClick={onClick}/>
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

    return(
        <div>
            <div className="photo">
                {avatarImg ? <img src={avatarImg} alt='Аватарка' className={'avatar_img'}/> : <img src={photo} alt='Аватарка'/>}

            </div>
            {buttonStatus(btnStatus)}
            
        </div>
    )
}

export default PhotoProfile