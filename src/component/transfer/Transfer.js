import { Field, Formik } from "formik";
import React from "react";
import client from "../../service/SureBankClient";
import * as Yup from "yup";
import { toast } from "react-toastify";
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
import { useContext } from "react";
import { StateContext } from "../../App";
import { useState } from "react";
import { toastError } from "../../util/Toast";
import { useEffect } from "react";

import "./transfer.css"
const TransferSchema = Yup.object().shape({
  recipientNumber: Yup.number().required("Please provide a recipient"),
  amount: Yup.number().test("is-decimal", "invalid decimal", (value) =>
    (value + "").match(/^\d+(\.\d{1,2})?$/)
  ),
  comment: Yup.string().required("Please provide a comment"),
});



const Transfer = () => {
  const state = useContext(StateContext);
  const [recipients, setRecipients] = useState([]);

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


  const TransferForm = (props) => (
    <Container>
      <fieldset>
        <legend>Transfer</legend>
        <Form>
          <Row className="justify-content-start">
            <Col lg="4" className="p-3">
              <FormGroup>
                <Label>Recipient</Label>
                <Input
                  name="recipientNumber"
                  type="select"
                  tag={Field}
                  component="select"
                  invalid={
                    props.errors.recipientNumber && props.touched.recipientNumber
                  }
                >
                  <option value="" key="0" />
  
                  {recipients &&
                    recipients.map((r) => (
                      <option value={r.accountNumber} key={r.id}>
                        {" "}
                        {r.firstName + " " + r.lastName + " " + r.accountNumber}
                      </option>
                    ))}
                </Input>
                <FormFeedback>{props.errors.recipientNumber}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
  
          <Row className="justify-content-start">
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
                <Input
                  tag={Field}
                  name="comment"
                  type="text"
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
                className="transfer-btn"
              >
                Transfer
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

  return (
    <div>
      <Formik
        initialValues={{ recipientNumber: "", amount: "", comment: "" }}
        validationSchema={TransferSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await client.transfer(values);
            if (response && response.status === 201) {
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
              actions.resetForm();
            }
          } catch (error) {
            //toastError(error);
            toast.error("Transfer failed. Please check!");
          }
        }}
        component={TransferForm}
      ></Formik>
    </div>
  );
};

export default Transfer;