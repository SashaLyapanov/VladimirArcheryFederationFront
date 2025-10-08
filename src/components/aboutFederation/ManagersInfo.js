import {useEffect, useState} from "react";

const ManagersInfo = ({props}) => {

    const [managers, setManagers] = useState()

    useEffect(() => {
        setManagers(props);
    })

    return(
        <div className="info-block">
            <h1 className='fonts-roboto-black'>Управляющий состав:</h1>
            <p className='info-body'>{managers}</p>
        </div>
    )
}

export default ManagersInfo;