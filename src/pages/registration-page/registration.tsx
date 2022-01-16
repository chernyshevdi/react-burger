import AuthForm from "../../components/auth-form/auth-form";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postRegister } from "../../services/actions/register";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegistrationPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const dispatch = useDispatch();
  const { registerData } = useSelector((state: any) => state.registerReducer);
  const history = useHistory();
  let accessToken: string | null = localStorage.getItem("access");

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(postRegister(email, password, name));
  }

  useEffect(() => {
    if (registerData.success) {
      history.replace({ pathname: "/" });
    }
  }, [registerData, history]);

  useEffect(() => {
    if (accessToken) {
      history.replace({ pathname: "/" });
    }
  }, [accessToken, history]);

  return (
    <AuthForm
      title="Регистрация"
      buttonName="Регистрация"
      footerQuestion="Уже зарегистрированы?"
      footerLink="Войти"
      link="/login"
      submit={handleSubmit}
    >
      <Input
        placeholder="Имя"
        type="text"
        onChange={handleChangeName}
        value={name || ""}
      />
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

export default RegistrationPage;
