import arrow_left from '../../img/arrow_left.png'
import arrow_right from '../../img/arrow_right.png'
import React, { useState } from 'react'
import * as calendarDays from './Calendar'
import { useContext} from 'react'
import { DatesContext } from '../../utils/ContextDate'

const CalendarDiary = () => {

    const {dates, setDates} = useContext(DatesContext)
    console.log('date context', dates)

    const calendar = {
        "years": [2023, 2024, 2025],
        "month": [ "Январь", 
                    "Февраль", 
                    "Март", 
                    "Апрель", 
                    "Май", 
                    "Июнь", 
                    "Июль", 
                    "Август", 
                    "Сентябрь", 
                    "Октябрь", 
                    "Ноябрь",
                    "Декабрь",],
        "dayWeek": ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
    }

    const [nowDate, setNowDate] = useState(new Date())
    // localStorage. setItem('date', nowDate)
    let monthSelect = React.createRef()
    let yearSelect = React.createRef()

    const monthData = calendarDays.getMonthData(nowDate.getFullYear(), nowDate.getMonth())

    // const monthData = [
    //     // [now, now, now, now, now, now, now],
    //     [1, 2, 3, 4, 5, 6, 7],
    //     [21, 22, 23, 24, 25, 26, 67],
    //     [41, 42, 43, 44, 45, 46, 47],
    //     [51, 52, 53, 54, 55, 56, 57],
    //     [31, 32, 33, 27, 35, 36, 37]
    // ]

    const handleDayClick = (e) => {
        document.querySelector('.days').classList.remove('days')
        let date = new Date(nowDate.getFullYear(), nowDate.getMonth(), e.target.innerHTML)
        e.target.classList.add('days')
        setNowDate(date)
        setDates(date)
        console.log(dates)
        // localStorage. setItem('date', date)
    }

    const handlePrevMonthButtonClick = () => {
        document.querySelector('.days').classList.remove('days')
        let date = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1)
        setNowDate(date)
        setDates(date)
        console.log(dates)
        // localStorage. setItem('date', date)
    }

    const handleNextMonthButtonClick = () => {
        document.querySelector('.days').classList.remove('days')
        let date = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1)
        setNowDate(date)
        setDates(date)
        console.log(dates)
        // localStorage. setItem('date', date)
    }

    const handleSelectChange = () => {
        document.querySelector('.days').classList.remove('days')
        const year = yearSelect.value
        const month = monthSelect.value
        let date = new Date(year, month);
        console.log(date)
        setNowDate(date)
        setDates(date)
        console.log(dates)
        // localStorage. setItem('date', date)
    }

    const functionNowDate = (date) => {
        if ( date == nowDate.getDate()){
            return <td className="fonts-roboto-light days"
            onClick={handleDayClick}
            >{date}</td>
        } else {
            return <td className="fonts-roboto-light"
            onClick={handleDayClick}
            >{date}</td>
        }
    }

    return (
        <>
            <div className="calendar-diary">
                <div className="header-diary">
                    <button className='arrow-diary'
                            onClick={handlePrevMonthButtonClick}>
                        <img src={arrow_left} />
                        </button>
                    <select className="select-diary fonts-roboto-light"
                            onChange={handleSelectChange}
                            ref={element => monthSelect = element}
                            value={nowDate.getMonth()}>
                        {calendar.month.map((name, index) => 
                            <option key = {name} value={index}>{name}</option>
                        )}
                    </select>
                    <select className="select-diary fonts-roboto-light"
                            onChange={handleSelectChange}
                            ref={element => yearSelect = element}
                            value={nowDate.getFullYear()}>
                    {calendar.years.map((year) => 
                            <option key = {year} value={year}>{year}</option>
                        )}
                    </select>
                    <button className='arrow-diary'
                            onClick={handleNextMonthButtonClick}>
                        <img src={arrow_right} />
                        </button>
                </div>

                    <table>
                        <thead>
                            <tr>
                                {calendar.dayWeek.map(name => 
                                    <th key={name} className="fonts-roboto-light">{name}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                                {monthData.map((week, index) => 
                                <tr key={index}>
                                    {week.map((date, index) => date ?
                                    functionNowDate(date.getDate())
                                    :
                                    <td key={index} />
                                    )}
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

export default CalendarDiary