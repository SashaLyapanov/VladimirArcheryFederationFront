import Button from "../button/Button"
import '../profile/profile.css'
import React, {useState} from 'react';
import axios from "../../utils/axios";
import { useNavigate } from "react-router";

const AddSports = () => {

    const navigate = useNavigate()

    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [Patronymic, setPatronymic] = useState('')
    const [BirthDate, setBirthDate] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const newSportsman = {
        'email': Email,
        'password': Password,
        'firstName': Name,
        'surname': Surname,
        'patronymic': Patronymic,
        'birthDate': BirthDate
    }

    

    const onClick = () => {
        console.log(newSportsman)
        axios.post('admin/createSportsman', newSportsman)
        .then(() => 
        navigate('/sports'))
    }

    return(
        <form className="container">
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Имя</p>
                <input 
                    type='text' 
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите имя"
                    value={Name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Фамилия</p>
                <input 
                    type='text' 
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите фамилию"
                    value={Surname}
                    onChange={e => setSurname(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Отчество</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите отчество"
                    value={Patronymic}
                    onChange={e => setPatronymic(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Дата рождения</p>
                <input
                    type='date'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Выберите дату"
                    value={BirthDate}
                    onChange={e => setBirthDate(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Email</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите email"
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Пароль</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите пароль"
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            
            <Button parametr={'Добавить'} 
                    functionClick={onClick}
                    type={'button'}
                    />
            
        </form>
    )
}

export default AddSports