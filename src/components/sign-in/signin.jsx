import Registration from "../registration/registration";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postLogin } from "../../services/actions/login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  let accessToken = localStorage.getItem("access");
  const { loginData } = useSelector((state) => state.loginReducer);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postLogin(email, password));
  }
  let location = useLocation();

  useEffect(() => {
    if (accessToken && loginData.success) {
      history.push(location.state ? location.state.from.pathname : "/");
    }
  }, [accessToken, history, location.state, loginData]);

  return (
    <Registration
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
      <PasswordInput onChange={handleChangePassword} value={password || ""} />
    </Registration>
  );
}

export default SignIn;
