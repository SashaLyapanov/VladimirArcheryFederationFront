import Input from "./Input"
import Button from "../button/Button"

const DataProfile = ({parametr}) => {
    return(
        <div className="data-profile">
            {parametr.map(input => (
                <Input parametr={input}/>
            ))}
        </div>
    )
}

export default DataProfile