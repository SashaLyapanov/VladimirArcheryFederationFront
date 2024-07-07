import logo from '../../img/logo2.png'
import calendar from '../../img/calendar.png'

const MenuDiary = () => {

    return (
        <div className='menu-diary'>
            <div className='title-block-diary'>
                <p className='fonts-roboto-black title-diary'>Дневник</p>
                <p className='fonts-roboto-black title-diary'>спортсмена</p>
                <p className='fonts-roboto-light user-diary'>Фамилия</p>
            </div>
            <a href='/'>
                <div className="menu-element-diary">
                    <img src={logo} className='logo-diary'/>
                </div>
            </a>
            <div id='calendar' classNrame="menu-element-diary">
                <img id='calendar' src={calendar} className='icon-diary'/>
            </div>
        </div>
    )
}

export default MenuDiary