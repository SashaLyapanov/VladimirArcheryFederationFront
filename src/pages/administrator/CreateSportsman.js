import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import AddSports from '../../components/sports/AddSpoprts';
import '../../style.css';


const Calendar = () => {  

    return(
        <>
            <Navbar/>
            <NamePage name={'Добавление спортсмена'}/>
            <AddSports/>
        </>
    )
}

export default Calendar