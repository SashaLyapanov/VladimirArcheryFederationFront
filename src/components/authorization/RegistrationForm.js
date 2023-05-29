import './authorization.css'
import '../../fonts/roboto/fonts.css'
import Button from '../button/Button'
import axios from '../../utils/axios'
import { useContext, useState, useEffect } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router'

const RegistrationForm = () => {

    const {user, setUser} = useContext(CustomContext)
    const [sportsTitle, setSportsTitles] = useState([])
    const [regions, setRegions] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        axios.get('general/allSportsTitle')
        .then(({data}) => setSportsTitles(data))
        axios.get('general/allRegions')
        .then(({data}) => setRegions(data))
        }, []);

    const registerUser = (e) => {
        e.preventDefault()
        console.log(e.target[3].value)
       
        let newUser = {
            'firstName':e.target[0].value,
            'surname':e.target[1].value,
            'patronymic':e.target[2].value,
            'email':e.target[7].value,
            'password':e.target[8].value,
            'region':{
                'id':e.target[4].value
            },
            'sex':{
                'id':e.target[5].value
            },
            'sportsTitle': {
                'id':e.target[6].value
            },
            'birthDate':e.target[3].value

        }

        console.log(newUser)

        axios.post('auth/signup', newUser)
                .then(({data}) => 
            { 
                setUser({ 
                    ...data 
                }) 
                localStorage.setItem('user', JSON.stringify({ 
                    ...data 
                })) 
                navigate('/login') 
            }) 
            .catch((err) => console.log(err.message))
    }

    

    return(
        <div className='authorization'>
            <div className='popup'>
                <form className='form' onSubmit={registerUser}>
                    <p className='header fonts-roboto-black'>Регистрация</p>
                    <input type='text' 
                            className='input fonts-roboto-light' 
                            placeholder='Введите имя'/>
                    <input type='text' 
                            className='input fonts-roboto-light' 
                            placeholder='Введите фамилию'/>
                    <input type='text' 
                            className='input fonts-roboto-light' 
                            placeholder='Введите отчество'/>
                    <input type='date' 
                            className='input fonts-roboto-light' 
                            placeholder='Введите отчество'/>

                    <select className='input fonts-roboto-light'>
                                <option value='' disabled selected hidden>Выберите регион</option>
                                {regions.map(region => (
                                    <option value={region?.id}>{region?.name}</option>
                                ))}
                    </select>
                    <select className='input fonts-roboto-light'>
                        <option value='' disabled selected hidden>Выберите пол</option>
                        <option value='1'>Мужской</option>
                        <option value='2'>Женский</option>
                    </select>
                    <select className='input fonts-roboto-light'>
                                <option value='' disabled selected hidden>Выберите спортивный разряд</option>
                                {sportsTitle.map(region => (
                                    <option value={region?.id}>{region?.name}</option>
                                ))}
                    </select>
                    <input type='email' 
                            className='input fonts-roboto-light' 
                            placeholder='Введите email'/>
                    <input type='password' 
                            className='input fonts-roboto-light' 
                            placeholder='Введите пароль'/>    
                    <div className='form-button'>
                        <Button parametr={'Зарегистрироваться'} type={'submit'}/>
                        <p className='fonts-roboto-regular clue'>Уже есть аккаунт? 
                            <a href='/login' className='link'>Войти</a>
                        </p>
                        <p className='fonts-roboto-regular clue'>
                            <a href='/' className='link'>Главная</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default RegistrationForm;