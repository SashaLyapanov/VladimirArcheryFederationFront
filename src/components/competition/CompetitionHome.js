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
        // fetch('http://localhost:8080/api/v1/admin/competitions')
        fetch('http://localhost:3001/competitions')
          .then((res) => res.json())
          .then((result) => {
            setNews(result);
          });
      }, []);
      let i = 0
      function listCompetiton(competition){
        while (i < 3){
          i += 1
          return <Competition competition={competition}/>

        }
      }

    return(
        <div className='competitions'>
            <div className='container container_for_competition margin'>
                <p className='fonts-roboto-black title'>Ближайшие соревнования</p>
                <div className='list_competition'>
                  {competitions.map((competition) => (
                    listCompetiton(competition)
                  ))}
                </div>
                <a href='/competition' className='fonts-roboto-regular link'>Еще...</a>
            </div>
        </div>
    )
}

export default CompetitionHome