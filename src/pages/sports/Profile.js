import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import InformationUser from '../../components/profile/InformationUser'
import '../../style.css';

const Profile = ({user, btnStatus}) => {
    return(
        <>
            <Navbar/>
            <NamePage name={'Профиль'}/>
            <InformationUser user={user} btnStatus={btnStatus}/>
        </>
    )
}

export default Profile