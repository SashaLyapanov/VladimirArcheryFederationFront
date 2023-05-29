import '../../fonts/roboto/fonts.css'
import './style.css'
import arrow from '../../img/arrow.png'
import userpng from '../../img/user.png'

const MenuJudge = () => {
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
                    <p className='fonts-roboto-black'>Судья</p>
                    <img src={arrow} className='menu-icon-arrow' onClick={onclickArrow}/>
                </div>
                <div id='menu' display='yes' className='menu-user'>
                    <a href='/' className='menu-link' onClick={onclickExit}>
                        <div className='menu-list fonts-roboto-light'>Выйти</div>
                    </a>
                </div>
                
            </span>
    )
}

export default MenuJudge;