import React, {useEffect, useState} from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Button from '../button/Button';
import {useContext} from 'react'
import {CustomContext} from '../../utils/Context'
import {useNavigate} from 'react-router'
import {useFormik} from "formik";
import cleaner from "../../img/cleaner.png";


const SearchCompetitions = () => {
    const params = new URLSearchParams(document.location.search);
    const {user, setUser} = useContext(CustomContext)
    const navigate = useNavigate()

    const [competitionTypes, setCompetitionTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/general/allCompetitionTypes')
            .then((res) => res.json())
            .then((result) => {
                setCompetitionTypes(result);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            inputName: params.get('name') ? params.get('name') : '',
            inputDate: params.get('date') ? params.get('date') : '',
            competitionType: params.get('type') ? params.get('type') : '',
        },
        onSubmit: async values => {
            if (values.inputName === '' && values.inputDate === '' && values.competitionType === '') {
                navigate('/competition?name=&date=&type=');
            } else {
                navigate('/competition?name=' + values.inputName + "&date=" + values.inputDate
                    + "&type=" + values.competitionType);
            }
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

    const cleanForm = () => {
        console.log(formik.values.inputName)
        formik.setFieldValue('inputName', '');
        formik.setFieldValue('inputDate', '');
        formik.setFieldValue('competitionType', '');
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
                    <p className='fonts-roboto-regular name_search'>Вид стрельбы (3D/Target)</p>
                    <select
                        id="competitionType"
                        name="competitionType"
                        className='fonts-roboto-thin input_search'
                        value={formik.values.competitionType}
                        onChange={formik.handleChange}>
                        <option value='' >Выберите вид соревнований</option>
                        {competitionTypes.map(competitionType => (
                            <option value={competitionType?.id}>{competitionType?.name}</option>
                        ))}
                    </select>
                </div>
                <div className="">
                    <img src={cleaner} className='cleaner_search_form' onClick={cleanForm}/>
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

export default SearchCompetitions