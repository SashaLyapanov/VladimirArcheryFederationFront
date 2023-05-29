import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'

const InformationUser = ({user, btnStatus}) => {
    return(
        <div className="container information-user">
            <PhotoProfile btnStatus={btnStatus}/>
            <DataProfile user={user} />
        </div>
    )
}

export default InformationUser