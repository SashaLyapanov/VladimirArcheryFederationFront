import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import InformationUser from '../../components/profile/InformationUser'
import '../../style.css';
import {useContext} from "react";
import {CustomContext} from "../../utils/Context";

const Profile = ({profile, btnStatus}) => {

    const {user} = useContext(CustomContext)

    return (
        <div className="container">
            <div className="page-content">
                <Navbar/>
                {user?.userData?.role === "ADMIN" ?
                    <NamePage name={"Профиль спортсмена"}/>
                    :
                    <NamePage name={"Личный профиль"}/>
                }
                <InformationUser btnStatus={btnStatus}/>
            </div>
        </div>
    )
}

export default Profile