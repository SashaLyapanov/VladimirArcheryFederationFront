import '../../fonts/roboto/fonts.css'
import './style.css'
import arrow from "../../img/arrow.svg";

const MenuUser = () => {

    const onclickArrow = () => {
        const menu = document.getElementById('menu')
        menu.classList.toggle('open');
    }

    return (
        <span className='user'>
            <div className='user-name'>
                <a href="/login" className="fonts-roboto-regular menu-elements">Вход</a>
                <img src={arrow} className='menu-icon-arrow' onClick={onclickArrow}/>
            </div>
            <div id='menu' className='menu-user'>
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
            </div>
        </span>
    )
}

export default MenuUser;