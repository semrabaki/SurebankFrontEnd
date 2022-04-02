import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Register from './component/register/Register';
import Login from './component/login/Login'
import { useReducer } from 'react';
import { userReducer } from './reducers/userReducer';


export const StateContext=createContext();
export const DispatchContext=createContext();

const App = () => {

  //dispact to hcnage the state
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
     {/* when you add * it means that for the other path go to home */}
     <Route path="/*" element={<Home/>}/>
     </Routes> 
    </BrowserRouter>
    </StateContext.Provider>
    </DispatchContext.Provider>
   
  )
}

export default App


