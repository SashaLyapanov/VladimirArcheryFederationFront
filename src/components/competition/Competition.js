import '../competition/style.css'

const Competition = ({competition}) => {
    return(
        <>
         <div className='competition'>
            <div className='title_container'>
                <a href='@' className='title_competition fonts-roboto-black'>{competition?.title}</a>
                <p className='inf_competition fonts-roboto-regular'>{competition?.place}</p>
            </div>
            <div>
                <p className='inf_competition fonts-roboto-regular'>{competition?.category}</p>
            </div>
            <div>
                <p className='inf_competition fonts-roboto-regular sports'>{competition?.sports}</p>
            </div>
            <div>
                <p className='inf_competition fonts-roboto-regular'>{competition?.date}</p>
            </div>
         </div>
        </>
    )
}

export default Competition;