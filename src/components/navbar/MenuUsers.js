import '../../fonts/roboto/fonts.css'
import './style.css'
import arrow from '../../img/arrow.png'
import userpng from '../../img/user.png'

const MenuUser = () => {
    return (
            <span className='user'>
                <a href="/login" className="fonts-roboto-black menu-elements">Вход</a>  
            </span>
    )
}

export default MenuUser;