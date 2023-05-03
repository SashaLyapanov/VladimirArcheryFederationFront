import Button from '../button/Button'

const CompetitionIdTrainer = () => {

    const onclick = () => {
        window.location.assign('http://localhost:3000/competition/competitionId/registration');
      }
    
      const onclickGroup = () => {
        window.location.assign('http://localhost:3000/competition/competitionId/registrationGroup');
      }

    return (
        <div className='competitions'>
            <div className='container margin-competition'>
                <p className="fonts-roboto-black name-competition">Название соревнования</p>
                <p className="inf-competition fonts-roboto-light">Дата:</p>
                <p className="inf-competition fonts-roboto-light">Тип лука:</p>
                <p className="inf-competition fonts-roboto-light">Категория:</p>
                <p className="content-competition fonts-roboto-light">Описание</p>
                <Button parametr='Зарегистрироваться' 
                        functionClick={onclick}/>
                <Button parametr='Зарегистрировать группу' 
                        functionClick={onclickGroup}/>
            </div>

            
        </div>

    )
}

export default CompetitionIdTrainer