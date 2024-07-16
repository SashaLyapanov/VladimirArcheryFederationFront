import DownloadPDFButton from "../files/DownloadPDFButton";


const FilesList = ({filesList, source}) => {

    return(
        <div>
            {filesList && filesList.map((fileName) =>
                <DownloadPDFButton fileName={fileName} preview={fileName} source={source}/>
            )}
        </div>
    );
}

export default FilesList;