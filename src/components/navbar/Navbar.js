import "./../navbar/style.css";
import '../../style.css';
import logo from "./../../img/logo2.png";
import place from "./../../img/place.png";
import MenuUser from "./MenuUsers";
import MenuSports from "./MenuSports";
import MenuAdmin from "./MenuAdmin";
import MenuJudge from "./MenuJudge";
import React from "react";
import {useContext} from 'react'
import {CustomContext} from '../../utils/Context'
import {Link} from "react-router-dom";

const Navbar = () => {

    const {user, setUser} = useContext(CustomContext)

    const userRole = (role) => {
        if (role == "SPORTSMAN") {
            return <MenuSports/>
        } else if (role == "ADMIN") {
            return <MenuAdmin/>
        } else if (role == 'JUDGE') {
            return <MenuJudge/>
        } else {
            return <MenuUser/>
        }
    }

    return (
        <nav className="nav">
            <div className='container nav-container'>

                <a className='logoContainer' href="/">
                    <img src={logo} className="logo"/>
                </a>

                <div className="contentContainer">
                    <div className='info'>
                        <div>
                            <p className="content fonts-roboto-black">федерация стрельбы из лука владимирской
                                области</p>
                            <a href="https://yandex.ru/maps/geo/vladimir/53057138/?ll=40.422683%2C56.134849&z=11"
                               className="place fonts-roboto-regular">
                                <img src={place} className="img-place"/>
                                Владимир
                            </a>
                        </div>
                        {userRole(user.role)}
                    </div>
                    <div className='menu fonts-roboto-black'>
                        <Link to="/aboutFederation" className="menu-elements">О федерации</Link>
                        <Link to="/articleList" className="menu-elements">Новости</Link>
                        <Link to="/activityFederation" className="menu-elements">Деятельность</Link>
                        <Link to="/competition" className="menu-elements">Соревнования</Link>
                        <Link to="/regionalTeam" className="menu-elements">Сборная</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;