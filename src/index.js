import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// configuring the notifictaions with toastify
toast.configure({
  autoClose:8000,  //nofitication disappaer after 8000seconds
  draggable:false  //not draggable
})



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

