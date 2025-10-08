import {useEffect, useState} from "react";


const LinksInfo = ({props}) => {

    const [aboutFederation, setAboutFederation] = useState();
    useEffect(() => {
        setAboutFederation(props);
    })

    return(
        <div className="info-block">
            <h1 className='fonts-roboto-black'>Полезные ссылки:</h1>
            <div className='info-body'>
                {aboutFederation?.links?.map((link) => (
                    <div>
                        <a href={link} target={"_blank"}>{link}</a>
                        <p className="str"></p>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default LinksInfo;