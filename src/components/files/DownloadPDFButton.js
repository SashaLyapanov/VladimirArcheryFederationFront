import pdf from '../../img/pdf.png'
import {useEffect, useState} from "react";
import {apiServiceFileManager} from "../../utils/ApiServiceFileManager";

const DownloadPDFButton = ({fileName, preview, source, competitionId}) => {

    const [fileState, setFileState] = useState();

    useEffect(() => {
        const fetchFileAboutFederation = async (link) => {
            try {
                let response;
                if (source === 'aboutFederation') {
                    response = await apiServiceFileManager.get('/aboutFederation/download?fileName=' + link)
                }
                if (source === 'activityFederationGeneral') {
                    response = await apiServiceFileManager.get('/activityFederation/download?flag=General&fileName=' + link);
                }
                if (source === 'activityFederation3D') {
                    response = await apiServiceFileManager.get('/activityFederation/download?flag=3D&fileName=' + link);
                }
                if (source === 'activityFederationClassic') {
                    response = await apiServiceFileManager.get('/activityFederation/download?flag=Classic&fileName=' + link);
                }
                if (source === 'activityFederationBiathlon') {
                    response = await apiServiceFileManager.get('/activityFederation/download?flag=Biathlon&fileName=' + link);
                }
                if (source === 'competition') {
                    response = await apiServiceFileManager.get('/competition/download?competitionId=' + competitionId + '&fileName=' + link);
                }
                if (source === 'regionalTeam') {
                    response = await apiServiceFileManager.get('/regionalTeam/download?fileName=' + link);
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