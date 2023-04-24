import Authorization from "../../components/authorization/Authorization.js";

const Registration = () => {
    const nameInput = {
        name: 'Регистрация',
        text: ['Уже есть аккаунт?'],
        link: ['Войти'],
        button: 'Войти',
        input: [{
            name: 'Имя',
            type: 'text'
        },
        {
            name: 'Фамилия',
            type: 'text'
        },
        {
            name: 'Отчество',
            type: 'text'
        },
        {
            name: 'Email',
            type: 'text'
        },
        {
            name: 'Пароль',
            type: 'password'
        }]
    }

    return (
        <>
            <Authorization parametrs={nameInput}/>
        </>
    )
}

export default Registration;