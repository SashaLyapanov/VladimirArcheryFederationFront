import './authorization.css'
import '../../fonts/roboto/fonts.css'
import Button from '../button/Button'
import axios from 'axios'
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router'

const RegistrationForm = () => {

    const {user, setUser} = useContext(CustomContext)

    const navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault()
       
        let newUser = {
            email: e.target[3].value,
            password: e.target[4].value
        }

        axios.post('http://localhost:8080/register', newUser)
            .then(({data}) => 
            // console.log(res))
            {
                setUser({
                    token: data.accessToken,
                    ...data.user
                })
                localStorage.setItem('user', JSON.stringify({
                    token: data.accessToken,
                    ...data.user
                }))
                navigate('/')
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