import './modalStyles.css'
import {apiServiceAxios} from "../../utils/axios";
import {useContext} from "react";
import {CustomContext} from "../../utils/Context";
import {useNavigate} from "react-router";

const ModalRegInCompetition = ({closeModal, compId, values}) => {

    const {user} = useContext(CustomContext);
    const navigate = useNavigate();

    const confirmRegistration = async () => {
        const dataOfRegistrationCompetition = {
            bowType: {
                id: values.bowType
            }
        }

        apiServiceAxios.post(`sportsman/regInCompetition?sportsmanId=${user?.userData?.id}&competitionId=${compId}`, dataOfRegistrationCompetition, {}, true)
            .then(((resp) => {
                if (resp.data) {
                    navigate(`/competition/${compId}`);
                    window.location.reload();
                    alert(resp.data);
                }
            }))
            .catch((resp) => {
                navigate(`/competition/${compId}`);
                window.location.reload();
                alert(resp.response.data);
            })
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