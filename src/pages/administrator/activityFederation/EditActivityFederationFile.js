import {useFormik} from 'formik'
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {apiService} from "../../../utils/ApiService";

const EditActivityFederation = ({flag, filesAboutFederation}) => {

    const navigate = useNavigate();
    const [fileState, setFileState] = useState([]);
    const [dragFile, setDragFile] = useState(false);

    const formik = useFormik({
        initialValues: {
            files: [],
        },
        onSubmit: async values => {
            const formData = new FormData();
            if (flag === "General") {
                formData.append('flag', "General");
            } else if (flag === "3D") {
                formData.append('flag', "3D");
            } else if (flag === "Classic") {
                formData.append('flag', "Classic");
            } else if (flag === "Biathlon") {
                formData.append('flag', "Biathlon");
            }

            fileState.forEach(file => {
                const fileObject = new File([file.blob], file.originalName, {
                    type: file.blob.type
                });
                formData.append('files', fileObject);
            })

            try {
                const response = await apiService.post('/admin/changeFilesActivityFederation', formData, true);
                if (response) {
                    navigate('/activityFederation');
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Ошибка сети: ', error);
            }
        },
    });

    useEffect(() => {
        const fetchAllFiles = async () => {
            if (filesAboutFederation) {
                const filePromises = filesAboutFederation.map(file => fetchFileAboutFederation(file));
                const fileUrls = await Promise.all(filePromises);
                setFileState(prevState => [...prevState, ...fileUrls.filter(url => url !== null)]);
            }
        }

        fetchAllFiles();
    }, [filesAboutFederation]);

    useEffect(() => {
        formik.setFieldValue("files", fileState);
    }, [fileState]);

    const fetchFileAboutFederation = async (fileName) => {
        try {
            let response;
            if (flag === "General") {
                response = await fetch('http://localhost:8081/activityFederation/download?flag=General&fileName=' + fileName)
            } else if (flag === "3D") {
                response = await fetch('http://localhost:8081/activityFederation/download?flag=3D&fileName=' + fileName)
            } else if (flag === "Classic") {
                response = await fetch('http://localhost:8081/activityFederation/download?flag=Classic&fileName=' + fileName)
            } else if (flag === "Biathlon") {
                response = await fetch('http://localhost:8081/activityFederation/download?flag=Biathlon&fileName=' + fileName)
            }

            if (response.ok) {
                const blob = await response.blob();
                const objectURL = URL.createObjectURL(blob);
                return {
                    originalName: fileName,
                    blobUrl: objectURL,
                    blob: blob
                };
            } else {
                console.error('Ошибка при загрузке файла');
                return null;
            }
        } catch (error) {
            console.error('Произошла ошибка', error);
            return null;
        }
    };

    // if (fileState && fileState.length > 0) {
    //     console.log(fileState)
    // }

    const handleRemoveFile = (fileNameToRemove) => {
        const updatedFiles = fileState.filter(file => file !== fileNameToRemove);
        console.log(updatedFiles);
        setFileState(updatedFiles);
        formik.setFieldValue('files', updatedFiles);
        URL.revokeObjectURL(fileNameToRemove.blobUrl);
    };

    function dragStartHandler(e) {
        e.preventDefault();
        setDragFile(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        setDragFile(false);
    }

    function dragOverHandler(e) {
        e.preventDefault();
        setDragFile(true);
    }

    function onDropHandler(e) {
        e.preventDefault();
        setDragFile(false);
        const droppedFiles = [...e.dataTransfer.files];

        const newFiles = droppedFiles.map(file => ({
            originalName: file.name,
            blob: file,
            blobUrl: URL.createObjectURL(file) //URL для предпросмотра
        }));

        setFileState(prevState => [...prevState, ...newFiles]);
    }

    return (
        <form onSubmit={formik.handleSubmit}>

            <div className="file-uploader">
                <p className="header">Файлы</p>

                {<div
                    className={dragFile ? 'drop-area-hover' : 'drop-area'}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragOverHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    Отпустите файлы, чтобы загрузить их
                </div>
                }
                <div className="file-list">
                    {fileState?.length > 0 && fileState?.map((file, index) => (
                        <div key={index} className="file-item">
                        <span className="file-name">
                            {file?.originalName}
                        </span>
                            <button type='button' onClick={() => handleRemoveFile(file)}>Удалить</button>
                        </div>
                    ))}
                </div>
            </div>

            <br/>
            <br/>

            <button
                className='button'
                type="submit">
                Отправить
            </button>
        </form>
    )
}

export default EditActivityFederation;