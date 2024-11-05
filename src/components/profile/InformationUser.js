import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'
import {useEffect, useState} from "react";
import axios from "../../utils/axios";

const InformationUser = ({user, btnStatus}) => {

    const [sportsman, setSportsman] = useState();

    useEffect(() => {
        const fetchSportsmanData = () => {
            axios.get(`personalAccount/myProfileData?sportsmanId=${user?.id}`)
                .then(({data}) => setSportsman(data));
        }
        fetchSportsmanData();
    }, [user]);

    return (
        <div>
            <div className="information-user">
                <PhotoProfile btnStatus={btnStatus}/>
                <DataProfile sportsman={sportsman}/>
            </div>
        </div>

    )
}

export default InformationUser