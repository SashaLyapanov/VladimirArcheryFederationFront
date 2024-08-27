import {useFormik} from 'formik'
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

const EditAboutFederationForm = ({info}) => {

    const navigate = useNavigate();
    const [fileState, setFileState] = useState([]);

    const formik = useFormik({
        initialValues: {
            managers: info?.managers,
            links: info?.links.join(", "),
            contacts: info?.contacts,
            files: [],
        },
        onSubmit: async values => {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: '7fa1257a-332b-258d-bca6-ba78fa263e0f',
                    managers: values.managers,
                    contacts: values.contacts,
                    listLinks: values.links
                })
            };

            try {
                const response = await fetch('http://localhost:8080/api/v1/admin/changeAboutFederation', requestOptions)
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
        const fetchFileAboutFederation = async (link) => {
            try {
                let response;
                response = await fetch('http://localhost:8081/aboutFederation/download?fileName=' + link)
                if (response.ok) {
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    return objectURL;
                } else {
                    console.error('Ошибка при загрузке файла');
                }
            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };

        const fetchAllFiles = async () => {
            if (info?.fileNames) {
                const filePromises = info.fileNames.map(file => fetchFileAboutFederation(file));
                const fileUrls = await Promise.all(filePromises);
                setFileState(prevState => [...prevState, ...fileUrls.filter(url => url !== null)]);
            }
        }

        fetchAllFiles();
        formik.setFieldValue("files", fileState);
    }, [info])

    const handleRemoveFile = (fileToRemove) => {
        const updatedFiles = fileState.filter(file => file !== fileToRemove);
        setFileState(updatedFiles);
        formik.setFieldValue('files', updatedFiles);
    };

    console.log(fileState);

    return (
        <form onSubmit={formik.handleSubmit}>
            <p className='header fonts-roboto-black'>Управляющий состав</p>
            <input
                id="managers"
                name="managers"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.managers}
                className='input fonts-roboto-light'
            />

            <p className='header fonts-roboto-black'>Полезные ссылки (вводить ссылки через запятую с пробелом)</p>
            <input
                id="links"
                name="links"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.links}
                className='input fonts-roboto-light'
            />

            <p className='header fonts-roboto-black'>Контакты федерации</p>
            <input
                id="contacts"
                name="contacts"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.contacts}
                className='input fonts-roboto-light'
            />

            <p className='header fonts-roboto-black'>Файлы</p>
            {/*<ul>*/}
            {/*    {fileState.map((file, index) => (*/}
            {/*        <li key={index}>*/}
            {/*            <input*/}
            {/*                id="files"*/}
            {/*                name="files"*/}
            {/*                type="file"*/}
            {/*                multiple*/}
            {/*                onChange={formik.handleChange}*/}
            {/*                // value={formik.values.files}*/}
            {/*                value={file.name}*/}
            {/*            />*/}
            {/*            <button type="button" onClick={() => handleRemoveFile(file)}>Удалить</button>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
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

export default EditAboutFederationForm;