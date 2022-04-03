import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Formik } from 'formik'
import React from 'react'
import { Button, Col, Container, Form, FormFeedback, Input, InputGroup, InputGroupText, Row, Spinner } from 'reactstrap';
import * as Yup from "yup";
import './login.css'

import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faUserLock} from '@fortawesome/free-solid-svg-icons';
import client from '../../service/SureBankClient';
import { toast } from 'react-toastify';
import { toastError } from '../../util/Toast';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../App';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginSchema=Yup.object().shape(
    {
        userName:Yup.string().required("Required"),
        password:Yup.string().required("Required")
    }
);

 

const LoginForm=(props)=>(
   <Container>
       <fieldset>
            <legend>Login</legend>

            <Form>
                   <Row className="justify-content-start">
                       <Col lg="4" className="text-center p-3">
                       {/* when you want to use icon you need to use InputGroup instead of FormGroup */}
                           <InputGroup> 
                                <InputGroupText>
                                   <FontAwesomeIcon icon={faUserCircle}/>UserName
                                </InputGroupText>

                                <Input
                                  tag={Field}
                                  name="userName"
                                  type="text"
                                  invalid={props.errors.userName && props.touched.userName}
                                />
                                <FormFeedback>{props.errors.userName}</FormFeedback>
                           </InputGroup>
                       </Col>

                       <Col lg="4" className="text-center p-3">
                           <InputGroup>
                                <InputGroupText>
                                   <FontAwesomeIcon icon={faUserLock}/>Password
                                </InputGroupText>

                                <Input
                                  tag={Field}
                                  name="password"
                                  type="password"
                                  invalid={props.errors.password && props.touched.password}
                                />
                                <FormFeedback>{props.errors.password}</FormFeedback>
                           </InputGroup>

                            {props.isSubmitting&&<Spinner> </Spinner>}

                       </Col>
                       

                       </Row> 

                       <Row className="justify-content-start">
                        <Col lg="4" className="text-center p-3">
                            <Button 
                              color="primary"
                              disabled={props.isSubmitting}
                              onClick={props.submitForm}
                            >Submit</Button>
                            </Col>    
                       </Row>

            </Form>

       </fieldset>

   </Container>
)

 const Login = (props) => {

  //we have th user infor  in here and we need to put user info the state and I will use this user data in the header js. We need to import dispacth ontext and state context from the app so that we can put the userinfo to the central area
   const dispatch=useContext(DispatchContext);
   const state=useContext(StateContext);
   const navigate=useNavigate();
    //call back function means- formik will call it later      
  const submitForm=async(values,actions)=>{
    try{
      // we put await until login fucntion returns its resposne
      const response=await client.login(values);
      if(response&&response.status===200){
        // by using axios when you put response.data you can get what is sent by backend
       const jwt= response.data; //  in here we are getting the token and stringy it from response.data object
      //sessionStorage->when I log in the application we get token from the backend side.We need to use this token for every api call
    //wee need to save this token so session storage(or local storage) is the place we save this token
    //when you close the tab you loose the data in the session storage
    //when you use local storage even you close the computer the data is saved still
       sessionStorage.setItem(
          //we can create string form an object with JSON.stringify
         "token",JSON.stringify({token:jwt.token})//we are getting token from inside the jwt response token needs to match to backend in the name convention
       );
       debugger;
       toast.success("You logged in successfully");
      const userInfoResponse= await client.getUserInfo();
      if(userInfoResponse&&userInfoResponse.status===200){
        const userInfo=userInfoResponse.data;
       // toast.success(userInfo.user.firstName); //user i backende user class tipinden oldigni icin user.firstnmae dedik

       dispatch({
         type:"LOGIN",
         item:userInfo.userInfo.user
       }); // we are getting the user info

       if(userInfo&&userInfo.user){ 
         navigate("/") //if user info ve user var ise home ogae e gidicek yoksa login page gidicek
       }else{
         navigate("/login")
       }

      }
      }
      actions.resetForm();

    }catch(err){

      toastError(err);

    }
    actions.setSubmitting(false);
  }






  return (
     <Formik
           initialValues={{
                   userName:"",
                   password:""
               }}

           validationSchema={LoginSchema}
           onSubmit={(values,actions)=>{
               submitForm(values,actions);
           }}
           component={LoginForm} 
>
     </Formik>
  )
          }

export default Login