import {useEffect, useState} from "react";
import DownloadPDFButton from "../files/DownloadPDFButton";

const Files = ({props}) => {
    const [links, setLinks] = useState();
    useEffect(() => {
        setLinks(props);
    }, [props])

    useEffect(() => {
    }, [links])

    return (
        <div className="info-block">
            <h2 className='fonts-roboto-black content-competition-label'>Файлы:</h2>
            <div>
                {links?.files?.map((file) =>
                    <DownloadPDFButton fileName={file} preview={file} source='competition' competitionId={links?.id}/>
                )}
            </div>
        </div>
    )
}

export default Files;