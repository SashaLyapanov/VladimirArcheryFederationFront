import Navbar from "../../../components/navbar/Navbar";
import NamePage from "../../../components/namePage/NamePage";
import EditCompetitionForm from "./EditCompetitionForm";
import {useParams} from "react-router";


const EditCompetition = () => {

    const competitionId = useParams();

    return (
        <div>
            <Navbar/>
            <div className={'page-content'}>
                <NamePage name={'Редактирование соревнования'}/>
                <EditCompetitionForm competitionId={competitionId}/>
            </div>
        </div>
    )
}

export default EditCompetition;