import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'

const InformationUser = () => {
    const nameInput = [
        {
            name: 'Название',
            placeholder: 'Введите название',
            type: 'text'
        },
        {
            name: 'Фамилия',
            placeholder: 'Введите название',
            type: 'text'
        },
        {
            name: 'Отчество',
            placeholder: 'Введите название',
            type: 'text'
        },
        {
            name: 'Email',
            placeholder: 'Выберите дату',
            type: 'date'
        },
        {
            name: 'Награды',
            placeholder: 'Введите название',
            type: 'text'
        }
    ]
    return(
        <div className="container information-user">
            <PhotoProfile/>
            <DataProfile parametr={nameInput}/>
        </div>
    )
}

export default InformationUser