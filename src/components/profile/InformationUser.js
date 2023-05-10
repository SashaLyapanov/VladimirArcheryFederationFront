import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'

const InformationUser = ({user}) => {
    
    return(
        <div className="container information-user">
            <PhotoProfile />
            <DataProfile user={user}/>
        </div>
    )
}

export default InformationUser