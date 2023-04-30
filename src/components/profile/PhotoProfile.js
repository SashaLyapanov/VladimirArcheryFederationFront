import Button from '../button/Button'
import photo from '../../img/photo.png'

const PhotoProfile = () => {
    return(
        <div>
            <div className="photo">
                <img src={photo}/>
            </div>
            <Button parametr={'Редактировать профиль'}/>
        </div>
    )
}

export default PhotoProfile