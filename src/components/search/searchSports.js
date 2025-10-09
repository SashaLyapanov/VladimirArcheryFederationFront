import React, {useState} from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Button from '../button/Button';
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router';
import {useFormik} from "formik";
import cleaner from "../../img/trash.png";


const SearchSports = ({role}) => {
    const params = new URLSearchParams(document.location.search);

    const navigate = useNavigate()
    const {user, setUser} = useContext(CustomContext)


    const onClick = () => {
        if(role === 'coaches'){
            navigate('/createCoaches')
        } else {
            navigate('/createSports')
        }
    }

    const formik = useFormik({
        initialValues: {
            inputSurname: params.get('surname') ? params.get('surname') : '',
            inputName: params.get('name') ? params.get('name') : '',
            inputPatronymic: params.get('patronymic') ? params.get('patronymic') : '',
        },
        onSubmit: async values => {
            if (values.inputSurname === '' && values.inputName === '' && values.inputPatronymic === '') {
                navigate('/sports');
            } else {
                navigate('/sports?surname=' + values.inputSurname + "&name=" + values.inputName
                    + "&patronymic=" + values.inputPatronymic);
            }
        }
    })

    const cleanForm = () => {
        formik.setFieldValue('inputSurname', '');
        formik.setFieldValue('inputName', '');
        formik.setFieldValue('inputPatronymic', '');
    }

    function buttonAdd(role){
        if (role == 'ADMIN'){
            return <Button
                className='button_for_search'
                parametr={'Добавить'}
                functionClick={onClick} />
        }
    }

    return(
        <div>
            <form className='container_for_page search' onSubmit={formik.handleSubmit}>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Фамилия</p>
                    <input
                        id="inputSurname"
                        name="inputSurname"
                        type='text'
                        placeholder='Фамилия'
                        className='fonts-roboto-thin user-search'
                        value={formik.values.inputSurname}
                        onChange={formik.handleChange}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Имя</p>
                    <input
                        id="inputName"
                        name="inputName"
                        type='text'
                        placeholder='Имя'
                        className='fonts-roboto-thin user-search'
                        value={formik.values.inputName}
                        onChange={formik.handleChange}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Отчество</p>
                    <input
                        id="inputPatronymic"
                        name="inputPatronymic"
                        type='text'
                        placeholder='Отчество'
                        className='fonts-roboto-thin user-search'
                        value={formik.values.inputPatronymic}
                        onChange={formik.handleChange}/>
                </div>

                <div className="controls">
                    <div className="center_position_for_img">
                        <img src={cleaner} alt='Иконка для очистки' className='cleaner_search_form' onClick={cleanForm}/>
                    </div>
                    <div className='button_space'>
                        <button
                            className='button_for_search'
                            type="submit">
                            Найти
                        </button>
                        {buttonAdd(user?.userData?.role)}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchSports