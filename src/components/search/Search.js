import React, {useEffect, useState} from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Button from '../button/Button';
import {useContext} from 'react'
import {CustomContext} from '../../utils/Context'
import {useNavigate} from 'react-router'
import {useFormik} from "formik";


const Search = () => {
    const {user, setUser} = useContext(CustomContext)
    const navigate = useNavigate()

    const [bowTypes, setBowTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/general/allBowTypes')
            .then((res) => res.json())
            .then((result) => {
                setBowTypes(result);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            inputName: '',
            inputDate: '',
            bowType: '',
        },
        onSubmit: async values => {
            navigate('/competition?name=' + values.inputName + "&date=" + values.inputDate
                + "&type=" + values.bowType);
        }
    })

    const onClickAdd = (e) => {
        navigate('/CreateCompetition')
    }

    function buttonBlock(role) {
        if (role === 'ADMIN') {
            return <Button id={'button-block'}
                           parametr={'Добавить'}
                           className={''}
                           functionClick={onClickAdd}/>
        }
    }

    return (
        <div>
            <form className='container_for_page search' onSubmit={formik.handleSubmit}>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Название соревнования</p>
                    <input
                        id="inputName"
                        name="inputName"
                        type='text'
                        placeholder='Введите название'
                        className='fonts-roboto-thin input_search'
                        value={formik.values.inputName}
                        onChange={formik.handleChange}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Дата начала соревнования</p>
                    <input
                        id="inputDate"
                        name="inputDate"
                        type='date'
                        placeholder='Выберите дату'
                        className='fonts-roboto-thin input_search'
                        value={formik.values.inputDate}
                        onChange={formik.handleChange}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Спортивная дисциплина (класс лука)</p>
                    <select
                        id="bowType"
                        name="bowType"
                        className='fonts-roboto-thin input_search'
                        value={formik.values.bowType}
                        onChange={formik.handleChange}>
                        <option value='' disabled selected hidden>Выберите класс лука</option>
                        {bowTypes.map(bowType => (
                            <option value={bowType?.id}>{bowType?.bowTypeName}</option>
                        ))}
                    </select>
                </div>
                <div className='button_flex'>
                    <button
                        className='button'
                        type="submit">
                        Отправить
                    </button>
                    {buttonBlock(user.role)}
                </div>
            </form>
        </div>
    )
}

export default Search