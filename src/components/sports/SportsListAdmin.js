import del from '../../img/delete.png'

const SportsListAdmin = ({sports}) => {

    const add = (e) => {
        e.preventDefault()
        
        
    }

    return (
        <div className="container">
            {sports.map((sport) => (
                <div  className="sports-trainer fonts-roboto-light">
                <p>{sport?.name + ' ' + sport?.surname + ' ' + sport?.patronymic}</p>
                <p id={sport?.id} className="add" onClick={add} type='button'>
                    <img src={del} className='delete'/>
                </p>
            </div>
            ))}
        </div>
    )
}

export default SportsListAdmin