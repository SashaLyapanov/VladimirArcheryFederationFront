import del from '../../img/delete.png'
import '../sports/sports.css'
import { useNavigate } from 'react-router'

const SportsListAdmin = ({sports}) => {

    const navigate = useNavigate()

    const sportsId = (e) => {
        e.preventDefault()
        console.log(e.target)
        navigate('/profile') 
    }

    // const sportsId = (e) => { 
    //     e.preventDefault() 
    //     console.log(e.target.getAttribute("id")) 
    //     axios.get( 
    //         '/api/v1/admin/sportsman', 
    //         { 
    //             params: { 
    //                 email: e.target.getAttribute("id") 
    //             } 
    //         } 
    //     ).then((res) => 
    //     console.log(res))
           
 
 
    // } 
 
    // return ( 
    //     <div className="container"> 
    //         {sports.map((sport) => ( 
    //             <div id={sport?.email} className="sports-trainer fonts-roboto-light" onClick={sportsId}> 
    //                 <p id={sport?.email}>{sport?.firstName + ' ' + sport?.patronymic + ' ' + sport?.surname}</p> 
    //             </div> 
    //         ))} 
    //     </div> 
    // )

    return (
        <div>
            {sports.map((sport) => (
                <div id={sport?.id} className="sports-trainer fonts-roboto-light" onClick={sportsId}>
                    <p id={sport?.id}>{sport?.name + ' ' + sport?.surname + ' ' + sport?.patronymic}</p>
                </div>
            ))}
        </div>
    )
}

export default SportsListAdmin