import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import Navbar from "../../../components/navbar/Navbar";
import NamePage from "../../../components/namePage/NamePage";
import {useFormik} from "formik";
import {apiService} from "../../../utils/ApiService";

const AddProtocols = () => {

    const competitionId = useParams();
    const [competition, setCompetition] = useState();
    const navigate = useNavigate();
    const [fileState, setFileState] = useState([]);
    const [dragFile, setDragFile] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/general/competition?id=' + competitionId?.competitionId);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result) {
                    setCompetition(result);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            files: [],
        },
        onSubmit: async values => {
            const formData = new FormData();

            // formData.append('competitionId', competitionId?.competitionId);

            fileState.forEach(file => {
                const fileObject = new File([file.blob], file.originalName, {
                    type: file.blob.type
                });
                formData.append('files', fileObject);
            })

            try {
                const response = await apiService.post('/admin/addFilesToCompetition?competitionId=' + competitionId?.competitionId, formData, true);
                if (response) {
                    navigate(`/competition/${competitionId?.competitionId}`);
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
            if (competition && competition?.files) {
                const filePromises = competition?.files.map(file => fetchFileForCompetition(file));
                const fileUrls = await Promise.all(filePromises);
                setFileState(prevState => [...prevState, ...fileUrls.filter(url => url !== null)]);
            }
        }
        fetchAllFiles();
    }, [competition]);

    useEffect(() => {
        formik.setFieldValue("files", fileState);
    }, [fileState]);

    const fetchFileForCompetition = async (fileName) => {
        try {
            let response;
            response = await fetch('http://localhost:8081/competition/download?competitionId=' + competitionId?.competitionId + '&fileName=' + fileName)
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
        <div>
            <Navbar/>
            <div className={'page-content'}>
                <NamePage name={`Добавление файлов для соревнования "${competition?.name}"`}/>

                <div>
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
                </div>


            </div>
        </div>
    )


}

export default AddProtocols;