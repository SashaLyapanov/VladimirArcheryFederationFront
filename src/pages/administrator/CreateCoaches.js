import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import AddCoach from '../../components/sports/AddCoach';
import '../../style.css';


const CreateCoaches = () => {  

    return(
        <>
            <Navbar/>
            <NamePage name={'Добавление тренера'}/>
            <AddCoach/>
        </>
    )
}

export default CreateCoaches