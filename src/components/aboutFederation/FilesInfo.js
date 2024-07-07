import {useEffect, useState} from "react";
import DownloadPDFButton from "../files/DownloadPDFButton";

const FilesInfo = ({props}) => {
    const [links, setLinks] = useState();
    useEffect(() => {
        setLinks(props);
    })

    return (
        <div className="info-block">
            <h1>Файлы:</h1>
            <div>
                {links?.fileNames.map((file) =>
                    <DownloadPDFButton fileName={file} preview={file}/>
                )}
            </div>
        </div>
    )
}

export default FilesInfo;