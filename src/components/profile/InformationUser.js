import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'
import NamePage from "../namePage/NamePage";

const InformationUser = ({user, btnStatus}) => {
    return (
        <div>
            <div className="information-user">
                <PhotoProfile btnStatus={btnStatus}/>
                <DataProfile user={user}/>
            </div>
        </div>

    )
}

export default InformationUser