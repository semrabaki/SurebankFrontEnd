import React from "react";
import { useState } from "react";
import client from "../../service/SureBankClient";
import moment from "moment";
import "./card.css";
import { toastError } from "../../util/Toast";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import account from '../images/dashboard/account.png'

const CustomerDashboard = () => {
  const [statement,setStatement]=useState({});
const [dates,setDates]=useState({});

const getStatement=async()=>{
   try{
       const date=new Date();
       const today=moment(date).format("YYYY-MM-DD");
       const before=moment(date.setDate(date.getDate()-14)).format("YYYY-MM-DD");

       setDates({startDate:before,endDate:today});

       const response=await client.getCustomerStatement(before,today);
       if(response&&response.status===200){
           setStatement(response.data);
       }
   }catch(error){
        toastError(error);
   }
}

useEffect(()=>{
    getStatement();
},[])


  return (
      <div>
      debugger;
        {statement?( 
             <Container>
                 <fieldset>
                          <Card className="card">
                              <CardImg
                              className="cardimg account"
                              src={account}
                              alt="account"
                              />
                              <CardBody>
                                  <CardTitle className="cardtitle">ACCOUNT NUMBER</CardTitle>
                                  <CardText className="cardtext">
                                      {statement?.account?.accountNumber?statement.account.accountNumber:""}
                                  </CardText>
                                  <CardText className="cardtext">
                                      {statement?.account?.accountBalance?statement.account.accountBalance+"$":""}
                                  </CardText>
                              </CardBody>

                          </Card>
          </fieldset>
        </Container>
      ) : null}
    </div>
  );
};

export default CustomerDashboard;
