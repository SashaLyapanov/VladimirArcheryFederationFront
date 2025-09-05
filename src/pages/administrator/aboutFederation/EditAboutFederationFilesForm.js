import {useFormik} from 'formik'
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import FileUploader from "../../../components/files/FileUploader";
import {CustomContext} from "../../../utils/Context";

const EditAboutFederationInfoForm = ({filesAboutFederation}) => {

    const navigate = useNavigate();
    const {user} = useContext(CustomContext);
    const [fileState, setFileState] = useState([]);
    const [dragFile, setDragFile] = useState(false);

    const formik = useFormik({
        initialValues: {
            files: [],
        },
        onSubmit: async values => {
            const formData = new FormData();

            fileState.forEach(file => {
                const fileObject = new File([file.blob], file.originalName, {
                    type: file.blob.type
                });
                formData.append('files', fileObject);
            })

            const requestOptions = {
                method: 'POST',
                headers: {'Authorization': 'Bearer ' + user?.accessToken},
                body: formData
            };

            try {
                const response = await fetch('http://localhost:8080/api/v1/admin/changeFilesAboutFederation', requestOptions)
                if (response) {
                    navigate('/aboutFederation');
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
            response = await fetch('http://localhost:8081/aboutFederation/download?fileName=' + fileName)
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

    if (fileState && fileState.length > 0) {
        console.log(fileState)
    }

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

export default EditAboutFederationInfoForm;