import Navbar from '../../../components/navbar/Navbar'
import NamePage from '../../../components/namePage/NamePage'
import AddCompetition from './AddCompetition';
import '../../../style.css';


const CreateCompetition = () => {

    return (
        <div>
            <Navbar/>
            <div className={'page-content'}>
                <NamePage name={'Добавление соревнования'}/>
                <AddCompetition/>
            </div>
        </div>
    )
}

export default CreateCompetition