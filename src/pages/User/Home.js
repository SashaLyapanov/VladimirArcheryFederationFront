import Navbar from '../../components/navbar/Navbar';
import News from '../../components/news/News';
import CompetitionHome from '../../components/competition/CompetitionHome';


const Home = () => {

    return (
        <div className='app'>
            <Navbar/>
            <div className="page-content">
                <News/>
                <CompetitionHome/>
            </div>
        </div>
    );
}

export default Home