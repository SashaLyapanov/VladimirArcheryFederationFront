import Button from "../button/Button"
import {useNavigate, useParams} from "react-router";
import axios from '../../utils/axios'
import {useContext, useState, useEffect} from 'react'
import {CustomContext} from '../../utils/Context'

const Registration = (competitionId) => {

    let compId = useParams();
    const {user, setUser} = useContext(CustomContext)
    const [competition, setCompetition] = useState('');

    const navigate = useNavigate()

    const [BowTypeId, setBowTypeId] = useState('')

    useEffect(() => {
        axios.get('general/competition?id=' + compId?.competitionId)
            .then(({data}) => setCompetition(data));
    }, []);

    const dataOfRegistrationCompetition = {
        "bowType": {
            "id": BowTypeId
        }
    }

    const onclick = () => {
        axios.post(`sportsman/regInCompetition?sportsmanId=${user?.id}&competitionId=${compId?.competitionId}`, dataOfRegistrationCompetition)
            .then(((resp) => {
                if (resp.data) {
                    console.log(1);
                    alert(resp.data);
                }
            }))
            .catch((resp) => {
                console.log(2);
                alert(resp.response.data);
            })
        // navigate(`/competition/${compId?.competitionId}`)
    }

    return (
        <div className=" container_for_page registration">
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Название соревнования</p>
                <input
                    type='text'
                    placeholder={competition?.name}
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Фамилия</p>
                <input
                    type='text'
                    placeholder={user?.surname}
                    className='fonts-roboto-thin input_profile input_profile_edit'
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Имя</p>
                <input
                    type='text'
                    placeholder={user?.name}
                    className='fonts-roboto-thin input_profile input_profile_edit'
                    disabled
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Отчество</p>
                <input
                    type='text'
                    placeholder={user?.patronymic}
                    className='fonts-roboto-thin input_profile input_profile_edit'
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Email</p>
                <input
                    type='text'
                    placeholder={user?.email}
                    className='fonts-roboto-thin input_profile input_profile_edit'
                />
            </div>
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Класс лука</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                        value={BowTypeId}
                        onChange={e => setBowTypeId(e.target.value)}
                >
                    <option value='' disabled selected hidden>Выберите класс лука</option>
                    {competition?.bowTypeList?.map(title => (
                        <option key={title?.id} value={title?.id}>{title?.bowTypeName}</option>
                    ))}
                </select>
            </div>
            <Button parametr={'Зарегистрироваться'}
                    functionClick={onclick}/>
        </div>
    )
}

export default Registration