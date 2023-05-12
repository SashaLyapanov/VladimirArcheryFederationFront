import React, {useState, useEffect} from "react";
import Button from "../button/Button"
import SportsList from "../sports/SportsList";

const RegistrationGroup = () => {

    const [sports, setSports] = useState();
    
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

    return(
        <div className=" container_for_page registration">
            
                <p className='fonts-roboto-regular name_profile'>Выберите участников</p>
                <SportsList sports={sports}/>
            
            <Button parametr={'Зарегистрироваться'}
                    functionClick={onclick}/>
        </div>
    )
}

export default RegistrationGroup