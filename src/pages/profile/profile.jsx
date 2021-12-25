import styleProfile from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/actions/get-user";
import { useEffect, useState } from "react";
import { updateUserData } from "../../services/actions/update-user";
import { postLogout } from "../../services/actions/logout";
import { getCookie } from "../../utils/constants";
import { postUpdateToken } from "../../services/actions/update-token";

function Profile() {
  let location = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.getUserReducer);
  const { status } = useSelector((state) => state.getUserReducer);
  const { updatestatus } = useSelector((state) => state.updateUserReducer);
  const { updateUser } = useSelector((state) => state.updateUserReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [name, setName] = useState("");
  const [inputChange, setInputChange] = useState(false);
  const { login } = useSelector((state) => state.loginReducer);

  let accessToken = localStorage.getItem("access");
  let refreshToken = localStorage.getItem("refresh");

  const history = useHistory();

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
    //хендел обновления данных
    e.preventDefault();
    dispatch(updateUserData(accessToken, email, password, name));
    setInputChange(false);
  }

  const handleСancelСhanges = (e) => {
    e.preventDefault();
    setName(updateUser.user ? updateUser.user.name : userData.user.name);
    setEmail(updateUser.user ? updateUser.user.email : userData.user.email);
    setPassword('')
    setInputChange(false);
  };

  useEffect(() => {
    setName(updateUser.user ? updateUser.user.name : userData.user ? userData.user.name : '');
    setEmail(updateUser.user ? updateUser.user.email : userData.user ?  userData.user.name : '');
  }, [userData]);

  function handleLogout(e) {
    //хендел выхода из профиля
    e.preventDefault();
    dispatch(postLogout(refreshToken));
  }

  useEffect(() => {
    if (status.success === false) {
      //если токен умер
      dispatch(postUpdateToken(refreshToken)); //то отправляем запрос на новый токен
    }
  }, [status.success, dispatch]);

  useEffect(() => {
    //обновляю данные пользователя
    if (accessToken && userData.success) {
      dispatch(getUserData(accessToken));
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    //переход после выхода из профиля
    if (!accessToken && !login) {
      history.replace({ pathname: "/login" });
    }
  }, [accessToken, history, login]);

  useEffect(() => {
    if (updatestatus.success === false) {
      //если токен умер
      dispatch(getUserData(accessToken)); //то отправляем запрос на новый токен
    }
  }, [updatestatus.success, dispatch, accessToken]);

  useEffect(() => {
    if (userData.user && name) {
      if (
        userData.user.name !== name ||
        userData.user.email !== email ||
        password
      ) {
        setInputChange(true);
      } else {
        setInputChange(false);
      }
    }
  }, [name, userData.user, email, password]);

  return (
    <section className={styleProfile.container}>
      <div className={styleProfile.main}>
        <nav className={styleProfile.nav}>
          <ul className={styleProfile.navList}>
            <Link to="/profile" className={styleProfile.link}>
              <li
                className={`${
                  location.pathname === "/profile"
                    ? styleProfile.list_active
                    : styleProfile.list
                } text text_type_main-medium text_color_inactive mb-6`}
              >
                Профиль
              </li>
            </Link>
            <Link to="/profile/orders" className={styleProfile.link}>
              <li
                className={`${
                  location.pathname === "/profile/orders"
                    ? styleProfile.list_active
                    : styleProfile.list
                } text text_type_main-medium text_color_inactive mb-6`}
              >
                История заказов
              </li>
            </Link>
            <Link to="/login" className={styleProfile.link}>
              <li
                className={`${styleProfile.list} text text_type_main-medium text_color_inactive mb-6`}
                onClick={handleLogout}
              >
                Выход
              </li>
            </Link>
          </ul>
        </nav>
        {location.pathname === "/profile" && (
          <div className={styleProfile.inputs}>
            <Input
              type="text"
              placeholder="Имя"
              icon="EditIcon"
              value={name || ""}
              onChange={handleChangeName}
            />
            <Input
              placeholder="Логин"
              type="email"
              icon="EditIcon"
              value={email || ""}
              onChange={handleChangeEmail}
            />
            <Input
              placeholder="Пароль"
              type="password"
              icon="EditIcon"
              value={password || ""}
              onChange={handleChangePassword}
            />
          </div>
        )}
        {location.pathname === "/profile/orders" && (
          <div className={styleProfile.orders}></div>
        )}
      </div>
      <div className={styleProfile.footer}>
        <p
          className={`${styleProfile.info} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>

        <div
          className={
            inputChange ? styleProfile.buttons_active : styleProfile.buttons
          }
        >
          <Button type="secondary" size="medium" onClick={handleСancelСhanges}>
            Отмена
          </Button>

          <Button type="primary" size="medium" onClick={handleSubmit}>
            Сохранить
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
