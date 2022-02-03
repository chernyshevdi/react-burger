import styleProfile from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { useEffect, useState } from "react";
import { updateUserData } from "../../services/actions/update-user";
import { postLogout } from "../../services/actions/login";
import { getCookie } from "../../utils/constants";
import CardOrder from '../../components/card-order/cardOrder';
import { FC } from 'react';
import {TOrders} from '../../services/types/data';

interface IProfile {
  openModal: () => void;
  onClose: () => void;
}

const Profile: FC<IProfile> = ({openModal, onClose}) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.loginReducer);
  const { updateUser } = useSelector(state => state.updateUserReducer);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>("");
  const [inputChange, setInputChange] = useState<boolean>(false);
  const { login } = useSelector(state => state.loginReducer);

  let accessToken: string | null = localStorage.getItem("access");

  const history = useHistory();

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  const handleSubmit = (e?: React.MouseEvent<HTMLButtonElement>): void => {
    //хендел обновления данных
    e!.preventDefault();
    dispatch(updateUserData(accessToken, email, password, name));
    setInputChange(false);
  }

  const handleСancelСhanges = (e?: React.MouseEvent<HTMLButtonElement>): void => { //
    e!.preventDefault();
    setName(updateUser.user ? updateUser.user.name : userData.user.name);
    setEmail(updateUser.user ? updateUser.user.email : userData.user.email);
    setPassword('')
    setInputChange(false);
  };

  useEffect(() => {
    setName(updateUser.user ? updateUser.user.name : userData.user ? userData.user.name : '');
    setEmail(updateUser.user ? updateUser.user.email : userData.user ?  userData.user.email : '');
  }, [userData]);

  function handleLogout(e: React.MouseEvent<HTMLElement>) {
    //хендел выхода из профиля
    e.preventDefault();
    dispatch(postLogout(getCookie("refresh")!));
  }

  useEffect(() => {
    //переход после выхода из профиля
    if (!accessToken && !login) {
      history.replace({ pathname: "/login" });
    }
  }, [accessToken, history, login]);

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
  }, [name, userData, email, password]);

  const { messages } = useSelector(state => state.wsReducer);
  const [isOrder, setIsOrder] = useState<TOrders[]>()

    useEffect(() => {
      if(messages) {
          if(messages.orders) {
              setIsOrder(messages.orders.reverse())
          }
      }
    },[messages])

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
          <div className={styleProfile.orders}>
            {isOrder ? isOrder.map((item) => {
              return(
              <CardOrder
                order={item}
                key={item._id}
                status={true}
                onOpen={openModal}
                onClose={onClose}
              />
              )
            }) : null}
          </div>
        )}
      </div>
      {location.pathname !== "/profile/orders" ?
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
      : 
      <p className={styleProfile.orderListInfo}>В этом разделе вы можете просмотреть свою историю заказов</p>
      }
    </section>
  );
}

export default Profile;
