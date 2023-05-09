import del from '../../img/delete.png'
import '../sports/sports.css'

const SportsListAdmin = ({sports}) => {

    const sportsId = (e) => {
        e.preventDefault()
        console.log(e.target) 
    }

    return (
        <div className="container">
            {sports.map((sport) => (
                <div id={sport?.id} className="sports-trainer fonts-roboto-light" onClick={sportsId}>
                    <p id={sport?.id}>{sport?.name + ' ' + sport?.surname + ' ' + sport?.patronymic}</p>
                </div>
            ))}
        </div>
    )
}

export default SportsListAdmin