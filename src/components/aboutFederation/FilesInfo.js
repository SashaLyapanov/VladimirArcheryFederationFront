import {useEffect, useState} from "react";
import DownloadPDFButton from "../files/DownloadPDFButton";

const FilesInfo = ({props}) => {
    const [links, setLinks] = useState();
    useEffect(() => {
        setLinks(props);
    })

    return (
        <div className="info-block">
            <h1 className='fonts-roboto-black'>Файлы:</h1>
            <div className='info-body'>
                {links?.fileNames?.map((file) =>
                    <DownloadPDFButton fileName={file} preview={file} source='aboutFederation'/>
                )}
            </div>
        </div>
    )
}

export default FilesInfo;