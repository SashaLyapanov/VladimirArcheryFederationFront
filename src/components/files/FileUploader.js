import {useEffect, useState} from "react";

const FileUploader = ({ files, onFilesChange, onDeleteFile}) => {

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

    // //Обработчик добавления файлов
    // const handleAddFiles = (event) => {
    //     const newFiles = Array.from(event.target.files); //Получаем файлы из input
    //     const updatedFiles = [...localFiles, ...newFiles]; //Добавляем новые файлы к текущему списку
    //     setLocalFiles(updatedFiles);
    //     // onFilesChange(updatedFiles); //Передаем обновленный список в родительский компонент
    // };

    return(
        <div className="file-uploader">
            <p className="header">Файлы</p>

            {/*<input type="file" multiple onChange={handleAddFiles} className="file-input" />*/}

            {dragFile
                ?   <div
                        className='drop-area'
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                        onDrop={e => onDropHandler(e)}
                >Отпустите файлы, чтобы загрузить их</div>
                :   <div
                        className='drop-area-ready'
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                >Перетащите файлы для загрузки</div>
            }
            <div className="file-list">
                {localFiles.map((file, index) => (
                    <div key={index} className="file-item">
                        <span>
                            {file.name || file}
                        </span>
                        <button type='button' onClick={() => onDeleteFile(file)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default FileUploader;