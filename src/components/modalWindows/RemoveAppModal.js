import {useContext} from "react";
import {CustomContext} from "../../utils/Context";
import axios from "../../utils/axios";

const RemoveAppModal = ({ competitionId, closeModal}) => {
    const {user, setUser} = useContext(CustomContext);

    const removeApplication = () => {
        axios.post(`sportsman/deleteApplication?sportsmanId=${user?.id}&competitionId=${competitionId?.competitionId}`)
            .then(((resp) => {
                if (resp.data) {
                    alert(resp.data);
                }
            }))
            .catch((resp) => {
                alert(resp.response.data);
            })
        window.location.reload();
    }

    console.log(competitionId);
    console.log(user);
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}> X</button>
                </div>
                <div className="modalTitle">
                    <h2>Подтверждение отмены регистрации</h2>
                </div>
                <div className="modalBody">
                    <p>Вы уверены, что хотите отменить регистрацию на данные соревнования?</p>
                </div>
                <div className="modalFooter">
                    <button onClick={() => closeModal(false)}>Отмена</button>
                    <button onClick={() => removeApplication()}>Подтвердить отмену регистрации</button>
                </div>
            </div>
        </div>
    )
}

export default RemoveAppModal;