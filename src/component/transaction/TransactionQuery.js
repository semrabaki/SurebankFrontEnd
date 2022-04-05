import { Field, Formik } from 'formik'
import React from 'react'
import TransactionList from './TransactionList'
import * as Yup from 'yup'
import { Col, Container, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';

const TransactionQuerySchema = Yup.object().shape({
    startDate: Yup.date().required("Please provide a start date"),
    endDate: Yup.date()
      .required("Please provide an end date")
      .min(Yup.ref("startDate"), "end date can't be before start date"),
  });

const TransactionQueryForm=(props)=>(
    <Container>
        <fieldset>
      <legend>Transactions</legend>
      <Row className="justify-content-start">
        <Col lg="2" className="text-center p-3">
          <FormGroup>
            <Label>Start Date</Label>
            <Input
              tag={Field}
              name="startDate"
              type="date"
              invalid={props.errors.startDate && props.touched.startDate}
            />
            <FormFeedback>{props.errors.startDate}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      </fieldset>
    </Container>
)

const TransactionQuery = () => {

    const submitForm=async(values,actions)=>{
        try{

            const {startDate,endDate}=values;


        }catch(error){

        }
    }



  return (<>
    <div>
        <Formik 
        initialValues={{
            startDate:"",
            endDate:""
        }}
        validationSchema={TransactionQuerySchema}
        onSubmit={(values,actions)=>{
            submitForm(values,actions);
        }}
        >
        component={TransactionQueryForm}

        </Formik>
    </div>
    <div><TransactionList/></div>
    </>
  )
}

export default TransactionQuery