import '../sports/sports.css'

const ApplicationList = ({applications, user}) => {

    return (
        <div>
            {applications?.map((application) => (
                <div  className="sports-trainer fonts-roboto-light" id={application?.sportsman?.email}>
                    <p id='fio' className='left_item'>{application?.sportsman?.surname + ' ' + application?.sportsman?.firstName + ' ' + application?.sportsman?.patronymic}</p>
                    <p id='bowType' className='right_item'>{application?.bowType?.bowTypeName}</p>
                </div>
            ))}
        </div>
    )
}

export default ApplicationList