import Navbar from "../../components/navbar/Navbar";
import picture1 from "./../../img/aboutFederation/picture1.jpg";
import picture2 from "./../../img/aboutFederation/picture2.jpg";
import picture3 from "./../../img/aboutFederation/picture3.jpg";
import picture4 from "./../../img/aboutFederation/picture4.jpg";
import {useEffect, useState} from "react";
import axios from "../../utils/axios";
import NamePage from "../../components/namePage/NamePage";
import ManagersInfo from "../../components/aboutFederation/ManagersInfo";
import LinksInfo from "../../components/aboutFederation/LinksInfo";
import ContactsInfo from "../../components/aboutFederation/ContactsInfo";
import FilesInfo from "../../components/aboutFederation/FilesInfo";
import DemoPictures from "./DemoPictures";

const AboutFederation = () => {

    const [aboutFederation, setAboutFederation] = useState();

    useEffect(() => {
        axios.get("/general/getAboutFederation")
            .then(resp => {
                setAboutFederation(resp.data);
            })
            .catch(e => {
                    console.log(e);
                }
            )
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="page-content">
                <div className="line-block flex_in_studio">
                    <div id="info_block_left">
                        <NamePage name={"О федерации"}/>
                        <ManagersInfo props={aboutFederation && aboutFederation.managers}/>
                        <LinksInfo props={aboutFederation}/>
                        <FilesInfo props={aboutFederation}/>
                        <ContactsInfo props={aboutFederation && aboutFederation.contacts}/>
                    </div>
                    <div id="picture_block_right">
                        <DemoPictures picture1={picture1} picture2={picture2}/>
                        <DemoPictures picture1={picture3} picture2={picture4}/>
                        <DemoPictures picture1={picture1} picture2={picture2}/>
                        <DemoPictures picture1={picture1} picture2={picture2}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutFederation;