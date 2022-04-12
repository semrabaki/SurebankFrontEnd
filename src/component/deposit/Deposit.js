import React, { useContext } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import client from "../../service/SureBankClient";
import {toast } from "react-toastify";

import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { StateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./deposit.css"

const DepositSchema = Yup.object().shape({
  amount: Yup.number().test("is-decimal", "invalid decimal", (value) =>
    (value + "").match(/^\d+(\.\d{1,2})?$/)
  ),
  comment:Yup.string().required("Please provide a comment")
});

const DepositForm = (props) => (
  <Container>
    <fieldset>
      <legend>Deposit</legend>
      <Form>
        <Row className="justify-content-center">
          <Col lg="4" className="p-3">
            <FormGroup>
              <Label>Amount</Label>
              <Input
              //this name should be amount because in the backend side it is named as amount
                name="amount"
                type="text"
                tag={Field}
                invalid={props.errors.amount && props.touched.amount}
              />
              <FormFeedback>{props.errors.amount}</FormFeedback>
            </FormGroup>
          </Col>
          <Col lg="4" className="p-3">
            <FormGroup>
              <Label>Comment</Label>
              <Input tag={Field} name="comment" type="text"
               invalid={props.errors.comment && props.touched.comment} 
              />
                <FormFeedback>{props.errors.comment}</FormFeedback>
            </FormGroup>
          </Col>
          <Col lg="4" className="text-center p-3">
            <Button
              color="primary"
              disabled={props.isSubmitting}
              onClick={props.submitForm}
              className="deposit-btn"
            >
              Deposit
            </Button>
          </Col>
        </Row>
        <Row className="text-align-center">
          <Col className="text-center">
            {props.isSubmitting && <Spinner> </Spinner>}
          </Col>
        </Row>
      </Form>
    </fieldset>
  </Container>
);
const Deposit = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  return (
    <div>
    {/* this code was used before we add the privateroute component it is basically checking if the user info avaliable use can go to deposit page */}
      {/* {state.userInfo && state.userInfo.userName && ( */}
        <div>
          <div>
            <Formik
              initialValues={{ amount: "", comment: "" }}
              validationSchema={DepositSchema}
              onSubmit={async (values, actions) => {
                try {
                  const response = await client.deposit(values);
                  if (response && response.status === 201) {
                    toast.success(response.data.message, {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    actions.resetForm();
                  }
                } catch (error) {
                  
                     //toastError(error);
                    toast.error("Deposit failed. Please check!");
                }
              }}
              component={DepositForm}
            ></Formik>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default Deposit;