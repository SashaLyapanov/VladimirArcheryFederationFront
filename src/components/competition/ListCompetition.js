import React from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css';
import './style.css';
import Competition from './Competition.js';

const ListCompetition = ({parametr}) => {

    return(
        <div className='competitions'>
            <div className='container container_for_competition'>
                {/*<div className='marker fonts-roboto-thin'>*/}
                  {/*<div className='inf_competition title_container_maker fonts-roboto-light'>Название</div>*/}
                  {/*<div className='inf_competition fonts-roboto-light'>Категория соревнований</div>*/}
                  {/*<div className='inf_competition fonts-roboto-light'>Дата начала</div>*/}
                  {/*<div className='inf_competition fonts-roboto-light'>Дата окончания</div>*/}
                {/*</div>*/}
                <div className='list_competition'>
                  
                  {parametr.map((competition) => (
                    <Competition competition={competition}/>
                  ))}
                </div>
            </div>
        </div>
    )
}

export default ListCompetition