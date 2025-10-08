import {useEffect, useState} from "react";
import {apiServiceAxios} from "../../../utils/axios";
import Navbar from "../../../components/navbar/Navbar";
import NamePage from "../../../components/namePage/NamePage";
import EditAboutFederationInfoForm from "./EditAboutFederationInfoForm";
import EditAboutFederationFilesForm from "./EditAboutFederationFilesForm";


const EditAboutFederation = ({infoOrFiles}) => {
    const [aboutFederation, setAboutFederation] = useState();

    useEffect(() => {
        apiServiceAxios.get("/general/getAboutFederation", {}, false)
            .then(resp => {
                setAboutFederation(resp.data)
            })
            .catch(e => {
                    console.error(e);
                }
            )
    }, [])

    return (
        <div>
            <Navbar/>
            <div className={'container'}>
                <div className={'page-content'}>
                    <NamePage name={'Редактирование "О федерации"'}/>
                    {aboutFederation && infoOrFiles === 'info' ?
                        <EditAboutFederationInfoForm infoAboutFederation={aboutFederation}/>
                        :
                        <EditAboutFederationFilesForm filesAboutFederation={aboutFederation?.fileNames}/>
                    }
                </div>
            </div>
        </div>
    )

}

export default EditAboutFederation;