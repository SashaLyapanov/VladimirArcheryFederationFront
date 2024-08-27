import {useEffect, useState} from "react";
import axios from "../../../utils/axios";
import Navbar from "../../../components/navbar/Navbar";
import NamePage from "../../../components/namePage/NamePage";
import EditAboutFederationForm from "./EditAboutFederationForm";


const EditAboutFederation = () => {
    const [aboutFederation, setAboutFederation] = useState();

    useEffect(() => {
        axios.get("/general/getAboutFederation")
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
            <div className={'page-content'}>
                <NamePage name={'Редактирование "О федерации"'}/>
                {aboutFederation && <EditAboutFederationForm info={aboutFederation}/>}
            </div>
        </div>
    )

}

export default EditAboutFederation;