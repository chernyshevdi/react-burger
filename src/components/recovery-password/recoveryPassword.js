import Registration from "../registration/registration";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postRecoveryPassword } from "../../services/actions/recovery-password";

function RecoveryPassword() {
  const [password, setPassword] = useState();
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const { recoveryPassword } = useSelector(
    (state) => state.recoveryPasswordReducer
  );
  const history = useHistory();
  let accessToken = localStorage.getItem("access");
  const { forgotPassword } = useSelector(
    (state) => state.forgotPasswordReducer
  );

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeToken(e) {
    setToken(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecoveryPassword(password, token));
  }

  useEffect(() => {
    if (recoveryPassword.success) {
      history.replace({ pathname: "/" });
    }
  }, [recoveryPassword, history]);

  useEffect(() => {
    if (!forgotPassword.success) {
      history.replace({ pathname: "/forgot-password" });
    }
  });

  useEffect(() => {
    if (accessToken) {
      history.replace({ pathname: "/" });
    }
  }, [accessToken, history]);

  return (
    <Registration
      title="Восстановление пароля"
      buttonName="Сохранить"
      footerQuestion="Вспомнили пароль?"
      footerLink="Войти"
      submit={handleSubmit}
    >
      <Input
        placeholder="Введите новый пароль"
        type="password"
        onChange={handleChangePassword}
        value={password || ""}
      />
      <Input
        placeholder="Введите код из письма e-mail"
        type="text"
        onChange={handleChangeToken}
        value={token || ""}
      />
    </Registration>
  );
}

export default RecoveryPassword;
