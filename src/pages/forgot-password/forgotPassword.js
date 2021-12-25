import AuthForm from "../../components/auth-form/auth-form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { postForgotPassword } from "../../services/actions/forgot-password";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector(
    (state) => state.forgotPasswordReducer
  );
  const history = useHistory();
  let accessToken = localStorage.getItem("access");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postForgotPassword(email));
  }

  useEffect(() => {
    if (!accessToken && forgotPassword.success) {
      history.replace({ pathname: "/reset-password" });
    }
  }, [forgotPassword, accessToken, history]);

  useEffect(() => {
    if (accessToken) {
      history.replace({ pathname: "/" });
    }
  }, [accessToken, history]);

  return (
    <AuthForm
      title="Восстановление пароля"
      buttonName="Восстановить"
      footerQuestion="Вспомнили пароль?"
      footerLink="Войти"
      link="/login"
      submit={handleSubmit}
    >
      <Input
        placeholder="Укажите e-mail"
        type="email"
        onChange={handleChangeEmail}
        value={email || ""}
      />
    </AuthForm>
  );
}

export default ForgotPassword;