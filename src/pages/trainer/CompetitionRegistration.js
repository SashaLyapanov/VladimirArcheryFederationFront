import Navbar from '../../components/navbar/Navbar';
import RegistrationGroup from '../../components/competition/RegistrationGroup';
import NamePage from '../../components/namePage/NamePage';

const Home = () => {
    return(
        <>
            <Navbar/>
            <NamePage name={'Регистрация группы на соревнование'}/>
            <RegistrationGroup/>
        </>
    );
}

export default Home