import AuthForm from "../../components/auth-form/auth-form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { useHistory } from "react-router-dom";
import { postRecoveryPassword } from "../../services/actions/recovery-password";

interface RootState {
  recoveryPasswordReducer: any;
  forgotPasswordReducer: any;
}

function RecoveryPassword() {
  const [password, setPassword] = useState<string>();
  const [token, setToken] = useState<string>();
  const dispatch = useDispatch();
  const { recoveryPassword } = useSelector(state => state.recoveryPasswordReducer
  );
  const history = useHistory();
  let accessToken: string | null = localStorage.getItem("access");
  const { forgotPassword } = useSelector(state => state.forgotPasswordReducer
  );

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleChangeToken(e: React.ChangeEvent<HTMLInputElement>) {
    setToken(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <AuthForm
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
    </AuthForm>
  );
}

export default RecoveryPassword;
