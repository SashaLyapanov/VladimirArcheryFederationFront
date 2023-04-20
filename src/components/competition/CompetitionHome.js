import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import '../../style.css';
import '../../fonts/roboto/fonts.css';
import './style.css';
import Competition from './Competition.js';

const CompetitionHome = () => {

        const [competitions, setNews] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:3001/competitions')
          .then((res) => res.json())
          .then((result) => {
            setNews(result);
          });
      }, []);


    return(
        <div className='competitions'>
            <div className='container container_for_competition'>
                <p className='fonts-roboto-black title'>Ближайшие соревнования</p>
                <div className='list_competition'>
                  {competitions.map((competition) => (
                    <Competition competition={competition}/>
                  ))}
                </div>
                <a href='@' className='fonts-roboto-regular'>Еще...</a>
            </div>
        </div>
    )
}

export default CompetitionHome