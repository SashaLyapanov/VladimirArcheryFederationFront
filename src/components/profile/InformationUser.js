import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'
import {useEffect, useState} from "react";
import axios from "../../utils/axios";

const InformationUser = ({user, btnStatus}) => {

    const [sportsman, setSportsman] = useState(null);

    useEffect(() => {
        const fetchSportsmanData = () => {
            axios.get(`personalAccount/myProfileData?sportsmanId=${user?.userData?.id}`,
                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user?.accessToken }}
                )
                .then(({data}) => setSportsman(data));
        }
        fetchSportsmanData();
    }, [user]);

    return (
        <div>
            <div className="information-user">
                <PhotoProfile sportsman={sportsman} btnStatus={btnStatus}/>
                <DataProfile sportsman={sportsman}/>
            </div>
        </div>
    )
}

export default InformationUser