import React, {useState} from 'react';
import axios from 'axios';
import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Button from '../button/Button';
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import { useNavigate } from 'react-router';


const SearchSports = ({role}) => {

    const navigate = useNavigate()
    const [inputName, setInputName] = useState('')
    const {user, setUser} = useContext(CustomContext)


    const onClick = () => {
        if(role == 'coaches'){
            navigate('/createCoaches')
        } else {
            navigate('/createSports')
        }
        
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
                    <p className='fonts-roboto-regular name_search'>ФИО</p>
                    <input type='text' 
                            placeholder='ФИО' 
                            className='fonts-roboto-thin user-search'
                            value={inputName}
                            onChange={e => setInputName(e.target.value)}/>
                </div>
                
                <div className='button_flex'>
                    <Button parametr={'Найти'}  
                            functionClick={onClick} />
                    {buttonAdd(user.role)}
                    
                </div>
            </form>
        </div>
    )
}

export default SearchSports