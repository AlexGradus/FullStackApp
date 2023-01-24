import React, { useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import { useDispatch, useSelector } from 'react-redux';
import { Authorization } from './action/user';
import { MyState } from './interface/interface';

function App() {
  const Auth = useSelector((state:MyState)=>state.app.isAuth);
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(Authorization());
  },[])
  return (
    <BrowserRouter>
     <div>
     <WelcomePage/>
     {!Auth&&
     <Routes>
     <Route path='/registration' element={<SignUpPage/>}/>
     <Route path='/login' element={<SignInPage/>}/>
     
     </Routes>}
     
     
     
     
    </div>
    
    </BrowserRouter>
   
  );
}

export default App;
