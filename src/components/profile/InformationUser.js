import PhotoProfile from "./PhotoProfile"
import DataProfile from "./DataProfile"
import './profile.css'
import {useContext, useEffect, useState} from "react";
import {apiServiceAxios} from "../../utils/axios";
import {CustomContext, SportContext} from "../../utils/Context";

const InformationUser = ({btnStatus}) => {

    const {user} = useContext(CustomContext);
    const {sport} = useContext(SportContext);
    const [sportsman, setSportsman] = useState(null);

    useEffect(() => {
        if (!user || !user?.accessToken) return;

        const fetchSportsmanData = (id) => {
            apiServiceAxios.get(`admin/sportsmanById?id=${id}`, {}, true)
                .then(({data}) => setSportsman(data))
                .catch(error => console.error('Admin data error:', error));
        }

        const fetchPersonalData = () => {
            apiServiceAxios.get(`personalAccount/myProfileData?sportsmanId=${user?.userData?.id}`, {}, true)
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
                <div>
                    <PhotoProfile sportsmanProps={sportsman} btnStatus={btnStatus}/>
                </div>
                <div>
                    <DataProfile sportsman={sportsman}/>
                </div>
            </div>
        </div>
    )
}

export default InformationUser