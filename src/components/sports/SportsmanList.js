import '../sports/sports.css'
import SportsmanInfo from "../../pages/sports/SportsmanInfo";

const SportsmanList = ({sportsmen}) => {

    console.log(sportsmen);

    return (
        <div className='competitions'>
            <div className='container container_for_competition'>
                <div className='list_items'>
                    {sportsmen?.map((sportsman) => (
                        <SportsmanInfo key={sportsman?.id} sportsman={sportsman}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SportsmanList;