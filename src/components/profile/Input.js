const Input = ({parametr}) => {
    return(
        <div className="container-pole">
            <p className='fonts-roboto-regular name_profile'>{parametr.name}</p>
            <input type={parametr.type} placeholder={parametr.placeholder} className='fonts-roboto-thin input_profile'/>
        </div>
    )
}

export default Input