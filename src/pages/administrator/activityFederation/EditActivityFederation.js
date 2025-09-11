import {useEffect, useState} from "react";
import {apiServiceAxios} from "../../../utils/axios";
import Navbar from "../../../components/navbar/Navbar";
import NamePage from "../../../components/namePage/NamePage";
import EditActivityFederationFile from './EditActivityFederationFile';
import {useParams} from "react-router";

const EditActivityFederation = () => {

    const blockName = useParams();
    const [activityFederation, setActivityFederation] = useState();
    const [fileNames, setFileNames] = useState();
    const [pageName, setPageName] = useState();


    useEffect(() => {
        if (blockName?.blockName === "3D") {
            setPageName("Редактирование блока '3Д стрельба из лука'");
        } else if (blockName?.blockName === "Classic") {
            setPageName("Редактирование блока 'Классическая стрельба из лука'");
        } else if (blockName?.blockName === "Biathlon") {
            setPageName("Редактирование блока 'Archery биатлон'");
        }  else if (blockName?.blockName === "General") {
            setPageName("Редактирование блока 'Обща информация'");
        }

        apiServiceAxios.get("/general/activityFederation", {}, false)
            .then(resp => {
                setActivityFederation(resp.data)
            })
            .catch(e => {
                    console.error(e);
                }
            )
    }, [blockName])

    useEffect(() => {
        if (blockName?.blockName === "3D") {
            setFileNames(activityFederation?.threeD);
        } else if (blockName?.blockName === "Classic") {
            setFileNames(activityFederation?.classic);
        } else if (blockName?.blockName === "Biathlon") {
            setFileNames(activityFederation?.biathlon);
        }  else if (blockName?.blockName === "General") {
            setFileNames(activityFederation?.general);
        }
    }, [blockName, activityFederation])


    return (
        <div>
            <Navbar/>
            <div className={'page-content'}>
                {pageName && <NamePage name={pageName}/>}
                {fileNames && <EditActivityFederationFile flag={blockName?.blockName} filesAboutFederation={fileNames}/>}
            </div>
        </div>
    )

}

export default EditActivityFederation;