import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MyState } from '../../interface/interface';
import { logout } from '../../store/appReducer';
import UserList from '../userList';

import { s } from './';





const WelcomePage = () => {
  const Auth = useSelector((state:MyState)=>state.app.isAuth);

  const dispatch = useDispatch();
  return (
    <section className={s.container} >
      
        {!Auth&&<div className={s.button}><NavLink to ="/login">Войти</NavLink></div>}
        {!Auth&& <div className={s.button}><NavLink to ="/registration">Регистрация</NavLink></div>}
        {Auth&& <div className={s.button} onClick={()=>dispatch(logout())}>Выход</div>}
        {Auth&& <UserList />}
   

    </section>
  );
};
export default WelcomePage;
