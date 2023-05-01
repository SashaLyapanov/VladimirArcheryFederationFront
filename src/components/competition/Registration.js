import Button from "../button/Button"

const Registration = () => {

    const onclick = () => {
        window.location.assign('http://localhost:3000/competition/competitionId');
      }

    return(
        <div className=" container_for_page registration">
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Имя</p>
                <input 
                    type='text' 
                    placeholder='Введите имя'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Фамилия</p>
                <input 
                    type='text' 
                    placeholder='Введите фамилия'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Отчество</p>
                <input 
                    type='text' 
                    placeholder='Введите отчество'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Email</p>
                <input 
                    type='text' 
                    placeholder='Введите email'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Телефон</p>
                <input 
                    type='text' 
                    placeholder='Введите телефон'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                />
            </div>
            <Button parametr={'Зарегистрироваться'}
                    functionClick={onclick}/>
        </div>
    )
}

export default Registration