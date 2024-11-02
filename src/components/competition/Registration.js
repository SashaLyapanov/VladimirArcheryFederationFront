import Button from "../button/Button"
import {useNavigate, useParams} from "react-router";
import axios from '../../utils/axios'
import {useContext, useState, useEffect} from 'react'
import {CustomContext} from '../../utils/Context'
import {useFormik} from "formik";
import * as Yup from "yup";
import ModalRegInCompetition from "../modalWindows/ModalRegInCompetition";

const Registration = (competitionId) => {

    let compId = useParams();
    const {user, setUser} = useContext(CustomContext);
    const [competition, setCompetition] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        compId &&
        axios.get('general/competition?id=' + compId?.competitionId)
            .then(({data}) => setCompetition(data));
    }, []);

    const formik = useFormik({
        initialValues: {
            competitionName: competition?.name,
            surname: user?.surname,
            name: user?.name,
            patronymic: user?.patronymic,
            email: user?.email,
            bowType: '',
        },
        validationSchema: Yup.object({
            bowType: Yup.string()
                .required('Поле обязательно для заполнения'),
        }),
        onSubmit: async value => {


            setOpenModal(true);


        }
    })

    return (
        <div className=" container_for_page registration">
            {openModal && <ModalRegInCompetition closeModal={setOpenModal} compId={compId?.competitionId} values={formik.values} />}
            <form className='form' onSubmit={formik.handleSubmit}>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_profile'>Название соревнования</p>
                    <input
                        id='competitionName'
                        name='competitionName'
                        type='text'
                        placeholder={competition?.name}
                        className='fonts-roboto-thin input_profile input_profile_edit'
                        value={formik.values.competitionName}
                        onChange={formik.handleChange}
                        disabled
                    />
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_profile'>Фамилия</p>
                    <input
                        id='surname'
                        name='surname'
                        type='text'
                        placeholder={user?.surname}
                        className='fonts-roboto-thin input_profile input_profile_edit'
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        disabled
                    />
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_profile'>Имя</p>
                    <input
                        id='name'
                        name='name'
                        type='text'
                        placeholder={user?.name}
                        className='fonts-roboto-thin input_profile input_profile_edit'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        disabled
                    />
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_profile'>Отчество</p>
                    <input
                        id='patronymic'
                        name='patronymic'
                        type='text'
                        placeholder={user?.patronymic}
                        className='fonts-roboto-thin input_profile input_profile_edit'
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        disabled
                    />
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_profile'>Email</p>
                    <input
                        id='email'
                        name='email'
                        type='text'
                        placeholder={user?.email}
                        className='fonts-roboto-thin input_profile input_profile_edit'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        disabled
                    />
                </div>
                <div className="container-pole">
                    <p className='fonts-roboto-regular name_profile'>Класс лука</p>
                    <select
                        id='bowType'
                        name='bowType'
                        className='fonts-roboto-thin input_profile input_profile_edit'
                        value={formik.values.bowType}
                        onChange={formik.handleChange}
                    >
                        <option value=''>Выберите класс лука</option>
                        {competition?.bowTypeList?.map(type => (
                            <option key={type?.id} value={type?.id}>{type?.bowTypeName}</option>
                        ))}
                    </select>
                    {formik.touched.bowType && formik.errors.bowType ? (
                        <div className='error-massage'>{formik.errors.bowType}</div>
                    ) : null}
                </div>
                <div className='form-button'>
                    <Button
                        parametr={'Зарегистрироваться'}
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    )
}

export default Registration