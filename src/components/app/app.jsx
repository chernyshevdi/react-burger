import React, { useEffect } from "react";
import styleApp from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MODAL_DATA } from "../../services/actions/app";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { SignIn, RegistrationPage, ForgotPassword, RecoveryPassword, Profile} from "../../pages/";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getUserData } from "../../services/actions/get-user";
import { postUpdateToken } from "../../services/actions/update-token";
import IngredientDetails from "../ingredient-details/ingredient-details";

import Modal from "../modal/modal";
import Ingredient from "../ingredient/ingredient";
import { getItems } from "../../services/actions/burger-ingredients";

function App() {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  function openModalOrder() {
    setIsOrderModalOpen(true);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { ingredients } = useSelector((state) => state.ingredientsReducer);
  const [currentIngredientId, setCurrentIngredientId] = React.useState(null);
  const [currentIngredientItem, setCurrentIngredientItem] = React.useState(null);

  const openModalIgredients = (item) => {
    dispatch({
      type: ADD_MODAL_DATA,
      item, //отправляем экшен с данными карточки
    });
    setIsIngredientModalOpen(true);
  };

  const ingredient = (id) => {
    setCurrentIngredientId(id);
  };
  
  useEffect(() => {
    if(currentIngredientId) {
      setCurrentIngredientItem(ingredients.find((item) => item._id === currentIngredientId));
    }
  },[currentIngredientId, ingredients ])

  useEffect(() => {
    if(currentIngredientItem) {
      const item = currentIngredientItem;
      dispatch({
        type: ADD_MODAL_DATA,
        item, //отправляем экшен с данными карточки
      });
      setIsIngredientModalOpen(true);
    }
  }, [currentIngredientItem, dispatch])
    
  function closeIngredientModal() {
    setIsIngredientModalOpen(false);
    history.goBack();
  }

  function closeModal() {
    setIsIngredientModalOpen(false);
    setIsOrderModalOpen(false);
  }
  
  const { updateTokenSuccess } = useSelector((state) => state.updateTokenReducer);
  const { userFailed } = useSelector((state) => state.getUserReducer);

  function checkUser(accessToken) {
    dispatch(getUserData(accessToken))
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    //обновляю данные пользователя
    if (accessToken) {
      checkUser(accessToken)
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if(updateTokenSuccess) {
      checkUser(accessToken)
    }
  },[updateTokenSuccess])

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh");
    if (userFailed) {
      //если токен умер
      dispatch(postUpdateToken(refreshToken)); //то отправляем запрос на новый токен
    }
  }, [dispatch, userFailed]);

  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;

  return (
    <div className={styleApp.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <section className={styleApp.menu}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients
                onClose={closeModal}
                onOpen={isIngredientModalOpen}
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
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <Ingredient />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id">
          <Modal
            onClose={closeIngredientModal}
            onOpen={isIngredientModalOpen}
            modal={ingredient}
          >
            <IngredientDetails />

          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
