import Button from "../button/Button"
import '../profile/profile.css'
import React, {useState, useEffect} from 'react';
import axios from "../../utils/axios";
import { useNavigate } from "react-router";

const AddSports = () => {

    const [sportsTitle, setSportsTitles] = useState([])
    const [regions, setRegions] = useState([])
    
   

    // axios.get('general/allSportsTitle')
    // .then(({data}) => console.log(data))

    // axios.get('general/allRegions')
    // .then((res) => console.log(res))

    useEffect(() => {
        axios.get('general/allSportsTitle')
        .then(({data}) => setSportsTitles(data))
        axios.get('general/allRegions')
        .then(({data}) => setRegions(data))
        }, []);

    const navigate = useNavigate()

    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [Patronymic, setPatronymic] = useState('')
    const [BirthDate, setBirthDate] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Region, setRegion] = useState('')
    const [Sex, setSex] = useState('')
    const [SportsTitle, setSportsTitle] = useState('')

    const newSportsman = {
        'email': Email,
        'password': Password,
        'region': {
            'id': Region
        },
        'sex': {
            'id': Sex
        },
        'firstName': Name,
        'surname': Surname,
        'patronymic': Patronymic,
        'sportsTitle': {
            'id': SportsTitle
        },
        'birthDate': BirthDate,
        
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
                <p className='fonts-roboto-regular name_profile'>Регион</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={Region} 
                onChange={e => setRegion(e.target.value)}
                >
                        <option value='' disabled selected hidden>Выберите регион</option>
                        {regions.map(region => (
                            <option value={region?.id}>{region?.name}</option>
                        ))}
                    </select>
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Пол</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={Sex} 
                onChange={e => setSex(e.target.value)}
                >
                        <option value='' disabled selected hidden>Выберите пол</option>
                        <option value='1'>Мужской</option>
                        <option value='2'>Женский</option>
                    </select>
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Спортивный разряд</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={SportsTitle} 
                onChange={e => setSportsTitle(e.target.value)}
                >
                    <option value='' disabled selected hidden>Выберите спортивный разряд</option>
                    {sportsTitle.map(title => (
                            <option value={title?.id}>{title?.name}</option>
                        ))}
                </select>
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