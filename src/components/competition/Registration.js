import Button from "../button/Button"
import { useNavigate } from "react-router";
import axios from '../../utils/axios'
import { useContext, useState, useEffect } from 'react'
import { CustomContext, CompetitionContext } from '../../utils/Context'

const Registration = () => {

    const {user, setUser} = useContext(CustomContext)
    const {competitions, setCompetition} = useContext(CompetitionContext)

    const navigate = useNavigate()

    const [typesBow, setTypesBow] = useState([])

    const [BowTypeList, setBowTypeList] = useState('')

    useEffect(() => {
        axios.get('general/allBowTypes')
        .then(({data}) => setTypesBow(data))
        }, []);

    const dataOfRegistrationCompetition = {
        "payment": false,
        "bowType": {
            "id": BowTypeList
        }
    }

    const onclick = () => {
        // console.log(competitions)
         axios.post(`sportsman/regInCompetition?sportsmanId=${user?.id}&competitionId=${competitions?.id}`, dataOfRegistrationCompetition)
         navigate('/competition/competitionId')    
    }

    return(
        <div className=" container_for_page registration">
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Имя</p>
                <input 
                    type='text' 
                    placeholder={user?.firstName}
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
                <p className='fonts-roboto-regular name_profile'>Типы луков</p>
                <select className='fonts-roboto-thin input_profile input_profile_edit'
                value={BowTypeList} 
                onChange={e => setBowTypeList(e.target.value)}
                >
                        <option value='' disabled selected hidden>Выберите типы луков</option>
                        {typesBow.map(title => (
                            <option value={title?.id}>{title?.bowTypeName}</option>
                        ))}
                    </select>
            </div>
            <Button parametr={'Зарегистрироваться'}
                    functionClick={onclick}/>
        </div>
    )
}

export default Registration