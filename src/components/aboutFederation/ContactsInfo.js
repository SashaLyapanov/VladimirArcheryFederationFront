import {useEffect, useState} from "react";

const ContactsInfo = ({props}) => {

    const [contacts, setContacts] = useState();

    useEffect(() => {
        setContacts(props);
    })

    return(
        <div className="info-block">
            <h1 className='fonts-roboto-black'>Контакты федерации:</h1>
            <p className='info-body'>{contacts}</p>
        </div>
    )

}

export default ContactsInfo;