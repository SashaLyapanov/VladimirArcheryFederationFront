import React, {useState} from 'react';
import axios from 'axios';
import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Button from '../button/Button';
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router'


const Search = () => {
    const [inputName, setInputName] = useState('')
    const [inputDate, setInputDate] = useState('')
    const [selectValue, setSelectValue] = useState('')

    const onClick = () => {
        // axios.get('http://localhost:8080/api/v1/admin/competitions', {
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

    function buttonBlock(role){
        if(role == 'admin'){
            return <Button id={'button-block'}
                                parametr={'Добавить'} 
                                className={''}
                                functionClick={onClickBlock}/>
                        
        }
    }

    return(
        <div>
            <form className='container container_for_page search'>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Название</p>
                    <input type='text' 
                            placeholder='Введите название' 
                            className='fonts-roboto-thin input_search'
                            value={inputName}
                            onChange={e => setInputName(e.target.value)}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Дата</p>
                    <input type='date' 
                            placeholder='Выберите дату' 
                            className='fonts-roboto-thin input_search'
                            value={inputDate}
                            onChange={e => setInputDate(e.target.value)}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Категория</p>
                    <select className='fonts-roboto-thin input_search' 
                            value={selectValue} 
                            onChange={e => setSelectValue(e.target.value)}>
                        <option value='' disabled selected hidden>Выберите категорию</option>
                        <option>Категория 1</option>
                        <option>Категория 2</option>
                        <option>Категория 3</option>
                        <option>Категория 4</option>
                    </select>
                </div>
                <div className='button_flex'>
                    <Button parametr={'Найти'}  
                            functionClick={onClick} />
                    {buttonBlock(user.role)}
                </div>
            </form>
        </div>
    )
}

export default Search