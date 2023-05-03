import './authorization.css'
import '../../fonts/roboto/fonts.css'
import Button from '../button/Button'

const Login = () => {
    return(
        <div className='authorization'>
            <div className='popup'>
                <p className='header fonts-roboto-black'>Вход</p>
                <input type='text' className='input fonts-roboto-light' placeholder='Введите логин'/>
                <input type='password' className='input fonts-roboto-light' placeholder='Введите пароль'/>    
                
                <div className='form-button'>
                    <Button parametr={'Войти'}/>
                    <p className='fonts-roboto-regular clue'>Еще нет аккаунта? <a href='/registration' className='link'>Регистрация</a></p>
                    <p className='fonts-roboto-regular clue'><a href='/' className='link'>Главная</a></p>
                </div>
            </div>
        </div>
    )
}


export default Login;