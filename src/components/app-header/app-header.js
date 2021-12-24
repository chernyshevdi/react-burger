import styleHeader from "../app-header/app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function AppHeader() {

  let location = useLocation();

  return (
    <header className={styleHeader.block}>
      <div className={styleHeader.container}>
        <div className={styleHeader.navigationShop}>
          <Link
            to={{ pathname: '/'}}
            className={location.pathname === '/' ? styleHeader.button_active : styleHeader.button}     
          >
            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
            <p
              className={`${styleHeader.buttonName} text text_type_main-default ml-2`}
            >
              Контруктор
            </p>
          </Link>

          <button 
            className={styleHeader.button} 
            current="orderList"
          >
            <ListIcon type="secondary" />
            <p
              className={`${styleHeader.buttonName} text text_type_main-default ml-2`}
            >
              Лента заказов
            </p>
          </button>
        </div>

        <div className={styleHeader.logo}>
          <Logo />
        </div>

        <NavLink 
          to={{ pathname: '/profile'}}
          className={styleHeader.button} 
          activeClassName={styleHeader.button_active}
        >
          <ProfileIcon type={location.pathname === '/profile' || location.pathname === '/profile/orders' ? 'primary' : 'secondary'} />
          <p
            className={`${styleHeader.buttonName} text text_type_main-default ml-2`}
          >
            Личный кабинет
          </p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
