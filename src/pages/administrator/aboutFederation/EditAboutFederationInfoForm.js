import {useFormik} from 'formik';
import {useNavigate} from "react-router";
import {apiService} from "../../../utils/ApiService";

const EditAboutFederationInfoForm = ({infoAboutFederation}) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            managers: infoAboutFederation?.managers,
            links: infoAboutFederation?.links.join(", "),
            contacts: infoAboutFederation?.contacts,
        },
        onSubmit: async values => {
            const requestOptions = {
                body: {
                    id: '7fa1257a-332b-258d-bca6-ba78fa263e0f',
                    managers: values.managers,
                    contacts: values.contacts,
                    listLinks: values.links,
                }
            };

            try {
                const response = await apiService.put('/admin/changeAboutFederation', requestOptions.body);
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