import {useFormik} from "formik";
import * as Yup from 'yup';

const UploadImg = (({closeModal, userId}) => {

    const formik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema: Yup.object({
            file: Yup.mixed()
                .required('Фотография обязательна для заполнения')
        }),
        onSubmit: async values => {
            const formData = new FormData();
            formData.append('file', values.file);

            const requestOptions = {
                method: 'POST',
                body: formData
            };

            try {
                const response = await fetch(`http://localhost:8080/api/v1/personalAccount/uploadImage?sportsmanId=${userId}`, requestOptions);
                if (response.ok) {
                    window.location.reload();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                alert("Произошла ошибка при загрузке изображения, попробуйте позже или обратитесь в службу поддержки.");
            }
        }
    })

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="titleCloseBtn">
                        <button onClick={() => closeModal(false)}> X</button>
                    </div>
                    <div className="modalTitle">
                        <h2>Изменение аватарки</h2>
                    </div>
                    <div className="modalBody">
                        <p>Выберите нужную фотографию в формате PNG или JPG/JPEG</p>
                    </div>
                    <div className="modalFooter">
                        <input
                            id="file"
                            name="file"
                            type="file"
                            onChange={(e) => {
                                formik.setFieldValue("file", e.currentTarget.files[0]);
                            }}
                            className='input_file'
                        />
                        {formik.touched.file && formik.errors.file ? (
                            <div className='error-massage'>{formik.errors.file}</div>
                        ) : null}
                    </div>
                    <div className="modalFooter">
                        <button onClick={() => closeModal(false)}>Отмена</button>
                        <button type='submit'>Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    )
})

export default UploadImg;