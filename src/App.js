import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './component/header/Header';
import Home from './component/home/Home';


const App = () => {
  return (
    <BrowserRouter>
     <Header/>
     <Routes>
     {/* <Route path="/register" element={<Register/>}></Route>
     <Route path="/login" element={<Register/>}></Route>   */}
     <Route path="/" element={<Home/>}/>
     </Routes> 
    </BrowserRouter>
   
  )
}

export default App