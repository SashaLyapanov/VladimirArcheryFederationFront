import './button.css'

const Button = ({parametr, functionClick, className, id}) => {
    return(
            <button type="button" 
                className={className ? className : "button"} 
                onClick={functionClick}
                id={id}>
            {parametr}</button>
    )
}

export default Button;