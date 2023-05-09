import React, {useState} from 'react';
import axios from 'axios';
import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Button from '../button/Button';


const SearchSports = () => {
    const [inputName, setInputName] = useState('')

    const onClick = () => {
        axios.get('http://localhost:3001/competition/', {
            params: {
                name: inputName,
            }
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
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
                </div>
            </form>
        </div>
    )
}

export default SearchSports