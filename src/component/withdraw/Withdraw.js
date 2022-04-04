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
import "./withdraw.css"

const WithDrawSchema = Yup.object().shape({
  amount: Yup.number().test("is-decimal", "invalid decimal", (value) =>
    (value + "").match(/^\d+(\.\d{1,2})?$/)
  ),
  comment:Yup.string().required("Please provide a comment")
});

const WithDrawForm = (props) => (
  <Container>
    <fieldset>
      <legend>Withdraw</legend>
      <Form>
        <Row className="justify-content-center">
          <Col lg="4" className="p-3">
            <FormGroup>
              <Label>Amount</Label>
              <Input
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
              className="withdraw-btn"
            >
              Withdraw
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
const Withdraw = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  return (
    <div>
      {!state.userInfo && navigate("/login")}
      {state.userInfo && state.userInfo.userName && (
        <div>
          <div>
            <Formik
              initialValues={{ amount: "", comment: "" }}
              validationSchema={WithDrawSchema}
              onSubmit={async (values, actions) => {
                try {
                  const response = await client.withdraw(values);
                  if (response && response.status === 201) {
                    toast.success(response.data.message, {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    actions.resetForm();
                  }
                } catch (error) {
                  
                     //toastError(error);
                    toast.error("Withdraw failed. Please check!");
                }
              }}
              component={WithDrawForm}
            ></Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;