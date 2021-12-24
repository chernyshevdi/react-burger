import Registration from "../registration/registration";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postRegister } from "../../services/actions/register";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegistrationPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const { registerData } = useSelector((state) => state.registerReducer);
  const history = useHistory();
  let accessToken = localStorage.getItem("access");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
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
    <Registration
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
      <PasswordInput onChange={handleChangePassword} value={password || ""} />
    </Registration>
  );
}

export default RegistrationPage;
