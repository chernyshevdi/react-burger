import AuthForm from "../../components/auth-form/auth-form";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postLogin } from "../../services/actions/login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { useHistory, useLocation } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const dispatch = useDispatch();
  const history = useHistory();
  let accessToken: string | null = localStorage.getItem("access");
  const { loginData } = useSelector(state => state.loginReducer);

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(postLogin(email, password));
  }
  let location = useLocation<any>();

  useEffect(() => {
    if (accessToken && loginData.success) {
      history.push(location.state ? location.state.from.pathname : "/");
    }
  }, [accessToken, history, location.state, loginData]);

  return (
    <AuthForm
      title="Вход"
      buttonName="Войти"
      footerQuestion="Вы — новый пользователь?"
      footerLink="Зарегистрироваться"
      link="/register"
      footerMoreQuestion="Забыли пароль? "
      footerMoreLink="Восстановить пароль"
      moreLink="/forgot-password"
      submit={handleSubmit}
    >
      <Input
        placeholder="Email"
        type="email"
        onChange={handleChangeEmail}
        value={email || ""}
      />
      <PasswordInput onChange={handleChangePassword} value={password || ""} name="Password" />
    </AuthForm>
  );
}

export default SignIn;
