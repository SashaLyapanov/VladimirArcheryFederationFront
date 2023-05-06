import Button from "../button/Button"

const DataProfile = ({parametr}) => {
    const onClick = () => {
        document.getElementById('button-edit').classList.remove('button-display')
        document.getElementById('button-save').classList.add('button-display')
        const inputs = document.getElementsByClassName('input_profile')
        for (var input of inputs) {
            input.classList.remove('input_profile_edit')
            input.setAttribute('disabled', 'disabled');
        }
    }
    return(
        <div className="data-profile">
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Имя</p>
                <input 
                    type='text' 
                    placeholder='Имя'
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Фамилия</p>
                <input 
                    type='text' 
                    placeholder='Фамилия' 
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Отчество</p>
                <input 
                    type='text' 
                    placeholder='Отчество' 
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Дата рождения</p>
                <input 
                    type='text' 
                    placeholder='Дата рождения' 
                    className='fonts-roboto-thin input_profile'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Email</p>
                <input 
                    type='text' 
                    placeholder='Email' 
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