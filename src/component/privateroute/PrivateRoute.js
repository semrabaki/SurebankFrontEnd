
import { useEffect,useState } from 'react';
import {useNavigate } from 'react-router-dom';
import client from '../../service/SureBankClient';

// this is for if the user is not logged in we are directing user to log in page

function PrivateRoute(props) {
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate();

  //if we have token get user info and set auth true, if we  do  not have token go to log in and then go to children(children is the wrapped com
  //components that are used in the App.js)
  useEffect(() => {
      async function getUserInfo() {
          const token=sessionStorage.getItem("token");

        if(token){
          const userInfoResponse=await client.getUserInfo();
          if(userInfoResponse&&userInfoResponse.status===200){
              setIsAuth(true);
              return;
          }
        } 
  
        navigate('/login')
      } 
      
      getUserInfo();
     }, [isAuth]);
  
     if (isAuth === null) return null;
  
     return props.children;
  }



export default PrivateRoute