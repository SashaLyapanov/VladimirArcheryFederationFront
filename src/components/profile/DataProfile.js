import Button from "../button/Button"
import axios from '../../utils/axios'
import React, {useState, useEffect} from 'react';

const DataProfile = ({user}) => {

    console.log(user)

    const [sportsTitle, setSportsTitles] = useState([])
    const [regions, setRegions] = useState([])
    const [teams, setTeams] = useState([])

    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [Patronymic, setPatronymic] = useState('')
    const [BirthDate, setBirthDate] = useState('')
    const [Email, setEmail] = useState('')
    // const [Password, setPassword] = useState(user?.firstName)
    const [Region, setRegion] = useState('')
    const [Sex, setSex] = useState('')
    const [SportsTitle, setSportsTitle] = useState('')
    const [Team, setTeam] = useState('')

    const formatDate = (date) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // добавляем нули в начало, если месяц < 10
        const day = String(dateObject.getDate()).padStart(2, '0'); // добавляем нули в начало, если день < 10
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    useEffect(() => {
        axios.get('general/allSportsTitle')
            .then(({data}) => setSportsTitles(data))
        axios.get('general/allRegions')
            .then(({data}) => setRegions(data))
        axios.get('general/allTeams')
            .then(({data}) => setTeams(data))
    }, []);

    useEffect(() => {
        setName(user?.name)
        setSurname(user?.surname)
        setPatronymic(user?.patronymic)

        setBirthDate(formatDate(user?.birthDate))

        setEmail(user?.email)
        setRegion(user?.region?.id)
        setSex(user?.sex?.id)
        setSportsTitle(user?.sportsTitle?.id)
        setTeam(user?.team?.id)
    }, [user])


    const newSportsman = {
        'email': Email,
        // 'password': Password,
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
        'team': {
            'id': Team
        }

    }

    const onClick = () => {
        document.getElementById('button-edit').classList.remove('button-display')
        document.getElementById('button-save').classList.add('button-display')
        const inputs = document.getElementsByClassName('input_profile')
        for (var input of inputs) {
            input.classList.remove('input_profile_edit')
            input.setAttribute('disabled', 'disabled');
        }
        // console.log(newSportsman)
        axios.put(
            `admin/editSportsman?email=${user?.email}`,
            newSportsman)

    }
    return (
        <div className="data-profile">
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
            {/*<div className="container-pole name_profile">*/}
            {/*    <p className='fonts-roboto-regular name_profile'>Регион</p>*/}
            {/*    <select className='fonts-roboto-thin input_profile input_profile_edit'*/}
            {/*            value={Region}*/}
            {/*            onChange={e => setRegion(e.target.value)}*/}
            {/*            disabled*/}
            {/*    >*/}
            {/*        <option value='' disabled selected hidden>{user?.region?.name}</option>*/}
            {/*        {regions.map(region => (*/}
            {/*            <option value={region?.id}>{region?.name}</option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}
            {/*<div className="container-pole name_profile">*/}
            {/*    <p className='fonts-roboto-regular name_profile'>Пол</p>*/}
            {/*    <select className='fonts-roboto-thin input_profile input_profile_edit'*/}
            {/*            value={Sex}*/}
            {/*            onChange={e => setSex(e.target.value)}*/}
            {/*            disabled*/}
            {/*    >*/}
            {/*        <option value='' disabled selected hidden>{user?.sex?.name}</option>*/}
            {/*        <option value='1'>Мужской</option>*/}
            {/*        <option value='2'>Женский</option>*/}
            {/*    </select>*/}
            {/*</div>*/}
            {/*<div className="container-pole name_profile">*/}
            {/*    <p className='fonts-roboto-regular name_profile'>Спортивный разряд</p>*/}
            {/*    <select className='fonts-roboto-thin input_profile input_profile_edit'*/}
            {/*            value={SportsTitle}*/}
            {/*            onChange={e => setSportsTitle(e.target.value)}*/}
            {/*            disabled*/}
            {/*    >*/}
            {/*        <option value='' disabled selected hidden>{user?.sportsTitle?.name}</option>*/}
            {/*        {sportsTitle.map(title => (*/}
            {/*            <option value={title?.id}>{title?.name}</option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}
            {/*<div className="container-pole name_profile">*/}
            {/*    <p className='fonts-roboto-regular name_profile'>Команда</p>*/}
            {/*    <select className='fonts-roboto-thin input_profile input_profile_edit'*/}
            {/*            value={Team}*/}
            {/*            onChange={e => setTeam(e.target.value)}*/}
            {/*            disabled*/}
            {/*    >*/}
            {/*        <option value='' disabled selected hidden>{user?.team?.name}</option>*/}
            {/*        {teams.map(title => (*/}
            {/*            <option value={title?.id}>{title?.name}</option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}
            <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Email</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile'
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                    disabled
                />
            </div>
            {/* <div className="container-pole name_profile">
                <p className='fonts-roboto-regular name_profile'>Пароль</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    value={user?.firstName}
                    onChange={e => setPassword(e.target.value)}
                    disabled
                />
            </div> */}

            <Button id={'button-save'}
                    parametr={'Сохранить'}
                    className={'button-display'}
                    functionClick={onClick}/>

        </div>
    )
}

export default DataProfile

{/* <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Имя</p>
                <input 
                    type='text' 
                    value={user?.firstName}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Отчество</p>
                <input 
                    type='text' 
                   value={user?.patronymic}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Фамилия</p>
                <input
                    type='text'
                    value={user?.surname}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Дата рождения</p>
                <input 
                    type='text' 
                    value={user?.birthDate}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Email</p>
                <input 
                    type='text' 
                    value={user?.email}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Тренер</p>
                <input
                    type='text'
                    value={user?.personal_coach?.surname + " " + user?.personal_coach?.firstName + " " + user?.personal_coach?.patronymic}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div> */
}