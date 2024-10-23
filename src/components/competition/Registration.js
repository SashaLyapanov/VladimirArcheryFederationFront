import Button from "../button/Button"
import {useNavigate, useParams} from "react-router";
import axios from '../../utils/axios'
import {useContext, useState, useEffect} from 'react'
import {CustomContext} from '../../utils/Context'
import {useFormik} from "formik";
import * as Yup from "yup";

const Registration = (competitionId) => {

    let compId = useParams();
    const {user, setUser} = useContext(CustomContext)
    const [competition, setCompetition] = useState('');

    const navigate = useNavigate()

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
            console.log("Тип лука");
            console.log(value.bowType);
            const dataOfRegistrationCompetition = {
                "bowType": {
                    "id": value.bowType
                }
            }

            axios.post(`sportsman/regInCompetition?sportsmanId=${user?.id}&competitionId=${compId?.competitionId}`, dataOfRegistrationCompetition)
                .then(((resp) => {
                    if (resp.data) {
                        alert(resp.data);
                    }
                }))
                .catch((resp) => {
                    alert(resp.response.data);
                })
            // navigate(`/competition/${compId?.competitionId}`)
        }
    })

    return (
        <div className=" container_for_page registration">
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