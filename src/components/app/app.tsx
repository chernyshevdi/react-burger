import React, { useEffect } from "react";
import styleApp from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { SignIn, RegistrationPage, ForgotPassword, RecoveryPassword, Profile} from "../../pages";
import { ProtectedRoute } from "../protected-route/protected-route";
import { postUpdateToken } from "../../services/actions/update-token";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {TIngredient} from '../../services/types/data';
import Modal from "../modal/modal";
import Ingredient from "../ingredient/ingredient";
import { getItems } from "../../services/actions/burger-ingredients";
import { AddModalDataAction, AddModalProfileAction } from "../../services/actions/app";
import OrderFeed from '../../pages/order-feed/orderFeedPage';
import OrderInformation from '../order-information/orderInformation';
import {TOrders} from '../../services/types/data';
import OrderPage from '../order-page/order-page';
import {getUserData} from '../../services/actions/login';

type TItem = { 
  type: string;
  _id?: string;
  image: string;
  name: string;
  price: number;
}

function App() {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState<boolean>(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState<boolean>(false);
  const [isProfileOrderModalOpen, setProfileIsOrderModalOpen] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  function openModalOrder() {
    setIsOrderModalOpen(true);
  }

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { ingredients } = useSelector(state => state.ingredientsReducer);
  const [currentIngredientId, setCurrentIngredientId] = React.useState<string>();
  const [currentIngredientItem, setCurrentIngredientItem] = React.useState<TIngredient>();

  const openModalIgredients = (item?: TIngredient) => {
    dispatch(AddModalDataAction(item!));
    setIsIngredientModalOpen(true);
  };

  const openModalProfileOrder = (order?: TOrders) => {
    dispatch(AddModalProfileAction(order!));
    setProfileIsOrderModalOpen(true)
  }

  //передаем карточку ингредиента модальному окну
  const ingredient = (id: string) => {
    setCurrentIngredientId(id)
  };

  useEffect(() => {
    if(currentIngredientId) {
      setCurrentIngredientItem(ingredients.find((item: TItem) => item._id === currentIngredientId));
    }
  },[currentIngredientId, ingredients ])

  useEffect(() => {
    if(currentIngredientItem) {
      const item = currentIngredientItem;

      dispatch(AddModalDataAction(item!));
      
      setIsIngredientModalOpen(true);
    }
  }, [currentIngredientItem, dispatch])
    
  function closeIngredientModal() {
    setIsIngredientModalOpen(false);
    setProfileIsOrderModalOpen(false);
    history.goBack();
  }

  function closeModal() {
    setIsIngredientModalOpen(false);
    setIsOrderModalOpen(false);
    setProfileIsOrderModalOpen(false);
  }
  
  const { updateTokenSuccess } = useSelector(state => state.updateTokenReducer);
  const { userFailed } = useSelector(state => state.loginReducer);

  function checkUser(accessToken: string) {
    dispatch(getUserData(accessToken))
  }

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("access");
    //обновляю данные пользователя
    if (accessToken) {
      checkUser(accessToken)
    }
  }, []);

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("access");
    if(updateTokenSuccess) {
      checkUser(accessToken!)
    }
  },[updateTokenSuccess])

  useEffect(() => {
    const refreshToken: string | null = localStorage.getItem("refresh");
    if (userFailed) {
      //если токен умер
      dispatch(postUpdateToken(refreshToken)); //то отправляем запрос на новый токен
    }
  }, [dispatch, userFailed]);

  const location = useLocation<any>();
  const history = useHistory();
  const background = location.state && location.state.background;

  const [currentProfileOrderId, setCurrentProfileOrderId] = React.useState<string>();
  const [currentProfileOrderItem, setCurrentProfileOrderItem] = React.useState<TOrders>();
  const { messages } = useSelector((state: any) => state.wsReducer);
  const [isOrder, setIsOrder] = React.useState<any>()

  useEffect(() => {
      if(messages) {
        if(messages.orders) {
          setIsOrder(messages.orders)
        }
      }
  }, [dispatch, messages])

  const order = (id: string) => {
    setCurrentProfileOrderId(id)
  };

  useEffect(() => {
    if(currentProfileOrderId) {
      
      if(isOrder) {
        setCurrentProfileOrderItem(isOrder.find((order:any) => order.number.toString() === currentProfileOrderId));
      }
    }
  },[dispatch, currentProfileOrderId, isOrder])

  useEffect(() => {
    if(currentProfileOrderItem) {
      const order = currentProfileOrderItem;
      dispatch(AddModalProfileAction(order));
      setProfileIsOrderModalOpen(true)
    }
  }, [currentProfileOrderItem, dispatch])

  return (
    <div className={styleApp.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <section className={styleApp.menu}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients
                onClose={closeModal}
                openModal={openModalIgredients}
              />
              <BurgerConstructor
                onClose={closeModal}
                onOpen={isOrderModalOpen}
                openModal={openModalOrder}
              />
            </DndProvider>
          </section>
        </Route>
        <Route path="/login" exact={true}>
          <SignIn />
        </Route>
        <Route path="/register" exact={true}>
          <RegistrationPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <RecoveryPassword />
        </Route>

        <Route path="/feed" exact={true}>
          <OrderFeed
            openModal={openModalProfileOrder}
            onClose={closeModal}
          />
        </Route>

        <Route path="/feed/:id" exact={true}>
          <OrderPage />
        </Route>

        <Route path="/profile" exact={true}>
          <ProtectedRoute>
            <Profile 
              openModal={openModalProfileOrder}
              onClose={closeModal}
            />
          </ProtectedRoute>
        </Route>
        
        <Route path="/profile/orders" exact={true}>
          <ProtectedRoute>
            <Profile 
              openModal={openModalProfileOrder}
              onClose={closeModal}
            />
          </ProtectedRoute>
        </Route>

        <Route path="/profile/orders/:id" exact={true}>
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        </Route>
        
        <Route path="/ingredients/:id" >
          <Ingredient />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id">
          <Modal
            onClose={closeIngredientModal}
            onOpen={isIngredientModalOpen}
          >
            <IngredientDetails modal={ingredient}/>

          </Modal>
        </Route>
      )}

      {background && (
        <Route path="/feed/:id">
          <Modal
            onClose={closeIngredientModal}
            onOpen={isProfileOrderModalOpen}
          >
            <OrderInformation modal={order}/>

          </Modal>
        </Route>
      )}

      {background && (
        <Route path="/profile/orders/:id">
          <Modal
            onClose={closeIngredientModal}
            onOpen={isProfileOrderModalOpen}
          >
            <OrderInformation modal={order}/>

          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
