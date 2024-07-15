import Button from "../button/Button"
import '../profile/profile.css'
import React, {useState} from 'react';
import axios from "../../utils/axios";
import { useNavigate } from "react-router";

const AddCompetition = () => {

    const navigate = useNavigate()

    const [Name, setName] = useState('')
    const [Place, setPlace] = useState('')
    const [Date, setDate] = useState('')
    const [Type, setType] = useState('')
    const [Categories, setCategories] = useState('')
    const [BowType, setBowType] = useState('')
    const [MainJudge, setMainJudge] = useState('')
    const [Secretary, setSecretary] = useState('')
    const [ZamJudge, setZamJudge] = useState('')
    const [Judges, setJudges] = useState('')

    const newCompetition = {
        'name': Name,
        'place': Place,
        'type': {
            'id': Type
        },
        'categories': [
        {
            'id': Categories
        }
        ],
        'bowTypeList': [
        {
            'id': BowType
        }
        ],
        'mainJudge': MainJudge,
        'secretary': Secretary,
        'zamJudge': ZamJudge,
        'judges': Judges,
        'date': Date,
    }

    

    const onClick = () => {
        console.log(newCompetition)
        axios.post('admin/createCompetition', newCompetition)
        .then(() => 
        navigate('/competition'))
    }

    return(
        <form className="container">
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Название соревнования</p>
                <input 
                    type='text' 
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите название"
                    value={Name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Место проведения</p>
                <input 
                    type='text' 
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите место проведения"
                    value={Place}
                    onChange={e => setPlace(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Дата проведения</p>
                <input
                    type='date'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Выберите дату проведения"
                    value={Date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Тип соревнования</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={Type}
                onChange={e => setType(e.target.value)}
                >
                        <option value='' disabled selected hidden>Выберите тип соревнований</option>
                        <option value='1'>3D</option>
                        <option value='2'>Target archery</option>
                    </select>
            </div>
            
            {/*<div className="container-pole">*/}
            {/*    <p className='fonts-roboto-regular name_profile'>Категория</p>*/}
            {/*    <select className='fonts-roboto-thin input_profile input_profile_edit'*/}
            {/*    value={Categories} */}
            {/*    onChange={e => setCategories(e.target.value)}*/}
            {/*    >*/}
            {/*            <option value='' disabled selected hidden>Выберите категорию соревнований</option>*/}
            {/*            <option value='1'>Мужчины 14+</option>*/}
            {/*            <option value='2'>Женщины 14+</option>*/}
            {/*            <option value='3'>Мальчики до 14 лет</option>*/}
            {/*            <option value='4'>Девочки 14 лет</option>*/}
            {/*            <option value='5'>Юноши до 18 лет</option>*/}
            {/*            <option value='6'>Девушки до 18 лет</option>*/}
            {/*            <option value='7'>Юниоры до 21 года</option>*/}
            {/*            <option value='8'>Юниорки до 21 года</option>*/}
            {/*            <option value='9'>Мужчины</option>*/}
            {/*            <option value='10'>Женщины</option>*/}
            {/*        </select>*/}
            {/*</div>*/}
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Спортивная дисциплина (класс лука)</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={BowType} 
                onChange={e => setBowType(e.target.value)}
                >
                        <option value='' disabled selected hidden>Выберите класс лука</option>
                        <option value='1'>Длинный лук</option>
                        <option value='2'>Блочный лук</option>
                        <option value='3'>Монгольский лук</option>
                        <option value='3'>Составной лук</option>
                    </select>
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Судья</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите ФИО главного судьи"
                    value={MainJudge}
                    onChange={e => setMainJudge(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Секретарь</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите ФИО главного секретаря"
                    value={Secretary}
                    onChange={e => setSecretary(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Заместитель судьи</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите ФИО заместителя главного судьи"
                    value={ZamJudge}
                    onChange={e => setZamJudge(e.target.value)}
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Судьи</p>
                <input
                    type='text'
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    placeholder="Введите ФИО судей через запятую"
                    value={Judges}
                    onChange={e => setJudges(e.target.value)}
                />
            </div>
            
            <Button parametr={'Добавить'} 
                    functionClick={onClick}
                    type={'button'}
                    />
            
        </form>
    )
}

export default AddCompetition