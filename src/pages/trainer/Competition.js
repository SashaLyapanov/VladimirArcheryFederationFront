import React, {useState} from 'react';
import {useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'

import '../../style.css';
import CompetitionIdTrainer from '../../components/competition/CompetitionIdTrainer';

const Competition = () => {


    return(
        <>
            <Navbar/>
            <CompetitionIdTrainer />
        </>
    )
}

export default Competition