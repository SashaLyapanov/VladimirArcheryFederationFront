import './modalStyles.css'
import axios from "../../utils/axios";
import {useContext} from "react";
import {CustomContext} from "../../utils/Context";
import {useNavigate} from "react-router";

const ModalRegInCompetition = ({closeModal, compId, values}) => {

    const {user, setUser} = useContext(CustomContext);
    const navigate = useNavigate();

    const confirmRegistration = () => {
        const dataOfRegistrationCompetition = {
            "bowType": {
                "id": values.bowType
            }
        }

        axios.post(`sportsman/regInCompetition?sportsmanId=${user?.id}&competitionId=${compId}`, dataOfRegistrationCompetition)
            .then(((resp) => {
                if (resp.data) {
                    alert(resp.data);
                }
            }))
            .catch((resp) => {
                alert(resp.response.data);
            })
        navigate(`/competition/${compId}`)
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}> X</button>
                </div>
                <div className="modalTitle">
                    <h2>Подтверждение регистрации</h2>
                </div>
                <div className="modalBody">
                    <p>Вы уверены, что хотите зарегистрироваться на данные соревнования?</p>
                </div>
                <div className="modalFooter">
                    <button onClick={() => closeModal(false)}>Отмена</button>
                    <button onClick={() => confirmRegistration()}>Подтвердить регистрацию</button>
                </div>
            </div>
        </div>
    )
}

export default ModalRegInCompetition;