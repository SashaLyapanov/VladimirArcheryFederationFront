import {useNavigate} from "react-router";
import {useFormik} from "formik";
import {apiService} from "../../../utils/ApiService";

const EditArticleForm = ({info}) => {

    const navigate = useNavigate();

    console.log(info);

    const formik = useFormik({
        initialValues: {
            name: info?.name,
            body: info?.body,
            link: info?.link,
        },
        onSubmit: async values => {
            const requestOptions = {
                body: {
                    id: info?.id,
                    name: values.name,
                    body: values.body,
                    link: values.link,
                }
            };

            try {
                const response = await apiService.put('/admin/changeArticle', requestOptions.body)
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
                className='input fonts-roboto-light info-body'
            />

            <p className='header fonts-roboto-black'>Тело новости</p>
            <textarea
                id="body"
                name="body"
                onChange={formik.handleChange}
                value={formik.values.body}
                className='input fonts-roboto-light info-body'
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