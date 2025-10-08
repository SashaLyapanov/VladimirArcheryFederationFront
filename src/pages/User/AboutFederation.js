import Navbar from "../../components/navbar/Navbar";
import picture1 from "./../../img/aboutFederation/aboutF1.jpg";
import picture2 from "./../../img/aboutFederation/aboutF2.jpg";
import picture3 from "./../../img/aboutFederation/aboutF3.jpg";
import picture4 from "./../../img/aboutFederation/aboutF4.jpg";
import picture5 from "./../../img/aboutFederation/aboutF5.jpg";
import picture6 from "./../../img/aboutFederation/aboutF6.jpg";
import {useEffect, useState, useContext} from "react";
import {apiServiceAxios} from "../../utils/axios";
import NamePage from "../../components/namePage/NamePage";
import ManagersInfo from "../../components/aboutFederation/ManagersInfo";
import LinksInfo from "../../components/aboutFederation/LinksInfo";
import ContactsInfo from "../../components/aboutFederation/ContactsInfo";
import FilesInfo from "../../components/aboutFederation/FilesInfo";
import DemoPictures from "./DemoPictures";
import {CustomContext} from "../../utils/Context";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router";

const AboutFederation = () => {
    const {user, setUser} = useContext(CustomContext)
    const [aboutFederation, setAboutFederation] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        apiServiceAxios.get("/general/getAboutFederation", {}, false)
            .then(resp => {
                setAboutFederation(resp.data);
            })
            .catch(e => {
                    console.log(e);
                }
            )
    }, [])

    function checkAdminRole(role) {
        return role === "ADMIN";
    }

    const editInfo = () => {
        navigate('/editAboutFederationInfo');
    }

    const editFiles = () => {
        navigate('/editAboutFederationFiles');
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="page-content">
                    <div className="line-block flex_in_studio">
                        <div id="info_block_left">
                            {checkAdminRole(user?.userData?.role) &&
                                <div>
                                    <Button parametr={"Редактировать информацию"} className='button editButton'
                                            functionClick={editInfo}/>
                                    <Button parametr={"Редактировать файлы"} className='button editButton'
                                            functionClick={editFiles}/>
                                </div>}
                            <div className="max-width">
                                <NamePage name={"О федерации"}/>
                                <ManagersInfo props={aboutFederation && aboutFederation.managers}/>
                                <LinksInfo props={aboutFederation}/>
                                <ContactsInfo props={aboutFederation && aboutFederation.contacts}/>
                                <FilesInfo props={aboutFederation}/>
                            </div>
                        </div>
                        <div id="picture_block_right">
                            <DemoPictures picture1={picture3} picture2={picture4}/>
                            <DemoPictures picture1={picture1} picture2={picture2}/>
                            <DemoPictures picture1={picture5} picture2={picture6}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutFederation;