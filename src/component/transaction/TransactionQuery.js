import React from "react";
import TransactionList from "./TransactionList";
import * as Yup from "yup";
import {
  Button,
  Col,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { Field, Formik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import client from "../../service/SureBankClient";
import { toastError } from "../../util/Toast";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const TransactionQuerySchema = Yup.object().shape({
  startDate: Yup.date().required("Please provide a start date"),
  endDate: Yup.date()
    .required("Please provide an end date")
    .min(Yup.ref("startDate"), "end date can't be before start date"),
});

const TransactionQueryForm = (props) => (
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
        <Col lg="2" className="text-center p-3">
          <FormGroup>
            <Label>End Date</Label>
            <Input
              tag={Field}
              name="endDate"
              type="date"
              invalid={props.errors.endDate && props.touched.endDate}
            />
            <FormFeedback>{props.errors.endDate}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>

      <Row className="justify-content-start">
        <Col lg="4" className="text-center p-3">
          <Button
            color="primary"
            disabled={props.isSubmitting}
            onClick={props.submitForm}
          >
            Search
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-start">
          {props.isSubmitting && <Spinner> </Spinner>}
        </Row>
    </fieldset>
  </Container>
);
const TransactionQuery = (props) => {
const [dates,setDates]=useState({});
const [statement,setStatement]=useState({});



  const submitForm = async (values, actions) => {
    try{
      // we are converting the date the format we want
      const {startDate,endDate}=values;
      const d1= moment(startDate,"YYYY-MM-DD");
      const d2= moment(endDate,"YYYY-MM-DD");

    // finding the days between to day
    const diff=  moment.duration(d2.diff(d1)).asDays();

    if(diff>15){
      toast.error("Between two dates must be max. 15 days", {
        position:toast.POSITION.TOP_CENTER
      });
      actions.setSubmitting(false);
      return;
    }


    setDates({startDate:startDate,endDate:endDate});
   const response= await client.getCustomerStatement(startDate,endDate);

   if(response && response.status===200){
     setStatement(response);

   }

    }catch(error){
      toastError(error);

    }
    actions.setSubmitting(false);
  }
 return (<>
    <div>
        <Formik
          initialValues={{
            startDate: "",
            endDate: "",
          }}
          validationSchema={TransactionQuerySchema}
          onSubmit={(values, actions) => {
            submitForm(values, actions);
          }}
          component={TransactionQueryForm}
        ></Formik>
      </div>
    {/* <div><TransactionList dates={dates} transactions={statement.list}/></div> */}
    </>
  );
};
export default TransactionQuery