import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Register from './component/register/Register';
import client from './service/SureBankClient';
import Login from './component/login/Login'
import { useReducer } from 'react';
import { initialState, userReducer } from './reducers/userReducer'
import Logout from './component/logout/Logout';
import { createContext } from 'react'
import { toastError } from './util/Toast';
import { useEffect } from 'react';


export const StateContext=createContext();
export const DispatchContext=createContext();

const App = () => {

  //when we refresh the page we were loosing the state so in order to prevent that we are using getUserInfo in here and dispacth it to login in user reducer
  async function getUserInfo(){
    try{
    const userInfoResponse=await client.getUserInfo();
    if(userInfoResponse&&userInfoResponse.status===200){
        const userInfo=userInfoResponse.data;
        
        dispatch({
            type:"LOGIN",
            item: userInfo.user,
        });
    }
  }catch(error){
    toastError(error);

  }
  }
//we use useEffect in order to prevent side effects 
  useEffect(()=>{
    getUserInfo();
  },[])
  //dispacth to hcnage the state
 const[state,dispatch]=useReducer(userReducer,initialState); //we use redecue and give initial state
  return (
    //i rpivide dispacth to the all components below
    <DispatchContext.Provider value={dispatch}>
    <StateContext.Provider value={state}> //I provide state to the components below
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/register" element={<Register/>}></Route>
     <Route path="/login" element={<Login/>}></Route>  
     <Route path="/logout" element={<Logout/>}></Route>  
     {/* when you add * it means that for the other path go to home */}
     <Route path="/*" element={<Home/>}/>
     </Routes> 
    </BrowserRouter>
    </StateContext.Provider>
    </DispatchContext.Provider>
   
  )
}

export default App


