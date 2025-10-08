import pdf from '../../img/pdf.png'
import {useEffect, useState} from "react";
import {apiServiceFileManager} from "../../utils/ApiServiceFileManager";

const DownloadPDFButton = ({fileName, preview, source, competitionId}) => {

    const [fileState, setFileState] = useState();

    // // NEW: детектор iOS (включая iPadOS на MacIntel с тачем)
    // const isIOS = () =>
    //     /iP(ad|hone|od)/.test(navigator.userAgent) ||
    //     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    //
    // // NEW: утилита построения URL (тот же, что вы дергаете через get)
    // const buildUrl = (link) => {
    //     const f = encodeURIComponent(link);
    //     if (source === 'aboutFederation') return `/aboutFederation/download?fileName=${f}`;
    //     if (source === 'activityFederationGeneral') return `/activityFederation/download?flag=General&fileName=${f}`;
    //     if (source === 'activityFederation3D') return `/activityFederation/download?flag=3D&fileName=${f}`;
    //     if (source === 'activityFederationClassic') return `/activityFederation/download?flag=Classic&fileName=${f}`;
    //     if (source === 'activityFederationBiathlon') return `/activityFederation/download?flag=Biathlon&fileName=${f}`;
    //     if (source === 'competition') return `/competition/download?competitionId=${encodeURIComponent(competitionId)}&fileName=${f}`;
    //     if (source === 'regionalTeam') return `/regionalTeam/download?fileName=${f}`;
    //     return '#';
    // };

    useEffect(() => {
        const fetchFileAboutFederation = async (link) => {
            try {
                // // NEW: на iOS не делаем fetch->blob. Просто используем прямой URL
                // if (isIOS()) {
                //     setFileState(buildUrl(link));
                //     return;
                // }

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
        // if (!fileState) {
        //     console.log('Файл не найден')
        //     return;
        // }
        //
        // // NEW: на iOS — обычная навигация на прямой URL
        // if (isIOS()) {
        //     window.location.href = buildUrl(fileName);
        //     return;
        // }
        //
        // // ваш вариант загрузки через <a download>
        // const downloadLink = document.createElement('a');
        // downloadLink.href = fileState;
        // downloadLink.download = fileName;
        //
        // // небольшой буст совместимости — добавляем в DOM
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // downloadLink.remove();

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
            <p style={{margin: "0 0 15px 10px"}}>{preview}</p>
        </div>
    )
}

export default DownloadPDFButton;