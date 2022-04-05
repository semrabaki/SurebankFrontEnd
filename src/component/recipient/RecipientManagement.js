import { Field, Formik } from 'formik'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import * as Yup from 'yup'
import client from '../../service/SureBankClient'
import { toastError } from '../../util/Toast';
import ConfirmDialog from './ConfirmDialog';
import RecipientList from './RecipientList';
// import ConfirmDialog from './ConfirmDialog';
// import RecipientList from './RecipientList';


const RecipientSchema=Yup.object().shape({
    name:Yup.string().required("It is required"),
    accountNumber:Yup.number().required("It is required")    
});

const RecipientForm=(props)=>(
    <Container>
        <fieldset>
             <legend>Recipient Management</legend>

             <Form>
                   <Row className="justify-content-start">
                       <Col lg="2" className="text-center p-3">
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                  tag={Field}
                                  name="name"
                                  type="text"
                                  invalid={props.errors.name && props.touched.name}
                                >
                                </Input>

                                <FormFeedback>{props.errors.name}</FormFeedback>
                            </FormGroup>
                       </Col>


                       <Col lg="2" className="text-center p-3">
                            <FormGroup>
                                <Label>Account Number</Label>
                                <Input
                                  tag={Field}
                                  name="accountNumber"
                                  type="text"
                                  invalid={props.errors.accountNumber && props.touched.accountNumber}
                                >
                                </Input>

                                <FormFeedback>{props.errors.accountNumber}</FormFeedback>
                            </FormGroup>
                       </Col>
                       </Row> 

                       <Row className="justify-content-start">
                           <Col lg={{size:"2",offset:"2"}} className="text-center p-3">
                                <Button
                                 color="primary"
                                 disabled={props.isSubmitting}
                                 onClick={props.submitForm}
                                 >Add Recipient
                                    </Button>    
                           </Col>

                       </Row>
             </Form>

        </fieldset>
    </Container>
)




const RecipientManagement = () => {


    const [recipients, setRecipients] = useState([]);

    //this will hold the current recipient that is selected on the recipient management page.In order to dleete the recipient we need to pass it to
    //RecipientList component as a props because it shows the recipients list in the recipient management component
    const [currentRecipient,setCurrentRecipient]=useState({});

    const [showModal, setShowModal]=useState(false);

    async function getRecipients() {
        try {
          const response = await client.getRecipients();
          if (response && response.status === 200) {
            const data = response.data;
            setRecipients(data.recipients);
          }
        } catch (error) {
          toastError(error);
        }
      }

      useEffect(() => {
        getRecipients();
      }, []);



      const deleteRecipient= async()=>{
          try{
            // currentRecipient comes from
            const response= await client.deleteRecipient(currentRecipient.id);
            if(response&&response.status===200){

              // if i am successfull for adding I want to call here
                await getRecipients();
                // this message comes from backend side
                toast.success(response.data.message); 
            }
            setShowModal(false);

          }catch(error){
              setShowModal(false);
              toastError(error);

          }
      }

      const openDialogHandler=(recipient)=>{
          //I am setting current recipient as the one I want to delete
        setCurrentRecipient(recipient);
        //i am opening model thing to ask are you sure to delete or not 
        setShowModal(true); 
     }
    
    
  return (
    <div>
        <Formik
         initialValues={{
             name:"",
             accountNumber:""
         }
         }
         validationSchema={RecipientSchema}
         onSubmit={ async (values,actions)=>{
               try{
                 const response=  await client.addRecipient(values);
                 if(response.status===201){
                     if(response.data.success){
                         toast.success(response.data.message,{
                             position:toast.POSITION.TOP_CENTER
                         });
                     }
                     await getRecipients();
                     actions.resetForm();
                 }
               }catch(error){
                    toastError(error);
               }

               actions.setSubmitting(false);
           }  
        }
        component={RecipientForm}

>

        </Formik>
        <div>
        {/* in here I am putting openDialogHandler function into the dialogHandler as a prop to call in the recipient list*/}
        {/* created recipient list component and we  put the recipients which is called with getREcipients() function as prop  */}
        {/*before I delete I want to open a confirmation dialog for confirming deletion operationthat is why I am sending dialoghandler props and calling
        openDialogHandler function to the repicient list component  */}
        <RecipientList dialogHandler={openDialogHandler} recipients={recipients}/>

        {/* I am sending props to confirmDialog component to show the related info on the screen*/}
        <ConfirmDialog
            recipient={currentRecipient}
            isOpen={showModal}
            delete={deleteRecipient}
            close={setShowModal}
        />
        </div>
        
    </div>
  )
}

export default RecipientManagement
