import "./../navbar/style.css";
import '../../style.css';
import logo from "./../../img/logo.jpg";
import place from "./../../img/place.png";
import MenuUser from "./MenuUsers";

const Navbar = ({parametr}) => {
    return(
        <nav className="nav">
        <div className='container nav-container'>
          <div className='logoContainer'>
            <img src={logo} className="logo"/>
          </div>
          <div className="contentContainer">
            <div className='info'>
              <div>
                <p className="content fonts-roboto-black">федерация стрельбы из лука владимирской области</p>
                <a href="@" className="place fonts-roboto-regular">
                  <img src={place} className="img-place"/>
                  Владимир
                  </a>
              </div>
              <p className="fonts-roboto-black"><MenuUser/></p>
            </div>
            <div className='menu fonts-roboto-black'>
                <a href="@" className="menu-elements">О федерации</a>
                <a href="@" className="menu-elements">Новости</a>
                <a href="@" className="menu-elements">Деятельность</a>
                <a href="@" className="menu-elements">Соревнования</a>
                <a href="@" className="menu-elements">Сборная</a>
                <a href="@" className="menu-elements">Профессионалам</a>
            </div>
          </div>
      </div>
    </nav>
    );
}

export default Navbar;