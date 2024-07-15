import React, {useState} from 'react';
import {useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import NamePage from '../../components/namePage/NamePage'
import '../../style.css';
import ListCompetition from '../../components/competition/ListCompetition'
import axios from '../../utils/axios';
import { useContext } from 'react'
import { CustomContext } from '../../utils/Context'


const MyCompetition = () => {

  

  const [competitions, setCompetitions] = useState([]);
  const {user, setUser} = useContext(CustomContext)  


  useEffect(() => {
    if(user.id){
      axios.get(`sportsman/allMyApplication?myId=${user?.id}`)
        .then(({data}) => {
          let competition = []
            data.map((application) => (
              competition.push(application?.competition)
            ))
            setCompetitions(competition);
        });
        
    }
    
    }, [user]);

    return(
        <div className="page-content">
            <Navbar/>
            <NamePage name={"Мои соревнования"}/>
            <ListCompetition parametr={competitions}/>
        </div>
    )
}

export default MyCompetition