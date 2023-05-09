import Navbar from '../../components/navbar/Navbar';
import News from '../../components/news/News';
import CompetitionHome from '../../components/competition/CompetitionHome';


const Home = () => {

    return(
        <>
            <Navbar />
            <News />
            <CompetitionHome/>
        </>
    );
}

export default Home