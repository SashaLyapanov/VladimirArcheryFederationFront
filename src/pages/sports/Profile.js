import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import InformationUser from '../../components/profile/InformationUser'
import '../../style.css';

const Profile = ({user}) => {
    return(
        <>
            <Navbar/>
            <NamePage name={'Профиль'}/>
            <InformationUser user={user}/>
        </>
    )
}

export default Profile