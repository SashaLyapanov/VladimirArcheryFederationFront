import Search from '../components/search/search'
import NamePage from '../components/namePage/NamePage'
import '../style.css';
import ListCompetition from '../components/competition/ListCompetition'

const Calendar = () => {
    const nameInput = [
        {
            name: 'Название',
            placeholder: 'Введите название',
            type: 'text'
        },
        {
            name: 'Дата проведения',
            placeholder: 'Выберите дату',
            type: 'date'
        }
    ]

    return(
        <>
            <NamePage name={'Календарь'}/>
            <Search nameInput={nameInput}/>
            <ListCompetition/>
        </>
    )
}

export default Calendar