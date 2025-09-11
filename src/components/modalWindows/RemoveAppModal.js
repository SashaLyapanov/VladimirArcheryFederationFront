import {useContext} from "react";
import {CustomContext} from "../../utils/Context";
import {apiServiceAxios} from "../../utils/axios";

const RemoveAppModal = ({ competitionId, closeModal}) => {
    const {user, setUser} = useContext(CustomContext);

    const removeApplication = () => {
        if (!user?.accessToken) {
            alert("Войдите заново в систему и повторите запрос.");
            return;
        }
        apiServiceAxios.post(`sportsman/deleteApplication?sportsmanId=${user?.userData?.id}&competitionId=${competitionId?.competitionId}`,
            null, {}, true)
            .catch((resp) => {
                alert(resp.response.data);
            })
        window.location.reload();
    }

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