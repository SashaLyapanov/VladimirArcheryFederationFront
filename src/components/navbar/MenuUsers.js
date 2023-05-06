import '../../fonts/roboto/fonts.css'
import './style.css'
import arrow from '../../img/arrow.png'
import userpng from '../../img/user.png'

const MenuUser = () => {

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
                <a href="/login" className="fonts-roboto-black menu-elements">Вход</a>  
            </span>
    )
}

export default MenuUser;