import React from 'react'
import {Formik,Field} from 'formik' //it will be used for form operations
import * as Yup from "yup" //login process
import {toast} from  'react-toastify' //for notification messages
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import moment from 'moment'
import './register.css'
import client from "../../service/SureBankClient";
import {toastError} from "../../util/Toast"



const initialValues={
    firstName:"",
    lastName:"",
    ssn:"",
    dateOfBirth:"",
    email:"",
    address:"",
    phoneNumber:"",
    userName:"",
    roles:["Customer"],
    password:"",
    confirmPassword:""
};
// into shape fucniton we need to give java script object
const validationSchema= Yup.object().shape(
    {
       firstName: Yup.string()
       .required("Please provide First Name")
       .max(15,"Must be max 15 characters"),
    
       lastName: Yup.string()
       .required("Please provide Last Name")
       .max(15,"Must be max 15 characters"),
    
       ssn:Yup.string()
       .required("Please provide ssn")
       .matches(
        /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
        "SSN format must be 000-00-0000"
      ),
      dateOfBirth: Yup.string().required("Please provide your Date of Birth")
      .test("dateOfBirth", "Please choose a valid date of birth. Your age must be equal or greater than 18", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      }),
    
      email:Yup.string()
      .email("Please provide valid email")
      .required("Please provide email"),
    
      address:Yup.string()
      .required("Please provide address")
      .min(5,"Must be max 5 characters")
      .max(200,"Must be max 200 characters"),
    
      phoneNumber:Yup.string()
      .required("Please provide phone number")
     .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "SSN format must be 000-00-0000"
      ),
      
      userName:Yup.string()
      .required("Please provide a user name")
      .min(5,"Must be max 5 characters")
      .max(20,"Must be max 20 characters"),
    
      password:Yup.string().required("Please provide a password"),
     confirmPassword:Yup.string().oneOf(
         [Yup.ref("password"),null],
         "Password must match"
     )
    
    }
    
    )
// values means our form values and action is type of action
//async because it is  service.register fucntion return async 
    const submitForm= async (values,action)=>{
        try{
            //we are waitiing for register fucntion response
            //when we put await to get the data from the register function run and returns 
        const response=await client.register(values);
        // java objecsi javascript objesine donusuor
        //bu donusumu jackson  saglior
         if(response.status===201 && response.data.success){
             toast.success(response.data.message,{
                 position:toast.POSITION.TOP_CENTER
             })
    
             action.resetForm();
         }
    
        }catch(err){
           toastError(err);
        }
    }

const RegistrationForm=(props)=>(
    <Container>
    <fieldset>
    <legend>Register</legend>    
    <Form>
        <Row className="justify-content-start">
            <Col lg="3" className="text-center p-3">
                  <FormGroup>
                      <Label for="firstName"> First Name</Label>
                      <Input
                    //   formikten gelen field i kullanmak icin tag yaziyoruz
                        tag={Field}
                        name="firstName"
                        type="text"
                        // it means that when you tuch the forst ame field it hsould vlaidate it
                        invalid={props.errors.firstName&&props.touched.firstName}
                      />
                      {/* to show validation message we need to add formfeedback */}
                      <FormFeedback>{props.errors.firstName}</FormFeedback>
                      </FormGroup> 


            </Col>   

            <Col lg="3" className="text-center p-3">
                  <FormGroup>
                      <Label for="lastName"> Last Name</Label>
                      <Input
                        tag={Field}
                        name="lastName"
                        type="text"
                        invalid={props.errors.lastName&&props.touched.lastName}
                      />

                      <FormFeedback>{props.errors.lastName}</FormFeedback>
                      </FormGroup> 


            </Col>   

        </Row>

        <Row className="justify-content-start">
            <Col lg="3" className="text-center p-3">
                  <FormGroup>
                      <Label for="ssn">SSN</Label>
                      <Input
                        tag={Field}
                        name="ssn"
                        type="text"
                        invalid={props.errors.ssn&&props.touched.ssn}
                      />

                      <FormFeedback>{props.errors.ssn}</FormFeedback>
                      </FormGroup> 


            </Col>   

            <Col lg="3" className="text-center p-3">
                  <FormGroup>
                      <Label for="phoneNumber"> Phone Number</Label>
                      <Input
                        tag={Field}
                        name="phoneNumber"
                        type="text"
                        invalid={props.errors.phoneNumber&&props.touched.phoneNumber}
                      />

                      <FormFeedback>{props.errors.phoneNumber}</FormFeedback>
                      </FormGroup> 
            </Col>   

        </Row>


        <Row className="justify-content-start">
            <Col lg="3" className="text-center p-3">
                  <FormGroup>
                      <Label for="dateOfBirth">Date of Birth</Label>
                      <Input
                        tag={Field}
                        name="dateOfBirth"
                        type="date"
                        invalid={props.errors.dateOfBirth&&props.touched.dateOfBirth}
                      />

                      <FormFeedback>{props.errors.dateOfBirth}</FormFeedback>
                      </FormGroup> 


            </Col>   

            <Col lg="3" className="text-center p-3">
                  <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        tag={Field}
                        name="email"
                        type="email"
                        invalid={props.errors.email&&props.touched.email}
                      />

                      <FormFeedback>{props.errors.email}</FormFeedback>
                      </FormGroup> 
            </Col>   
        </Row>


        <Row className="justify-content-start">
            <Col lg="6" className="text-center p-3">
                  <FormGroup>
                      <Label for="address">Address</Label>
                      <Input
                        tag={Field}
                        name="address"
                        component="textarea"
                        rows="2"
                        invalid={props.errors.address&&props.touched.address}
                      />

                      <FormFeedback>{props.errors.address}</FormFeedback>
                      </FormGroup> 
            </Col>    
        </Row>
        <Row className="justify-content-start">
            <Col lg="6" className="text-center p-3">
                  <FormGroup>
                      <Label for="userName">User Name</Label>
                      <Input
                        tag={Field}
                        name="userName"
                        type="text"
                        invalid={props.errors.userName&&props.touched.userName}
                      />

                      <FormFeedback>{props.errors.userName}</FormFeedback>
                      </FormGroup> 
            </Col>    
        </Row>

        <Row className="justify-content-start">
            <Col lg="3" className="text-center p-3">
                  <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        tag={Field}
                        name="password"
                        type="password"
                        invalid={props.errors.password&&props.touched.password}
                      />

                      <FormFeedback>{props.errors.password}</FormFeedback>
                      </FormGroup> 


            </Col>   

            <Col lg="3" className="text-center p-3">
                  <FormGroup>
                      <Label for="confirmPassword">Confirm Password</Label>
                      <Input
                        tag={Field}
                        name="confirmPassword"
                        type="password"
                        invalid={props.errors.confirmPassword&&props.touched.confirmPassword}
                      />

                      <FormFeedback>{props.errors.confirmPassword}</FormFeedback>
                      </FormGroup> 
            </Col>   
        </Row>

        <Row >
            <Col lg="6" className="text-center p-3">
                  <Button color="primary" className="register__btn" onClick={props.submitForm}>Submit</Button>
            </Col>    
        </Row>

    </Form>
    </fieldset>

</Container>
)

const Register = () => {
  return (
    <div>

        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        component={RegistrationForm}
        >

        </Formik>
    </div>
  );
}

export default Register