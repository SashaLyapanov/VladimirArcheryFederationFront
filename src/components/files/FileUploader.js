import {useEffect, useState} from "react";

const FileUploader = ({files, onDeleteFile}) => {

    const [dragFile, setDragFile] = useState(false);
    const [localFiles, setLocalFiles] = useState([]);

    useEffect(() => {
        if (files && files.length > 0) {
            setLocalFiles(files);
        }
    })

    function dragStartHandler(e) {
        e.preventDefault();
        setDragFile(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        setDragFile(false);
    }

    function onDropHandler(e) {
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        console.log(files);
    }

    return (
        <div className="file-uploader">
            <p className="header">Файлы</p>

            {<div
                className='drop-area'
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => onDropHandler(e)}
            >
                Отпустите файлы, чтобы загрузить их
            </div>
            }
            <div className="file-list">
                {localFiles.length > 0 && localFiles?.map((file, index) => (
                    <div key={index} className="file-item">
                        <span className="file-name">
                            {file?.originalName || file}
                        </span>
                        <button type='button' onClick={() => onDeleteFile(file?.originalName)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default FileUploader;