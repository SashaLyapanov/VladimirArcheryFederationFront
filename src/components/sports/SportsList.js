import '../sports/sports.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import {CustomContext, SportContext} from '../../utils/Context'
import axios from '../../utils/axios'

const SportsList = ({sports}) => {

    const {sport, setSports} = useContext(SportContext)
    const navigate = useNavigate()

    const sportsId = (e) => {
        e.preventDefault()
        console.log(e.target.getAttribute("id"))
        axios.get(
            `admin/sportsman?email=${e.target.getAttribute("id")}`,
            
        ).then(({data}) => {
            setSports({
                ...data
            })
            localStorage.setItem('sport', JSON.stringify({
                ...data
            }))
        })
        navigate('/profileSportsTrainer')


    }

    const add = (e) => {
        e.preventDefault()
        if (e.target.innerHTML == '+'){
            e.target.innerHTML = '-'
        } else {
            e.target.innerHTML = '+'
        }
        
    }

    return (
        <div>
            {sports?.map((sport) => (
                <div  className="sports-trainer fonts-roboto-light" onClick={sportsId} id={sport?.email}>
                    <p id={sport?.email}>{sport?.firstName + ' ' + sport?.surname + ' ' + sport?.patronymic}</p>
                    <p id={sport?.email} className="add" onClick={add} type='button'>+</p>
                </div>
            ))}
        </div>
    )
}

export default SportsList