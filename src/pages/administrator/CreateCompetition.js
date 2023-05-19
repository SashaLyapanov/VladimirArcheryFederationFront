import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import AddCompetition from '../../components/competition/AddCompetition';
import '../../style.css';


const Calendar = () => {  

    return(
        <>
            <Navbar/>
            <NamePage name={'Добавление соревнования'}/>
            <AddCompetition/>
        </>
    )
}

export default Calendar