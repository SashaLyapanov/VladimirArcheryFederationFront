import Button from '../button/Button'
import photo from '../../img/photo.png'

const PhotoProfile = () => {

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
                <img src={photo}/>
            </div>
            <Button parametr={'Редактировать профиль'} id={'button-edit'} functionClick={onClick}/>
        </div>
    )
}

export default PhotoProfile