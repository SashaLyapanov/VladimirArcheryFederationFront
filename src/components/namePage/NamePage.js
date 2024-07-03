import '../../style.css';

const NamePage = ({name}) => {
    return (
        <div className='container_for_page'>
            <p className='header fonts-roboto-black'>{name}</p>
        </div>
    )
}

export default NamePage