import React, { useEffect } from "react";
import styleApp from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_MODAL_DATA } from '../../services/actions/app';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import SignIn from '../sign-in/signin';
import RegistrationPage from '../registration-page/registration';
import ForgotPassword from '../forgot-password/forgotPassword';
import RecoveryPassword from '../recovery-password/recoveryPassword';
import Profile from '../profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserData } from '../../services/actions/get-user';
import { getCookie } from '../../utils/constants';
import { postUpdateToken } from '../../services/actions/update-token';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ModalOverlay from '../modal/modal-overlay';
import Modal from '../modal/modal';
import Ingredient from '../ingredient/ingredient';

function App() {

  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  function openModalOrder() {
    setIsOrderModalOpen(true)
  }

  const dispatch = useDispatch();

  const openModalIgredients = (item) => {
    dispatch({
      type: ADD_MODAL_DATA,
      item, //отправляем экшен с данными карточки
    })
    setIsIngredientModalOpen(true)
  }
  const ingredient = (item) => {
    dispatch({
      type: ADD_MODAL_DATA,
      item, //отправляем экшен с данными карточки
    })
    setIsIngredientModalOpen(true)
  }

  function closeIngredientModal() {
    setIsIngredientModalOpen(false)
    history.goBack()
  }

  function closeModal() {
    setIsIngredientModalOpen(false)
    setIsOrderModalOpen(false)
  }

  const { status } = useSelector(state => state.getUserReducer);
  let accessToken = localStorage.getItem('access');

  useEffect(() => { //обновляю данные пользователя
    if(accessToken ) {
      dispatch(getUserData(accessToken))
    }
    
  },[dispatch, accessToken])

  useEffect(() => {
      if(status.success === false){//если токен умер 
        dispatch(postUpdateToken(getCookie('refresh'))) //то отправляем запрос на новый токен
    }
  },[status, dispatch])  

    const location = useLocation();
    const history = useHistory()
    const background = location.state && location.state.background;


  return (
    <div className={styleApp.page}>

        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <section className={styleApp.menu}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients  onClose={closeModal} onOpen={isIngredientModalOpen} openModal={openModalIgredients} />
                <BurgerConstructor onClose={closeModal} onOpen={isOrderModalOpen} openModal={openModalOrder}/>
              </DndProvider>
            </section>
            </Route>
            <Route path='/login' exact={true}>
              <SignIn/>
            </Route>
            <Route path='/register' exact={true}>
              <RegistrationPage/>
            </Route>
            <Route path='/forgot-password' exact={true}>
              <ForgotPassword/>
            </Route>
            <Route path='/reset-password' exact={true}>
              <RecoveryPassword/>
            </Route>
            <ProtectedRoute path='/profile' exact={true}>
              <Profile/>
            </ProtectedRoute>
            <ProtectedRoute path='/profile/orders' exact={true}>
              <Profile/>
            </ProtectedRoute>
            <Route path='/ingredients/:id' exact={true}>
              <Ingredient/>
            </Route>
      </Switch>

      {background && (
          <Route
            path='/ingredients/:id'>
              <Modal onClose={closeIngredientModal} onOpen={isIngredientModalOpen} modal={ingredient}>
                <IngredientDetails/>
                <ModalOverlay onClose={closeIngredientModal} onOpen={isIngredientModalOpen}/>
              </Modal>
          </Route>
        )} 
    </div>
  ); 

}

export default App;
