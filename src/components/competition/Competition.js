import '../competition/style.css'
import {useNavigate} from 'react-router'
import {formatDateLocal} from "../../utils/date-utils";

const Competition = ({competition}) => {

    const navigate = useNavigate()

    const onClickCompetition = (competition) => {
        navigate(`/competition/${competition?.id}`)
    }
    return (
        // <>
        //     {/*Блок для ноутов и компов*/}
        //     <div className='competition-desktop' id={competition?.date} onClick={() => onClickCompetition(competition)}>
        //         <div className='title_container'>
        //             <p className='title_competition fonts-roboto-regular'>{competition?.name}</p>
        //             <p className='place_competition fonts-roboto-regular'>{competition?.place}</p>
        //         </div>
        //         <div className='desktop'>
        //             <div>
        //                 <p className='inf_competition fonts-roboto-regular'>{"Спортивная дисциплина:"}
        //                     <br/> {competition?.type.name}</p>
        //             </div>
        //             <div>
        //                 <p className='inf_competition fonts-roboto-regular'>{"Дата начала:"}
        //                     <br/> {formatDateLocal(competition?.date)}</p>
        //             </div>
        //             <div>
        //                 <p className='inf_competition fonts-roboto-regular'>{"Дата окончания:"}
        //                     <br/> {formatDateLocal(competition?.endDate)}</p>
        //             </div>
        //         </div>
        //     </div>
        //     {/*Блок для мобильных телефонов*/}
        //
        //     <div className='competition-mobile' id={competition?.date} onClick={() => onClickCompetition(competition)}>
        //         <div className='title_container'>
        //             <p className='title_competition fonts-roboto-regular'>{competition?.name}</p>
        //         </div>
        //         <div className='mobile_version'>
        //             <div className='inf_competition'>
        //                 <p className='inf_competition_subtitle fonts-roboto-regular'>{"Место проведения: "}</p>
        //                 <p className='fonts-roboto-regular'>{competition?.place}</p>
        //             </div>
        //             <div className='inf_competition'>
        //                 <p className='inf_competition_subtitle fonts-roboto-regular'>{"Спортивная дисциплина:"}</p>
        //                 <p className='fonts-roboto-regular'>{competition?.type.name}</p>
        //             </div>
        //             <div className='inf_competition'>
        //                 <p className='inf_competition_subtitle fonts-roboto-regular'>{"Даты проведения:"}</p>
        //                 <p className='fonts-roboto-regular'>{formatDateLocal(competition?.date)} - {formatDateLocal(competition?.endDate)}</p>
        //             </div>
        //         </div>
        //     </div>
        // </>


        <>
            {/*Блок для ноутов и компов*/}
            {/*<div className='competition-desktop' id={competition?.date} onClick={() => onClickCompetition(competition)}>*/}
            {/*    <div className='title_container'>*/}
            {/*        <p className='title_competition fonts-roboto-regular'>{competition?.name}</p>*/}
            {/*        <p className='place_competition fonts-roboto-regular'>{competition?.place}</p>*/}
            {/*    </div>*/}
            {/*    <div className='desktop'>*/}
            {/*        <div>*/}
            {/*            <p className='inf_competition fonts-roboto-regular'>{"Спортивная дисциплина:"}*/}
            {/*                <br/> {competition?.type.name}</p>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <p className='inf_competition fonts-roboto-regular'>{"Дата начала:"}*/}
            {/*                <br/> {formatDateLocal(competition?.date)}</p>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <p className='inf_competition fonts-roboto-regular'>{"Дата окончания:"}*/}
            {/*                <br/> {formatDateLocal(competition?.endDate)}</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*Блок для мобильных телефонов*/}

            <div className='competition' id={competition?.date} onClick={() => onClickCompetition(competition)}>
                <div className='title_container'>
                    <p className='title_competition fonts-roboto-regular'>{competition?.name}</p>
                </div>
                <div className='info_container'>
                    <div className='inf_competition'>
                        <p className='inf_competition_subtitle fonts-roboto-regular'>{"Место проведения: "}</p>
                        <p className='inf_competition_text fonts-roboto-regular'>{competition?.place}</p>
                    </div>
                    <div className='inf_competition'>
                        <p className='inf_competition_subtitle fonts-roboto-regular'>{"Спортивная дисциплина:"}</p>
                        <p className='inf_competition_text fonts-roboto-regular'>{competition?.type.name}</p>
                    </div>
                    <div className='inf_competition'>
                        <p className='inf_competition_subtitle fonts-roboto-regular'>{"Даты проведения:"}</p>
                        <p className='inf_competition_text fonts-roboto-regular'>{formatDateLocal(competition?.date)} - {formatDateLocal(competition?.endDate)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Competition;