import Navbar from "../../../components/navbar/Navbar";
import {useFormik} from "formik";
import {useNavigate} from "react-router";
import * as Yup from 'yup';

const CreateArticle = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            body: '',
            file: null,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Поле обязательно для заполнения'),
            body: Yup.string()
                .required('Поле обязательно для заполнения'),
            file: Yup.mixed()
                .required('Фотография обязательная для заполнения')
                .test('fileFormat', 'Допустимые форматы: JPG, PNG', value => {
                    const str = value;
                    return value && (str.endsWith(".jpg") || str.endsWith(".jpeg") || str.endsWith(".png"));
                }),
        }),
        onSubmit: async values => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('body', values.body);
            formData.append('file', values.file);

            const requestOptions = {
                method: 'POST',
                body: formData
            };

            try {
                const response = await fetch('http://localhost:8080/api/v1/admin/createArticle', requestOptions)
                if (response.ok) {
                    const result = await response.json();
                    navigate(`/article/${result?.id}`);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Ошибка сети: ', error);
            }
        },
    })

    return (
        <div>
            <Navbar/>
            <div className={"page-content"}>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div>
                        <p className='header fonts-roboto-black'>Название</p>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className='input fonts-roboto-light'
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className='error-massage'>{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div>
                        <p className='header fonts-roboto-black'>Тело новости</p>
                        <textarea
                            id="body"
                            name="body"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.body}
                            className='input fonts-roboto-light'
                        />
                        {formik.touched.body && formik.errors.body ? (
                            <div className='error-massage'>{formik.errors.body}</div>
                        ) : null}
                    </div>

                    <div>
                        <p className='header fonts-roboto-black'>Фотография</p>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            onChange={formik.handleChange}
                            value={formik.values.file}
                            className='input_file'
                        />
                        {formik.touched.file && formik.errors.file ? (
                            <div className='error-massage'>{formik.errors.file}</div>
                        ): null}
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
    )
}

export default CreateArticle;