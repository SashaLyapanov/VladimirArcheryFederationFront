import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css';
import './style.css';
import Competition from './Competition.js';

const ListCompetition = ({parametr}) => {

      


    return(
        <div className='competitions'>
            <div className='container container_for_competition'>
                <div className='marker fonts-roboto-thin'>
                  <p className='title_container_maker fonts-roboto-light'>Название</p>
                  <p className='fonts-roboto-light'>Тип лука</p>
                  <p className='fonts-roboto-light'>Категория</p>
                  <p className='fonts-roboto-light'>Дата</p>
                </div>
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