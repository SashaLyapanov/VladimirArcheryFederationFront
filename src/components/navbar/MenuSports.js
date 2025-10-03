import '../../fonts/roboto/fonts.css'
import './style.css'
import arrow from '../../img/arrow.svg'
import userpng from '../../img/user.png'
import {useContext} from 'react'
import {CustomContext} from '../../utils/Context'

const MenuSports = () => {

    const {user, setUser} = useContext(CustomContext)

    const onclickArrow = () => {
        const menu = document.getElementById('menu')
        menu.classList.toggle('open');
    }

    const onclickExit = () => {
        localStorage.clear();
    }

    return (
        <span className='user'>
                <div className='user-name' onClick={onclickArrow}>
                    <img src={userpng} className='menu-icon-userpng'/>
                    <p className='fonts-roboto-regular'>{`${user?.userData?.name} ${user?.userData?.surname}`}</p>
                    <img src={arrow} className='menu-icon-arrow'/>
                </div>
                <div id='menu' className='menu-user'>
                    <a href='/profile' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Профиль</div>
                    </a>
                    <a href='/myCompetition' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Мои соревнования</div>
                    </a>
                    <a href='/aboutFederation' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>О федерации</div>
                    </a>
                    <a href='/articleList' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Новости</div>
                    </a>
                    <a href='/activityFederation' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Деятельность</div>
                    </a>
                    <a href='/competition' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Соревнования</div>
                    </a>
                    <a href='/regionalTeam' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Сборная</div>
                    </a>
                    <a href='/' className='menu-link' onClick={onclickExit}>
                        <div className='menu-list fonts-roboto-light'>Выйти</div>
                    </a>
                </div>
            </span>
    )
}

export default MenuSports;