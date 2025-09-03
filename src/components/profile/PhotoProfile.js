import Button from '../button/Button'
import photo from '../../img/photo.png'
import {useContext, useEffect, useState} from 'react'
import UploadImg from "../modalWindows/UploadImg";
import {CustomContext} from "../../utils/Context";
import axios from "../../utils/axios";

const PhotoProfile = ({sportsmanProps, btnStatus}) => {

    const {user} = useContext(CustomContext);
    const [avatarImg, setAvatarImg] = useState(null);
    const [modalWindowForUploadImg, setModalWindowForUploadImg] = useState(false);

    const [sportsman, setSportsman] = useState(sportsmanProps);

    useEffect(() => {
        if (sportsmanProps) {
            setSportsman(sportsmanProps);
        }
    }, [sportsmanProps]);

    useEffect(() => {
        const fetchAratarImg = async () => {
            if (sportsman) {
                console.log(sportsman);
                try {
                    const response = await fetch(`http://localhost:8081/personalAccount/download?fileName=${sportsman?.avatarImage}`)
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
        if (user?.userData?.role === "SPORTSMAN") {
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
        } else if (user?.userData?.role === "ADMIN") {
            if (sportsman) {
                if (sportsman.isRegionalTeamSportsman === false) {
                    return <div>
                        <div>
                            <Button parametr={'Добавить спортсмена в сборную области'}
                                    id={'button-add-in-team'}
                                    functionClick={onClickAddInTeam}/>
                        </div>
                    </div>
                } else {
                    return <div>
                        <div>
                            <Button parametr={'Удалить спортсмена из сборной области'}
                                    id={'button-add-in-team'}
                                    functionClick={onClickDeleteFromTeam}/>
                        </div>
                    </div>
                }
            }
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

    const onClickAddInTeam = async () => {
        try {
            const response = await axios.put(`admin/addInRegionalTeam?id=${sportsman?.id}`, {},
                {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user?.accessToken}});
            if (response.status === 200) {
                const result = response.data;
                setSportsman(result);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error("Network error: ", error);
        }
    }

    const onClickDeleteFromTeam = async () => {
        try {
            const response = await axios.put(`admin/deleteFromRegionalTeam?id=${sportsman?.id}`, {},
                {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user?.accessToken}});
            if (response.status === 200) {
                const result = response.data;
                setSportsman(result);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error("Network error: ", error);
        }
    }

    return (
        <div>
            <div className="photo">
                {avatarImg ? <img src={avatarImg} alt='Аватарка' className={'avatar_img'}/> :
                    <img src={photo} alt='Аватарка'/>}

            </div>
            {user && buttonStatus(btnStatus)}

            {modalWindowForUploadImg && <div>
                <UploadImg closeModal={setModalWindowForUploadImg} userId={sportsman?.id}/>
            </div>}
        </div>
    )
}

export default PhotoProfile