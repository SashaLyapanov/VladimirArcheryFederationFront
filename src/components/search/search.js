import '../../style.css';
import '../../fonts/roboto/fonts.css'
import './style.css'
import Input from './Input';
import Select from './Select';
import Button from '../button/Button';


const Search = ({nameInput}) => {
    return(
        <div>
            <div className='container container_for_page search'>
                {nameInput.map(input => (
                    <Input parametr={input}/>
                ))}
                <Select/>
                <div className='button_flex'>
                    <Button parametr={'Найти'}/>
                </div>
            </div>
        </div>
    )
}

export default Search