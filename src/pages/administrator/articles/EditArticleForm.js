import {useNavigate} from "react-router";
import {useState} from "react";
import {useFormik} from "formik";

const EditArticleForm = ({info}) => {

    const navigate = useNavigate();
    const [fileState, setFileState] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: info?.name,
            body: info?.body,
            link: info?.link,
        },
        onSubmit: async values => {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: info?.id,
                    name: values.name,
                    body: values.body,
                    link: values.link,
                })
            };

            try {
                const response = await fetch('http://localhost:8080/api/v1/admin/changeArticle', requestOptions)
                if (response) {
                    navigate(`/article/${info?.id}`);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Ошибка сети: ', error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <p className='header fonts-roboto-black'>Название</p>
            <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className='input fonts-roboto-light'
            />

            <p className='header fonts-roboto-black'>Тело новости</p>
            <input
                id="body"
                name="body"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.body}
                className='input fonts-roboto-light'
            />

            {/*ФОТКУ РЕДАКТИРОВАТЬ НАДО!!!!*/}
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

export default EditArticleForm;