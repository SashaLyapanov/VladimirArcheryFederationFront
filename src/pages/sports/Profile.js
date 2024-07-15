import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import InformationUser from '../../components/profile/InformationUser'
import '../../style.css';

const Profile = ({user, btnStatus}) => {
    return(
        <div className="page-content">
            <Navbar/>
            <NamePage name={"Личный профиль"}/>
            <InformationUser user={user} btnStatus={btnStatus}/>
        </div>
    )
}

export default Profile