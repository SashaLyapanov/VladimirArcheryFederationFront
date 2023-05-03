import React, {useState, useEffect} from "react";
import Button from "../button/Button"
import SportsList from "../sports/SportsList";

const RegistrationTrainer = () => {

    const [sports, setSports] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:3001/sports')
          .then((res) => res.json())
          .then((result) => {
            setSports(result);
          });
      }, []);

    const onclick = () => {
        window.location.assign('http://localhost:3000/competition/competitionId');
      }
      
      
    

    // const adds = document.querySelectorAll('.add');
    //  console.log(adds)   
    // adds.forEach(add => {
    //     add.addEventListener('click', () => answer(add.getAttribute('id')));
    // })

    // function answer(id){
    //     if(document.getElementById(id).innerHTML === '+'){
    //         document.getElementById(id).innerHTML = '-'
    //     } 
    // }


    

    return(
        <div className=" container_for_page registration">
            <div className="container-pole">
                <p className='fonts-roboto-regular name_profile'>Выберите участников</p>
                {sports.map(sport => (
                    <SportsList sport={sport}/>
                ))}
                
            </div>
            <Button parametr={'Зарегистрироваться'}
                    functionClick={onclick}/>
        </div>
    )
}

export default RegistrationTrainer