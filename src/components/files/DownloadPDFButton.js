import pdf from '../../img/pdf.png'
import {useEffect, useState} from "react";

const DownloadPDFButton = ({fileName, preview, source}) => {

    const [fileState, setFileState] = useState();

    useEffect(() => {
        const fetchFileAboutFederation = async (link) => {
            try {
                let response;
                if (source === 'aboutFederation') {
                    response = await fetch('http://localhost:8081/aboutFederation/download?fileName=' + link)
                }
                if (source === 'activityFederation') {
                    console.log(link);
                    response = await fetch('http://localhost:8081/activityFederation/download?fileName=' + link)
                }
                if (source === 'regionalTeam') {
                    response = await fetch('http://localhost:8081/regionalTeam/download?fileName=' + link)
                }
                if (response.ok) {
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    setFileState(objectURL);
                } else {
                    console.error('Ошибка при загрузке файла');
                }
            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };
        fetchFileAboutFederation(fileName);
    }, [fileName])

    const downloadPDF = () => {
        if (fileState) {
            const downloadLink = document.createElement('a');
            downloadLink.href = fileState;
            downloadLink.download = fileName;
            downloadLink.click();
        } else {
            console.log('Файл не найден')
        }
    };

    return (
        <div className="file-block flex_in_studio">
            <img src={pdf} onClick={downloadPDF} className="pdf-img" alt="PDF"/>
            <p style={{margin: "18px 0 0 10px"}}>{preview}</p>
        </div>
    )
}

export default DownloadPDFButton;