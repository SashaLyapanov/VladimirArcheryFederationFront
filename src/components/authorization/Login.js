import './authorization.css'
import '../../fonts/roboto/fonts.css'
import Button from '../button/Button'
import axios from '../../utils/axios'
import {useContext, useState} from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router'
import {useFormik} from "formik";
import * as Yup from "yup";

const Login = () => {
    
    const {user, setUser} = useContext(CustomContext)
    const navigate = useNavigate()
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Поле обязательно для заполнения'),
            email: Yup.string().email("Поле не удовлетворяет требованиям")
        }),
        onSubmit: async values => {
            let newUser = {
                email: values.email,
                password: values.password
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
                .catch((err) => setError(err))
        }
    })

    return(
        <div className='authorization'>
            <div className='popup'>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <p className='header fonts-roboto-black'>Авторизация</p>
                    <input
                        id='email'
                        name='email'
                        type='text'
                        className='input_auth fonts-roboto-light'
                        placeholder='Введите логин'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='error-massage'>{formik.errors.email}</div>
                    ) : null}
                    <input
                        id='password'
                        name='password'
                        type='password'
                        className='input_auth fonts-roboto-light'
                        placeholder='Введите пароль'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='error-massage'>{formik.errors.password}</div>
                    ) : null}
                    {error !== '' ? (
                        <div className='error-massage'>Возникла ошибка. Введите корректные данные для входа.</div>
                    ) : null}
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