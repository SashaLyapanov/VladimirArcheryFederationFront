import {useEffect, useState} from "react";
import {formatDateLocal} from "../../utils/date-utils";

const SportsmanInfo = ({sportsman}) => {

    const [avatarState, setAvatarState] = useState();

    useEffect(() => {
        const fetchAratarImg = async () => {
            try {
                const response = await fetch('http://localhost:8081/personalAccount/download?fileName=' + sportsman?.avatarImage)
                if (response.ok) {
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    setAvatarState(objectURL);
                } else {
                    console.error('Ошибка при загрузке изображения');
                }
            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };
        fetchAratarImg();
    }, [])

    return(
        <div style={{width: '100%'}} id={sportsman?.email}>
            <div className='article-block'>
                {avatarState && <img src={avatarState} alt='Фотография спортсмена' className={'avatar_img_left'}/>}
                <div className='sportsman_info_block'>
                    <h3 style={{fontSize: '25px'}}>ФИО: </h3>
                    <p className='some_info'>{sportsman?.firstName + ' ' + sportsman?.surname + ' ' + sportsman?.patronymic}</p>
                    <h3 style={{fontSize: '25px'}}>Дата рождения: </h3>
                    <p className='some_info'>{sportsman?.birthDate && formatDateLocal(sportsman?.birthDate)}</p>
                    <h3 style={{fontSize: '25px'}}>Звание/разряд: </h3>
                    <p className='some_info'>{sportsman?.sportsTitle?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default SportsmanInfo;