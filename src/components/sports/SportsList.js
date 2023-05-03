const SportsList = ({sport}) => {

    const add = () => {
            }

    return (
        <div  className="sports-trainer fonts-roboto-light">
            <p>{sport?.name + ' ' + sport?.surname + ' ' + sport?.patronymic}</p>
            <p id={sport?.id} className="add" >+</p>
        </div>
    )
}

export default SportsList