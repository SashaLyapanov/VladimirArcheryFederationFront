import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'

const InformationUser = () => {
    
    return(
        <div className="container information-user">
            <PhotoProfile />
            <DataProfile />
        </div>
    )
}

export default InformationUser