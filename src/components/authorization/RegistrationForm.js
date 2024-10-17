import './authorization.css'
import '../../fonts/roboto/fonts.css'
import Button from '../button/Button'
import axios from '../../utils/axios'
import {useContext, useState, useEffect} from 'react'
import {CustomContext} from '../../utils/Context'
import {useNavigate} from 'react-router'
import {useFormik} from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {

    const {user, setUser} = useContext(CustomContext)
    const [sportsTitle, setSportsTitles] = useState([])
    const [regions, setRegions] = useState([])
    const [sexes, setSexes] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        axios.get('general/allSportsTitle')
            .then(({data}) => setSportsTitles(data))
        axios.get('general/allRegions')
            .then(({data}) => setRegions(data))
        axios.get('general/allSex')
            .then(({data}) => setSexes(data))
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            surname: '',
            patronymic: '',
            email: '',
            password: '',
            region: '',
            sex: '',
            sportsTitle: '',
            birthDate: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Поле обязательно для заполнения'),
            surname: Yup.string()
                .required('Поле обязательно для заполнения'),
            email: Yup.string().email("Поле не удовлетворяет требованиям"),
            password: Yup.string()
                .required('Поле обязательно для заполнения'),
            region: Yup.string()
                .required('Поле обязательно для заполнения'),
            sex: Yup.string()
                .required('Поле обязательно для заполнения'),
            birthDate: Yup.string()
                .required('Поле обязательно для заполнения'),
        }),
        onSubmit: async values => {
            let newUser = {
                'firstName': values.firstName,
                'surname': values.surname,
                'patronymic': values.patronymic,
                'email': values.email,
                'password': values.password,
                'region': {
                    'id': values.region
                },
                'sex': {
                    'id': values.sex
                },
                'sportsTitle': {
                    'id': values.sportsTitle
                },
                'birthDate': values.birthDate

            }

            console.log(newUser)

            axios.post('auth/signup', newUser)
                .then(({data}) => {
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
    })


    return (
        <div className='authorization'>
            <div className='popup'>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <p className='header fonts-roboto-black'>Регистрация</p>
                    <input
                        id='firstName'
                        name='firstName'
                        type='text'
                        className='input_auth fonts-roboto-light'
                        placeholder='Введите имя'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className='error-massage'>{formik.errors.firstName}</div>
                    ) : null}

                    <input
                        id='surname'
                        name='surname'
                        type='text'
                        className='input_auth fonts-roboto-light'
                        placeholder='Введите фамилию'
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.surname && formik.errors.surname ? (
                        <div className='error-massage'>{formik.errors.surname}</div>
                    ) : null}

                    <input
                        id='patronymic'
                        name='patronymic'
                        type='text'
                        className='input_auth fonts-roboto-light'
                        placeholder='Введите отчество'
                        value={formik.values.patronymic}
                        onChange={formik.handleChange}
                    />

                    <input
                        id='birthDate'
                        name='birthDate'
                        type='date'
                        className='input_auth fonts-roboto-light'
                        placeholder='Введите дату рождения'
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.birthDate && formik.errors.birthDate ? (
                        <div className='error-massage'>{formik.errors.birthDate}</div>
                    ) : null}

                    <select
                        id='region'
                        name='region'
                        className='input_auth fonts-roboto-light'
                        value={formik.values.region}
                        onChange={formik.handleChange}>
                        <option value='' disabled selected hidden>Выберите регион</option>
                        {regions.map(region => (
                            <option value={region?.id}>{region?.name}</option>
                        ))}
                    </select>
                    {formik.touched.region && formik.errors.region ? (
                        <div className='error-massage'>{formik.errors.region}</div>
                    ) : null}

                    <select
                        id='sex'
                        name='sex'
                        className='input_auth fonts-roboto-light'
                        value={formik.values.sex}
                        onChange={formik.handleChange}>
                        <option value='' disabled selected hidden>Выберите пол</option>
                        {sexes.map(sex => (
                            <option value={sex?.id}>{sex?.name}</option>
                        ))}
                    </select>
                    {formik.touched.sex && formik.errors.sex ? (
                        <div className='error-massage'>{formik.errors.sex}</div>
                    ) : null}

                    <select
                        id='sportsTitle'
                        name='sportsTitle'
                        className='input_auth fonts-roboto-light'
                        value={formik.values.sportsTitle}
                        onChange={formik.handleChange}>
                        <option value='' disabled selected hidden>Выберите спортивный разряд</option>
                        {sportsTitle.map(sportsTitle => (
                            <option value={sportsTitle?.id}>{sportsTitle?.name}</option>
                        ))}
                    </select>
                    {formik.touched.sportsTitle && formik.errors.sportsTitle ? (
                        <div className='error-massage'>{formik.errors.sportsTitle}</div>
                    ) : null}

                    <input
                        id='email'
                        name='email'
                        type='email'
                        className='input_auth fonts-roboto-light'
                        placeholder='Введите email'
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