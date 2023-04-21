import '../../style.css';

const NamePage = ({name}) => {
    return(
        <>
            <div className='calendar'>
                <div className='container container_for_page'>
                    <p className='fonts-roboto-black'>{name}</p>
                </div>
            </div>
        </>
    )
}

export default NamePage