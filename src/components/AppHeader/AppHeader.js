import styleHeader from '../AppHeader/AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {

    return(
        
        <header className={styleHeader.block}>
            <div className={styleHeader.navigationShop}>
                <button className={styleHeader.button}>
                    <BurgerIcon type="primary" />
                    <p className={`${styleHeader.buttonName} text text_type_main-default ml-2`}>{'Контруктор'}</p>
                </button>

                <button className={styleHeader.button}>
                    <ListIcon type="primary" />
                    <p className={`${styleHeader.buttonName} text text_type_main-default ml-2`}>{'Лента заказов'}</p>
                </button>
            </div>
            
            <div className={styleHeader.logo}>
                <Logo />
            </div>

            <button className={styleHeader.button}>
                <ProfileIcon type="primary" />
                <p className={`${styleHeader.buttonName} text text_type_main-default ml-2`}>{'Личный кабинет'}</p>
            </button>
            
        </header>
    )
}

export default AppHeader