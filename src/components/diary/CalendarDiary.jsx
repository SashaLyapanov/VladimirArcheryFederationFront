

const CalendarDiary = () => {

    const calendar = {
        "years": [2023, 2024, 2025],
        "month": [ "Январь", 
                    "Февраль", 
                    "Март", 
                    "Апрель", 
                    "Май", 
                    "Апрель", 
                    "Май", 
                    "Июнь", 
                    "Июль", 
                    "Август", 
                    "Сентябрь", 
                    "Октябрь", 
                    "Ноябрь",
                    "Декабрь",],
        "dayWeek": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    }

    return (
        <>
            <div className="calendar">
                <header>
                    <button>{'<'}</button>
                    <select>
                        {calendar.month.map((name, index) => 
                            <option key = {name} value={index}>{name}</option>
                        )}
                    </select>
                    <select>
                    {calendar.years.map((year) => 
                            <option key = {year} value={year}>{year}</option>
                        )}
                    </select>
                    <button>{'>'}</button>
                </header>

                    <table>
                        <thead>
                            <tr>
                                {calendar.dayWeek.map(name => 
                                    <th key={name}>{name}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </>
        )
    }

export default CalendarDiary