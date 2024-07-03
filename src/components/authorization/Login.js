import './authorization.css'
import '../../fonts/roboto/fonts.css'
import Button from '../button/Button'
import axios from '../../utils/axios'
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router'

const Login = () => {
    
    const {user, setUser} = useContext(CustomContext)
    const navigate = useNavigate()

    const loginUser = (e) => {
        e.preventDefault()
        
        let newUser = {
            email: e.target[0].value,
            password: e.target[1].value
        }

            axios.post('auth/signin', newUser)
            .then(({data}) => 
            { 
                setUser({ 
                    ...data 
                }) 
                localStorage.setItem('user', JSON.stringify({ 
                    ...data 
                })) 
                navigate('/') 
            }) 
            .catch((err) => console.log(err.message))

    }

    return(
        <div className='authorization'>
            <div className='popup'>
                <form className='form' onSubmit={loginUser}>
                    <p className='header fonts-roboto-black'>Авторизация</p>
                    <input type='text' 
                        className='input fonts-roboto-light' 
                        placeholder='Введите логин'/>
                    <input type='password' 
                            className='input fonts-roboto-light' 
                            placeholder='Введите пароль'/>    
                    
                    <div className='form-button'>
                    <Button parametr={'Войти'} type={'submit'}/>
                        <p className='fonts-roboto-regular clue'>Еще нет аккаунта? <a href='/registration' className='link'>Регистрация</a></p>
                        <p className='fonts-roboto-regular clue'><a href='/' className='link'>Главная</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login;