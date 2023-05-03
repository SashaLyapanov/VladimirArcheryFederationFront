import './button.css'

const Button = ({parametr, functionClick, className, id, type}) => {
    return(
            <button type={type} 
                className={className ? className : "button"} 
                onClick={functionClick}
                id={id}>
            {parametr}</button>
    )
}

export default Button;