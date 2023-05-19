import Button from "../button/Button"
import axios from '../../utils/axios'

const DataProfile = ({user}) => {
    const onClick = () => {
        document.getElementById('button-edit').classList.remove('button-display')
        document.getElementById('button-save').classList.add('button-display')
        const inputs = document.getElementsByClassName('input_profile')
        for (var input of inputs) {
            input.classList.remove('input_profile_edit')
            input.setAttribute('disabled', 'disabled');
        }
        axios.put('admin/editSportsman', user.email)
        .then((res) => 
        console.log(res)) 

    }
    return(
        <div className="data-profile">
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Имя</p>
                <input 
                    type='text' 
                    value={user?.firstName}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Отчество</p>
                <input 
                    type='text' 
                   value={user?.patronymic}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Фамилия</p>
                <input
                    type='text'
                    value={user?.surname}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Дата рождения</p>
                <input 
                    type='text' 
                    value={user?.birthDate}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Email</p>
                <input 
                    type='text' 
                    value={user?.email}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Тренер</p>
                <input
                    type='text'
                    value={user?.personal_coach?.surname + " " + user?.personal_coach?.firstName + " " + user?.personal_coach?.patronymic}
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            
            <Button id={'button-save'}
                    parametr={'Сохранить'} 
                    className={'button-display'}
                    functionClick={onClick}/>
            
        </div>
    )
}

export default DataProfile