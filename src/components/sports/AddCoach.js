import Button from "../button/Button"
import '../profile/profile.css'
import React, {useState} from 'react';
import axios from "../../utils/axios";
import { useNavigate } from "react-router";

const AddCoach = () => {

    const navigate = useNavigate()

    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [Patronymic, setPatronymic] = useState('')
    const [BirthDate, setBirthDate] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Qualification, setQualification] = useState('')
    const [Team, setTeam] = useState('')
    const [BowTypeList, setBowTypeList] = useState('')

    const newCoach = {
        'email': Email,
        'password': Password,
        'firstName': Name,
        'surname': Surname,
        'patronymic': Patronymic,
        'birthDate': BirthDate,
        'qualification': {
            'id': Qualification
        },
        'team': {
            'id': Team
        },
        'bowTypeList':[
            {'id': BowTypeList}
        ] 
    }

    

    const onClick = () => {
        console.log(newCoach)
        axios.post('admin/createCoach', newCoach)
        .then(() => 
        navigate('/coaches'))
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
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Квалификация</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={Qualification} 
                onChange={e => setQualification(e.target.value)}
                >
                        <option value='' disabled selected hidden>Выберите квалификацию</option>
                        <option value='1'>Начинающий</option>
                        <option value='2'>Профессионал</option>
                        <option value='3'>Мастер</option>
                    </select>
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Команда</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={Team} 
                onChange={e => setTeam(e.target.value)}
                >
                        <option value='' disabled selected hidden>Выберите команду</option>
                        <option value='1'>Команда 1</option>
                        <option value='2'>Команда 2</option>
                        <option value='3'>Команда 3</option>
                    </select>
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Типы луков</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={BowTypeList} 
                onChange={e => setBowTypeList(e.target.value)}
                >
                        <option value='' disabled selected hidden>Выберите типы луков</option>
                        <option value='1'>Длинный лук</option>
                        <option value='2'>Блочный лук</option>
                        <option value='3'>Монгольский лук</option>
                        <option value='4'>Составной лук</option>
                    </select>
            </div>
            
            <Button parametr={'Добавить'} 
                    functionClick={onClick}
                    type={'button'}
                    />
            
        </form>
    )
}

export default AddCoach