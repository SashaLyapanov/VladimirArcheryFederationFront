import {useEffect, useState} from "react";

const ContactsInfo = ({props}) => {

    const [contacts, setContacts] = useState();

    useEffect(() => {
        setContacts(props);
    })

    return(
        <div className="info-block">
            <h1>Контакты федерации:</h1>
            <p>{contacts}</p>
        </div>
    )

}

export default ContactsInfo;