import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import AddSports from '../../components/sports/AddSpoprts';
import '../../style.css';


const CreateSportsman = () => {

    return(
        <div className={'page-content'}>
            <Navbar/>
            <NamePage name={'Добавление спортсмена'}/>
            <AddSports/>
        </div>
    )
}

export default CreateSportsman