import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Formik } from 'formik'
import React from 'react'
import { Button, Col, Container, Form, FormFeedback, Input, InputGroup, InputGroupText, Row, Spinner } from 'reactstrap';
import * as Yup from "yup";

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
);

const Login = () => {
    const dispatch=useContext(DispatchContext);
    const state=useContext(StateContext);
    const navigate=useNavigate();


    const submitForm=async(values,actions)=>{

        try{
        const response=  await client.login(values);
        if(response&&response.status===200){
            const jwt=response.data;
            sessionStorage.setItem(
                "token",
                JSON.stringify({token:jwt.token})
            );
          
          toast.success("You logged in successfully");
    

          const userInfoResponse=await client.getUserInfo();
          if(userInfoResponse&&userInfoResponse.status===200){
              const userInfo=userInfoResponse.data;
              
              dispatch({
                  type:"LOGIN",
                  item: userInfo.user,
              }
              );
              if(userInfo && userInfo.user){
                  navigate("/");
              }else{
                navigate("/login");
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
    <div>
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

    </div>
  )
}

export default Login