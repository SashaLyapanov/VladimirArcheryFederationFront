import Navbar from '../../components/navbar/Navbar';
import Registration from '../../components/competition/Registration';
import NamePage from '../../components/namePage/NamePage';

const Home = () => {
    return(
        <>
            <Navbar/>
            <NamePage name={'Регистрация на соревнование'}/>
            <Registration/>
        </>
    );
}

export default Home