import Button from '../button/Button'
import photo from '../../img/photo.png'
import {useEffect, useState} from 'react'
import UploadImg from "../modalWindows/UploadImg";

const PhotoProfile = ({sportsman, btnStatus}) => {

    const [avatarImg, setAvatarImg] = useState(null);
    const [modalWindowForUploadImg, setModalWindowForUploadImg] = useState(false);

    useEffect(() => {
        const fetchAratarImg = async () => {
            if (sportsman) {
                try {
                    const response = await fetch(`http://localhost:8081/personalAccount/download?fileName=${sportsman.avatarImage}`)
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
            }
        };
        fetchAratarImg();
    }, [sportsman])

    function buttonStatus(status) {
        if (status !== 'none') {
            return <div>
                <div>
                    <Button parametr={'Редактировать профиль'}
                            id={'button-edit'}
                            functionClick={onClick}/>
                </div>
                <div className='button-block'>
                    <Button parametr={'Изменить аватарку'}
                            id={'button-edit-img'}
                            functionClick={onClickEditImg}/>
                </div>
            </div>
        }
    }

    const onClick = () => {
        document.getElementById('button-save').classList.remove('button-display')
        document.getElementById('button-save').classList.add('button')
        document.getElementById('button-edit').classList.add('button-display')
        document.getElementById('button-edit-img').classList.add('button-display')
        const inputs = document.getElementsByClassName('input_profile')
        for (var input of inputs) {
            input.classList.add('input_profile_edit')
            input.removeAttribute('disabled');
        }
    }

    const onClickEditImg = () => {
        setModalWindowForUploadImg(true);
    }

    return (
        <div>
            <div className="photo">
                {avatarImg ? <img src={avatarImg} alt='Аватарка' className={'avatar_img'}/> :
                    <img src={photo} alt='Аватарка'/>}

            </div>
            {buttonStatus(btnStatus)}

            {modalWindowForUploadImg && <div>
                <UploadImg closeModal={setModalWindowForUploadImg} userId={sportsman?.id}/>
            </div>}
        </div>
    )
}

export default PhotoProfile