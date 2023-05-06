import '../../fonts/roboto/fonts.css'
import './style.css'
import arrow from '../../img/arrow.png'
import userpng from '../../img/user.png'

const MenuSports = () => {

    const onclickArrow = () =>{
        const menu = document.getElementById('menu')
        if (menu.getAttribute('display') == 'yes'){
            menu.classList.add('menu-user')
            menu.setAttribute("display", "none")
        } else {
            menu.classList.remove('menu-user')
            menu.setAttribute("display", "yes")
        }
        
    }

    const onclickExit = () => {
        localStorage.clear();
    }

    return (
            <span className='user'>
                <div className='user-name'>
                    <img src={userpng} className='menu-icon-userpng'/>
                    <p className='fonts-roboto-black'>Александр Ляпанов</p>
                    <img src={arrow} className='menu-icon-arrow' onClick={onclickArrow}/>
                </div>
                <div id='menu' display='yes' className='menu-user'>
                    <a href='/profile'  className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Профиль</div>
                    </a>
                    <a href='@' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Дневник</div>
                        </a>
                    <a href='@' className='menu-link'>
                        <div className='menu-list fonts-roboto-light'>Соревнования</div>
                    </a>
                    <a href='/' className='menu-link' onClick={onclickExit}>
                        <div className='menu-list fonts-roboto-light'>Выйти</div>
                    </a>
                </div>
                
            </span>
    )
}

export default MenuSports;