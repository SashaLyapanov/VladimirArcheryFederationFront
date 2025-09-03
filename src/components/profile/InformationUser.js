import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'
import {useContext, useEffect, useState} from "react";
import axios from "../../utils/axios";
import {CustomContext, SportContext} from "../../utils/Context";

const InformationUser = ({btnStatus}) => {

    const {user} = useContext(CustomContext);
    const {sport} = useContext(SportContext);
    const [sportsman, setSportsman] = useState(null);

    useEffect(() => {
        if (!user || !user?.accessToken) return;

        const fetchSportsmanData = (id) => {
            axios.get(`admin/sportsmanById?id=${id}`,
                {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user?.accessToken}}
            )
                .then(({data}) => setSportsman(data))
                .catch(error => console.error('Admin data error:', error));
        }

        const fetchPersonalData = () => {
            axios.get(`personalAccount/myProfileData?sportsmanId=${user?.userData?.id}`,
                {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user?.accessToken}}
            )
                .then(({data}) => setSportsman(data));
        }
        if (user?.userData?.role === "ADMIN") {
            if (sport && sport.id) {
                fetchSportsmanData(sport?.id);
            }
        } else {
            fetchPersonalData();
        }

    }, [user, sport]);

    return (
        <div>
            <div className="information-user">
                <PhotoProfile sportsmanProps={sportsman} btnStatus={btnStatus}/>
                <DataProfile sportsman={sportsman}/>
            </div>
        </div>
    )
}

export default InformationUser