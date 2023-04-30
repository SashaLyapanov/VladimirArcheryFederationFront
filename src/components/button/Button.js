import './button.css'

const Button = ({parametr, functionClick}) => {
    return(
            <button type="button" className="button" onClick={functionClick}>{parametr}</button>
    )
}

export default Button;