import Authorization from "../../components/authorization/Authorization.js";

const Login = () => {
    const nameInput = {
        name: 'Вход',
        text: ['Еще нет аккаунта?'],
        link: ['Регистрация', 'Забыли пароль?'],
        button: 'Войти',
        input: [{
            name: 'Логин',
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

export default Login;