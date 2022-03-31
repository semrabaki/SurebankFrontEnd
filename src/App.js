import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Register from './component/register/Register';
import Login from './component/login/Login'


const App = () => {
  return (
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/register" element={<Register/>}></Route>
     <Route path="/login" element={<Login/>}></Route>  
     {/* when you add * it means that for the other path go to home */}
     <Route path="/*" element={<Home/>}/>
     </Routes> 
    </BrowserRouter>
   
  )
}

export default App


