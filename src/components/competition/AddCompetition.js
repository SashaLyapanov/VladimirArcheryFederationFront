import Button from "../button/Button"
import '../profile/profile.css'
import React, {useEffect, useState} from 'react';
import axios from "../../utils/axios";
import {useNavigate} from "react-router";
import {useFormik} from "formik";
import * as Yup from "yup";

const AddCompetition = () => {

    const navigate = useNavigate()

    const [competitionTypes, setCompetitionTypes] = useState([]);
    const [bowTypeList, setBowTypeList] = useState([]);

    useEffect(() => {
        const fetchCompetitionTypes = async () => {
            try {
                await fetch('http://localhost:8080/api/v1/general/allCompetitionTypes')
                    .then((res) => res.json())
                    .then((response) => {
                        setCompetitionTypes(response);
                    })
            } catch (e) {
                console.error(e);
            }
        };
        const fetchBowTypes = async () => {
            try {
                await fetch('http://localhost:8080/api/v1/general/allBowTypes')
                    .then((res) => res.json())
                    .then((response) => {
                        setBowTypeList(response);
                    })
            } catch (e) {
                console.error(e);
            }
        }
        fetchCompetitionTypes();
        fetchBowTypes();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            place: '',
            type: '',
            categories: '',
            bowTypeList: [],
            mainJudge: '',
            secretary: '',
            zamJudge: '',
            judges: '',
            date: '',
            endDate: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Поле обязательно для заполнения'),
            place: Yup.string()
                .required('Поле обязательно для заполнения'),
            type: Yup.string()
                .required('Поле обязательно для заполнения'),
            // bowTypeList: Yup.string()
            //     .required('Поле обязательно для заполнения'),
            bowTypeList: Yup.array().min(1, "Необходимо указать минимум 1 класс"),
            mainJudge: Yup.string()
                .required('Поле обязательно для заполнения'),
            secretary: Yup.string()
                .required('Поле обязательно для заполнения'),
            date: Yup.string()
                .required('Поле обязательно для заполнения'),
            endDate: Yup.string()
                .required('Поле обязательно для заполнения')
        }),
        onSubmit: async values => {
            const newCompetition = {
                'name': values.name,
                'place': values.place,
                'type': {
                    'id': values.type,
                },
                // 'bowTypeList': [
                //     {
                //         'id': values.bowTypeList,
                //     }
                // ],
                'bowTypeList': values.bowTypeList.map(id => ({id})),
                'mainJudge': values.mainJudge,
                'secretary': values.secretary,
                'zamJudge': values.zamJudge,
                'judges': values.judges,
                'date': values.date,
                'endDate': values.endDate,
            }
            console.log(newCompetition)
            console.log(values.bowTypeList)
            axios.post('admin/createCompetition', newCompetition)
                .then((data) => {
                    console.log(data);
                    navigate('/competition')
                })
        }
    })

    const handleBowTypeChange = (event) => {
        const { options } = event.target;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        formik.setFieldValue('bowTypeList', selectedValues); // Установка выбранных значений
    };

    return (
        <form className="container" onSubmit={formik.handleSubmit}>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Название соревнования</p>
                <input
                    id='name'
                    name='name'
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите название"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
            </div>
            {formik.touched.name && formik.errors.name ? (
                <div className='error-massage'>{formik.errors.name}</div>
            ) : null}

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Место проведения</p>
                <input
                    id='place'
                    name='place'
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите место проведения"
                    value={formik.values.place}
                    onChange={formik.handleChange}
                />
            </div>
            {formik.touched.place && formik.errors.place ? (
                <div className='error-massage'>{formik.errors.place}</div>
            ) : null}

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Дата начала соревнования</p>
                <input
                    id='date'
                    name='date'
                    type='date'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите дату начала соревнования"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                />
            </div>
            {formik.touched.date && formik.errors.date ? (
                <div className='error-massage'>{formik.errors.date}</div>
            ) : null}

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Дата окончания соревнования</p>
                <input
                    id='endDate'
                    name='endDate'
                    type='date'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите дату окончания соревнования"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                />
            </div>
            {formik.touched.endDate && formik.errors.endDate ? (
                <div className='error-massage'>{formik.errors.endDate}</div>
            ) : null}

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Тип соревнования</p>
                <select
                    id='type'
                    name='type'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    value={formik.values.type}
                    onChange={formik.handleChange}
                >
                    <option value='' disabled selected hidden>Выберите тип соревнований</option>
                    {competitionTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            </div>
            {formik.touched.type && formik.errors.type ? (
                <div className='error-massage'>{formik.errors.type}</div>
            ) : null}

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Спортивная дисциплина (класс лука)</p>
                <select
                    id='bowTypeList'
                    name='bowTypeList'
                    className='fonts-roboto-thin input_profile multiple_select_field'
                    multiple
                    value={formik.values.bowTypeList}
                    onChange={handleBowTypeChange}
                >
                    <option value='' disabled selected hidden>Выберите класс лука</option>
                    {bowTypeList.map(bowType => (
                        <option key={bowType.id} value={bowType.id}>{bowType.bowTypeName}</option>
                    ))}
                </select>
            </div>
            {formik.touched.bowTypeList && formik.errors.bowTypeList ? (
                <div className='error-massage'>{formik.errors.bowTypeList}</div>
            ) : null}

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Судья</p>
                <input
                    id='mainJudge'
                    name='mainJudge'
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите ФИО главного судьи"
                    value={formik.values.mainJudge}
                    onChange={formik.handleChange}
                />
            </div>
            {formik.touched.mainJudge && formik.errors.mainJudge ? (
                <div className='error-massage'>{formik.errors.mainJudge}</div>
            ) : null}

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Секретарь</p>
                <input
                    id='secretary'
                    name='secretary'
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите ФИО главного секретаря"
                    value={formik.values.secretary}
                    onChange={formik.handleChange}
                />
            </div>
            {formik.touched.secretary && formik.errors.secretary ? (
                <div className='error-massage'>{formik.errors.secretary}</div>
            ) : null}

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Заместитель судьи</p>
                <input
                    id='zamJudge'
                    name='zamJudge'
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите ФИО заместителя главного судьи"
                    value={formik.values.zamJudge}
                    onChange={formik.handleChange}
                />
            </div>

            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Судьи</p>
                <input
                    id='judges'
                    name='judges'
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите ФИО судей через запятую"
                    value={formik.values.judges}
                    onChange={formik.handleChange}
                />
            </div>

            <Button parametr={'Добавить'}
                    type={'submit'}
            />

        </form>
    )
}

export default AddCompetition