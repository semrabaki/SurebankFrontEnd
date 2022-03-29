import React from 'react';
import { BrowserRouter,Routes } from 'react-router-dom';
import Header from './component/header/Header';


const App = () => {
  return (
    <BrowserRouter>
     <Header/>
     <Routes>
     {/* <Route path="/register" element={<Register/>}></Route>
     <Route path="/login" element={<Register/>}></Route>   */}
     </Routes> 
    </BrowserRouter>
   
  )
}

export default App