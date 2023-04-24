import './authorization.css'
import '../../fonts/roboto/fonts.css'
import Button from '../button/Button'

const Authorization = ({parametrs}) => {
    return(
        <div className='authorization'>
            <div className='popup'>
                <p className='header fonts-roboto-black'>{parametrs.name}</p>

                    {parametrs.input.map(parametr => (
                        <input type={parametr.type} className='input fonts-roboto-light' placeholder={parametr.name}/>
                    ))}
                
                <div className='form-button'>
                    <Button parametr={parametrs.button}/>
                    <p className='fonts-roboto-regular clue'>{parametrs.text} <a href='@' className='link'>{parametrs.link[0]}</a></p>
                    <p className='fonts-roboto-regular clue'><a href='@' className='link'>{parametrs.link[1]}</a></p>
                </div>
            </div>
        </div>
    )
}


export default Authorization;