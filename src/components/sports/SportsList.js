import '../sports/sports.css'

const SportsList = ({sports}) => {

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
                <div  className="sports-trainer fonts-roboto-light">
                <p>{sport?.name + ' ' + sport?.surname + ' ' + sport?.patronymic}</p>
                <p id={sport?.id} className="add" onClick={add} type='button'>+</p>
            </div>
            ))}
        </div>
    )
}

export default SportsList