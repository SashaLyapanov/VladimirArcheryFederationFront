import React, {useState} from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Button from '../button/Button';
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router';


const SearchSports = ({role}) => {

    const navigate = useNavigate()
    const [inputSurname, setInputSurname] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputPatronymic, setInputPatronymic] = useState('')
    const {user, setUser} = useContext(CustomContext)


    const onClick = () => {
        if(role == 'coaches'){
            navigate('/createCoaches')
        } else {
            navigate('/createSports')
        }
    }

    const onClickSearch = () => {

    }

    function buttonAdd(role){
        if (role == 'ADMIN'){
            return <Button parametr={'Добавить'}  
            functionClick={onClick} />
        }
    }

    return(
        <div>
            <form className='container container_for_page search'>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Фамилия</p>
                    <input type='text' 
                            placeholder='Фамилия'
                            className='fonts-roboto-thin user-search'
                            value={inputSurname}
                            onChange={e => setInputSurname(e.target.value)}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Имя</p>
                    <input type='text'
                           placeholder='Имя'
                           className='fonts-roboto-thin user-search'
                           value={inputName}
                           onChange={e => setInputName(e.target.value)}/>
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_search'>Отчество</p>
                    <input type='text'
                           placeholder='Отчество'
                           className='fonts-roboto-thin user-search'
                           value={inputPatronymic}
                           onChange={e => setInputPatronymic(e.target.value)}/>
                </div>
                
                <div className='button_flex'>
                    <Button parametr={'Найти'}  
                            functionClick={onClickSearch} />
                    {buttonAdd(user?.userData?.role)}
                    
                </div>
            </form>
        </div>
    )
}

export default SearchSports