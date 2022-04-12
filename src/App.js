import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/header/Header'
import Home from './component/home/Home'
import Login from './component/login/Login'
import Register from './component/register/Register'

import './App.css'
import { createContext } from 'react'
import { useReducer } from 'react'
import { initialState, userReducer } from './reducers/userReducer'
import Logout from './component/logout/Logout'
import client from './service/SureBankClient'
import { toastError } from './util/Toast'
import { useEffect } from 'react'
import Deposit from './component/deposit/Deposit'
import Withdraw from './component/withdraw/Withdraw'
import Transfer from './component/transfer/Transfer'
import RecipientManagement from './component/recipient/RecipientManagement'
import TransactionQuery from './component/transaction/TransactionQuery'
import CustomerDashboard from './component/dashboard/CustomerDashboard'
import AdminDashboard from './component/dashboard/AdminDashboard'
import PrivateRoute from './component/privateroute/PrivateRoute'
import ContactMessageList from './component/contact-message/ContactMessageList'
import UserManagement from './component/usermanagement/UserManagement'

export const StateContext=createContext();
export const DispatchContext=createContext();

const App = () => {
  //when we refresh the page we were loosing the state so in order to prevent that we are using getUserInfo in here and dispacth it to login in user reducer
  async function getUserInfo() {
    try {
      const userInfoResponse = await client.getUserInfo();
      if (userInfoResponse && userInfoResponse.status === 200) {
        const userInfo = userInfoResponse.data;

        dispatch({
          type: "LOGIN",
          item: userInfo.user,
        });
      }
    } catch (error) {
      toastError(error);
    }
  }
  //we use useEffect in order to prevent side effects
  useEffect(() => {
    const token=sessionStorage.getItem("token");
    if(token){
    getUserInfo();
    }
  }, []);
  //dispacth to hcnage the state
  const [state, dispatch] = useReducer(userReducer, initialState); //we use redecue and give initial state
  return (
    //i rpivide dispacth to the all components below
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {" "}
        //I provide state to the components below
        <BrowserRouter>
          <Header />
          <Routes>
          {/* children lar in the privateroute */}
          <Route path="/register" element={<Register/>}/> 
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<PrivateRoute><Logout/></PrivateRoute>}/>
              <Route path="/deposit"element={<PrivateRoute><Deposit/></PrivateRoute>}/>
              <Route path="/withdraw" element={<PrivateRoute><Withdraw/></PrivateRoute>}/>
              <Route path="/transfer" element={<PrivateRoute><Transfer/></PrivateRoute>}/>
              <Route path="/recipient" element={<PrivateRoute><RecipientManagement/></PrivateRoute>}/>
              <Route path="/transactions"element={<PrivateRoute><TransactionQuery/></PrivateRoute>}/>
              <Route path="/alltransactions" element={<PrivateRoute><TransactionQuery/></PrivateRoute>}/>
              <Route path="/dashboard" element={<PrivateRoute><CustomerDashboard/></PrivateRoute>}/>
              <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard/></PrivateRoute>}/>
              <Route path="/messages" element={<PrivateRoute><ContactMessageList/></PrivateRoute>}/>
              <Route path="/user-management" element={<PrivateRoute><UserManagement/></PrivateRoute>}/>
            {/* when you add * it means that for the other path go to home */}
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
