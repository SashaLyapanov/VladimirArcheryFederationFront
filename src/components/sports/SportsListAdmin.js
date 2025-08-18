import '../sports/sports.css'
import axios from "../../utils/axios";
import {useContext} from 'react'
import {SportContext} from '../../utils/Context'
import {useNavigate} from 'react-router'

const SportsListAdmin = ({sports, user}) => {

    const {sport, setSports} = useContext(SportContext)
    const navigate = useNavigate()

    const sportsId = (e) => {
        e.preventDefault()
        axios.get(
            'admin/sportsmanByEmail',
            {
                params: {
                    email: e.target.getAttribute("id")
                },
                headers: {
                    'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user?.accessToken
                }
            }
        ).then(({data}) => {
            setSports({
                ...data
            })
            localStorage.setItem('sport', JSON.stringify({
                ...data
            }))
        })
        navigate('/profile');
    }

    return (
        <div>
            {sports.map((sport) => (
                <div id={sport?.email} className="sports-trainer fonts-roboto-light" onClick={sportsId}>
                    <p id={sport?.email}>{sport?.firstName + ' ' + sport?.patronymic + ' ' + sport?.surname}</p>
                </div>
            ))}
        </div>
    )
}

export default SportsListAdmin