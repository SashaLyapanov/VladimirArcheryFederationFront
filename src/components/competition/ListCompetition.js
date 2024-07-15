import React from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css';
import './style.css';
import Competition from './Competition.js';

const ListCompetition = ({parametr}) => {

    return (
        <div className='competitions'>
            <div className='container_for_competition'>
                <div className='list_items'>
                    {parametr.map((competition) => (
                        <Competition key={competition?.id} competition={competition}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListCompetition