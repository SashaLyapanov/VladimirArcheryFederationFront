import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import InformationUser from '../../components/profile/InformationUser'
import '../../style.css';

const Profile = () => {
    return(
        <>
            <Navbar/>
            <NamePage name={'Профиль'}/>
            <InformationUser/>
        </>
    )
}

export default Profile