import DownloadPDFButton from "../files/DownloadPDFButton";


const FilesList = (filesList) => {

    return(
        <div>
            {filesList && filesList?.filesList.map((fileName) =>
                <DownloadPDFButton fileName={fileName} preview={fileName} source='regionalTeam'/>
            )}
        </div>
    );
}

export default FilesList;