import Button from "../button/Button"
import axios from '../../utils/axios'
import React, {useEffect, useState} from 'react';

const DataProfile = ({sportsman}) => {

    const [sportsTitles, setSportsTitles] = useState([])
    const [regions, setRegions] = useState([])
    const [sexes, setSexes] = useState([])

    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [Patronymic, setPatronymic] = useState('')
    const [BirthDate, setBirthDate] = useState('')
    const [Email, setEmail] = useState('')
    const [Region, setRegion] = useState('')
    const [Sex, setSex] = useState([])
    const [SportsTitle, setSportsTitle] = useState('')

    const formatDate = (date) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // добавляем нули в начало, если месяц < 10
        const day = String(dateObject.getDate()).padStart(2, '0'); // добавляем нули в начало, если день < 10
        return `${year}-${month}-${day}`;
    }
    useEffect(() => {
        axios.get('general/allSportsTitle')
            .then(({data}) => setSportsTitles(data))
        axios.get('general/allRegions')
            .then(({data}) => setRegions(data))
        axios.get('general/allSex')
            .then(({data}) => setSexes(data))
    }, []);

    useEffect(() => {
        setName(sportsman?.firstName)
        setSurname(sportsman?.surname)
        setPatronymic(sportsman?.patronymic)
        setBirthDate(formatDate(sportsman?.birthDate))
        setEmail(sportsman?.email)
        setRegion(sportsman?.region?.id)
        setSex(sportsman?.sex?.id)
        setSportsTitle(sportsman?.sportsTitle?.id)
    }, [sportsman]);

    const newSportsman = {
        'email': Email,
        'region': {
            'id': Region
        },
        'sex': {
            'id': Sex
        },
        'sportsTitle': {
            'id': SportsTitle
        },
        'firstName': Name,
        'surname': Surname,
        'patronymic': Patronymic,
        'birthDate': BirthDate
    }

    const onClick = () => {
        document.getElementById('button-edit').classList.remove('button-display')
        document.getElementById('button-edit-img').classList.remove('button-display')
        document.getElementById('button-save').classList.add('button-display')
        const inputs = document.getElementsByClassName('input_profile')
        for (var input of inputs) {
            input.classList.remove('input_profile_edit')
            input.setAttribute('disabled', 'disabled');
        }
        axios.put(`personalAccount/editProfile?sportsmanId=${sportsman?.id}`, newSportsman);
    }
    return (
        <div className="data-profile">
            <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Фамилия</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile'
                    value={Surname}
                    onChange={e => setSurname(e.target.value)}
                    disabled
                />
            </div>
            <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Имя</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile'
                    value={Name}
                    onChange={e => setName(e.target.value)}
                    disabled
                />
            </div>
            <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Отчество</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile'
                    value={Patronymic}
                    onChange={e => setPatronymic(e.target.value)}
                    disabled
                />
            </div>
            <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Дата рождения</p>
                <input
                    type='date'
                    className='fonts-roboto-thin input_profile'
                    value={BirthDate}
                    onChange={e => setBirthDate(e.target.value)}
                    disabled
                />
            </div>
            <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Спортивный разряд</p>
                <select
                    id='birthDate'
                    name='birthDate'
                    className='fonts-roboto-thin input_profile'
                    value={newSportsman.sportsTitle.id}
                    onChange={e => setSportsTitle(e.target.value)}
                    disabled
                >
                    <option value=''>Выберите спортивный разряд</option>
                    {sportsTitles?.map(item => (
                        <option key={item.id} value={item.id}>{item?.name}</option>
                    ))}
                </select>
            </div>
            <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Пол</p>
                <select
                    id='sex'
                    name='sex'
                    className='fonts-roboto-thin input_profile'
                    value={newSportsman.sex.id}
                    onChange={e => setSex(e.target.value)}
                    disabled
                >
                    <option value=''>Выберите ваш пол</option>
                    {sexes?.map(item => (
                        <option key={item.id} value={item.id}>{item?.name}</option>
                    ))}
                </select>
            </div>
            <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Регион</p>
                <select
                    id='region'
                    name='region'
                    className='fonts-roboto-thin input_profile'
                    value={newSportsman.region.id}
                    onChange={e => setRegion(e.target.value)}
                    disabled
                >
                    <option value=''>Выберите регион</option>
                    {regions?.map(item => (
                        <option key={item.id} value={item.id}>{item?.name}</option>
                    ))}
                </select>
            </div>

            <Button id={'button-save'}
                    parametr={'Сохранить'}
                    className={'button-display'}
                    functionClick={onClick}/>

        </div>
    )
}

export default DataProfile
