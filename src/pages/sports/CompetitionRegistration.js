import Navbar from '../../components/navbar/Navbar';
import Registration from '../../components/competition/Registration';
import NamePage from '../../components/namePage/NamePage';
import {useParams} from "react-router";

const CompetitionRegistration = () => {

    const competitionId = useParams();

    return(
        <>
            <Navbar/>
            <NamePage name={'Регистрация на соревнование'}/>
            <Registration competitionId={competitionId}/>
        </>
    );
}

export default CompetitionRegistration