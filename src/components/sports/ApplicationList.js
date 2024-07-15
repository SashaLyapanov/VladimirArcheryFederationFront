import '../sports/sports.css'

const ApplicationList = ({applications}) => {

    return (
        <div>
            {applications?.map((application) => (
                <div  className="sports-trainer fonts-roboto-light" id={application?.sportsman?.email}>
                    <p id='fio'>{application?.sportsman?.firstName + ' ' + application?.sportsman?.surname + ' ' + application?.sportsman?.patronymic}</p>
                    <p id='bowType'>{application?.bowType?.bowTypeName}</p>
                </div>
            ))}
        </div>
    )
}

export default ApplicationList