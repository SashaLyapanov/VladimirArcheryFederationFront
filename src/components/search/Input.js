const Input = ({parametr}) => {
    return(
        <div className="container-pole">
            <p className='fonts-roboto-regular name_search'>{parametr.name}</p>
            <input type={parametr.type} placeholder={parametr.placeholder} className='fonts-roboto-thin input_search'/>
        </div>
    )
}

export default Input