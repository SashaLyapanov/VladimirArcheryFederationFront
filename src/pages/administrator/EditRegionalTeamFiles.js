import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import Navbar from "../../components/navbar/Navbar";
import NamePage from "../../components/namePage/NamePage";
import {apiService} from "../../utils/ApiService";
import {apiServiceFileManager} from "../../utils/ApiServiceFileManager";

const EditRegionalTeamFiles = () => {

    const [regionalTeamFiles, setRegionalTeamFiles] = useState();
    const navigate = useNavigate();
    // const {user} = useContext(CustomContext);
    const [fileState, setFileState] = useState([]);
    const [dragFile, setDragFile] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/general/regionalTeamFiles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result) {
                    setRegionalTeamFiles(result);
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

            fileState.forEach(file => {
                const fileObject = new File([file.blob], file.originalName, {
                    type: file.blob.type
                });
                formData.append('files', fileObject);
            })

            // const requestOptions = {
            //     method: 'POST',
            //     headers: {'Authorization': 'Bearer ' + user?.accessToken},
            //     body: formData
            // };

            try {
                // const response = await fetch('http://localhost:8080/api/v1/admin/addFilesToRegionalFederation', requestOptions)
                const response = await apiService.post('/admin/addFilesToRegionalFederation', formData, true);
                if (response) {
                    navigate(`/regionalTeam`);
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
            if (regionalTeamFiles) {
                const filePromises = regionalTeamFiles?.map(file => fetchFileForCompetition(file));
                const fileUrls = await Promise.all(filePromises);
                setFileState(prevState => [...prevState, ...fileUrls.filter(url => url !== null)]);
            }
        }
        fetchAllFiles();
    }, [regionalTeamFiles]);

    useEffect(() => {
        formik.setFieldValue("files", fileState);
    }, [fileState]);

    const fetchFileForCompetition = async (fileName) => {
        try {
            let response;
            response = await apiServiceFileManager.get('/regionalTeam/download?fileName=' + fileName);
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

    const handleRemoveFile = (fileNameToRemove) => {
        const updatedFiles = fileState.filter(file => file !== fileNameToRemove);
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
                <NamePage name={`Добавление файлов в блок "Справочная информация"`}/>

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

export default EditRegionalTeamFiles;