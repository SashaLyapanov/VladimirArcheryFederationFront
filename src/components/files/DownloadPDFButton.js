import pdf from '../../img/pdf.png'
import {useEffect, useState} from "react";

const DownloadPDFButton = ({fileName, preview}) => {

    const [fileState, setFileState] = useState();

    useEffect(() => {
        const fetchFileAboutFederation = async (link) => {
            try {
                const response = await fetch('http://localhost:8081/aboutFederation/download?fileName=' + link)
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
            downloadLink.download = 'filename.pdf';
            downloadLink.click();
        } else {
            console.log('Файл не найден')
        }
    };

    return (
        <div className="file-block">
            <img src={pdf} onClick={downloadPDF} className="pdf-img" alt="PDF"/>
            <p>{preview}</p>
        </div>
    )
}

export default DownloadPDFButton;