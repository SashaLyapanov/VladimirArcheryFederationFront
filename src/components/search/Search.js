import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Button from '../button/Button';
import {useContext} from 'react'
import {CustomContext} from '../../utils/Context'
import {useNavigate} from 'react-router'


const Search = () => {
    const [inputName, setInputName] = useState('')
    const [inputDate, setInputDate] = useState('')
    const [selectValue, setSelectValue] = useState('')

    const [bowTypes, setBowTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/general/allBowTypes')
            .then((res) => res.json())
            .then((result) => {
                setBowTypes(result);
            });
    }, []);

    const onClick = () => {
        axios.get('http://localhost:3001/competition/', {
            params: {
                name: inputName,
                date: inputDate,
                select: selectValue
            }
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    const {user, setUser} = useContext(CustomContext)
    const navigate = useNavigate()

    const onClickBlock = (e) => {
        navigate('/')
    }

    const onClickAdd = (e) => {
        navigate('/CreateCompetition')
    }

    function buttonBlock(role) {
        if (role == 'ADMIN') {
            return <Button id={'button-block'}
                           parametr={'Добавить'}
                           className={''}
                           functionClick={onClickAdd}/>

        }
    }

    return (
        <div>
            <form className='container_for_page search'>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Название соревнования</p>
                    <input type='text'
                           placeholder='Введите название'
                           className='fonts-roboto-thin input_search'
                           value={inputName}
                           onChange={e => setInputName(e.target.value)}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Дата начала соревнования</p>
                    <input type='date'
                           placeholder='Выберите дату'
                           className='fonts-roboto-thin input_search'
                           value={inputDate}
                           onChange={e => setInputDate(e.target.value)}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Спортивная дисциплина (класс лука)</p>
                    <select className='fonts-roboto-thin input_search'
                            value={selectValue}
                            onChange={e => setSelectValue(e.target.value)}>
                        <option value='' disabled selected hidden>Выберите класс лука</option>
                        {bowTypes.map(bowType => (
                            <option value={bowType?.id}>{bowType?.bowTypeName}</option>
                        ))}
                    </select>
                </div>
                <div className='button_flex'>
                    <Button parametr={'Найти'}
                            functionClick={onClick}/>
                    {buttonBlock(user.role)}
                </div>
            </form>
        </div>
    )
}

export default Search