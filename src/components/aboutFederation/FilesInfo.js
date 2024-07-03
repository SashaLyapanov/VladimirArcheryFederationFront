import {useEffect, useState} from "react";

const FilesInfo = ({props}) => {
    const [links, setLinks] = useState();
    useEffect(() => {
        setLinks(props);
    })

    console.log(links);

    return (
        <div className="info-block">
            <h1>Файлы:</h1>
            {/*<DownloadPDFButton pdfBytes={links && links[0].fileHistoryData} fileName={"vladimirTeam.pdf"}/>*/}
            {/*<DownloadPDFButton pdfBytes={links && links[0].fileRegulationData} fileName={"polozhenie.pdf"}/>*/}
            {/*<p>{links && links[0].fileHistoryName}</p>*/}
        </div>
    )
}

export default FilesInfo;