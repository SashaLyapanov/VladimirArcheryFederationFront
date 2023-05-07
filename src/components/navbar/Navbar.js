import "./../navbar/style.css";
import '../../style.css';
import logo from "./../../img/logo.jpg";
import place from "./../../img/place.png";
import MenuUser from "./MenuUsers";
import MenuSports from "./MenuSports";
import MenuAdmin from "./MenuAdmin";
import MenuTrainer from "./MenuTrainer";
import React, {Component} from "react";
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'

const Navbar = () => {

  const {user, setUser} = useContext(CustomContext)

  const userRole = (role) => {
    if(role == "sports") {
      return <MenuSports/>
    } else if ( role == "trainer") {
      return <MenuTrainer/>
    } else if ( role == "admin") {
      return <MenuAdmin/>
    } else {
      return <MenuUser/>
    }
  }

    return(
      <>
        <nav className="nav">
        <div className='container nav-container'>
          <a href="/">
          <div className='logoContainer'>
            <img src={logo} className="logo"/>
          </div>
          </a>
          <div className="contentContainer">
            <div className='info'>
              <div>
                <p className="content fonts-roboto-black">федерация стрельбы из лука владимирской области</p>
                <a href="@" className="place fonts-roboto-regular">
                  <img src={place} className="img-place"/>
                  Владимир
                  </a>
              </div>
              {userRole(user.role)}
            </div>
            <div className='menu fonts-roboto-black'>
                <a href="@" className="menu-elements">О федерации</a>
                <a href="@" className="menu-elements">Новости</a>
                <a href="@" className="menu-elements">Деятельность</a>
                <a href="/competition" className="menu-elements">Соревнования</a>
                <a href="@" className="menu-elements">Сборная</a>
                <a href="@" className="menu-elements">Профессионалам</a>
            </div>
          </div>
      </div>
    </nav>
    </>
    );
}

export default Navbar;