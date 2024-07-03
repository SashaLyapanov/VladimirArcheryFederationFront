import {useEffect, useState} from "react";

const ManagersInfo = ({props}) => {

    const [managers, setManagers] = useState()

    useEffect(() => {
        setManagers(props);
    })

    return(
        <div className="info-block">
            <h1>Управляющий состав:</h1>
            <p>{managers}</p>
        </div>
    )
}

export default ManagersInfo;