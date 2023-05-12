import Navbar from '../../components/navbar/Navbar';
import Registration from '../../components/competition/Registration';
import NamePage from '../../components/namePage/NamePage';

const CompetitionRegistration = () => {
    return(
        <>
            <Navbar/>
            <NamePage name={'Регистрация на соревнование'}/>
            <Registration/>
        </>
    );
}

export default CompetitionRegistration