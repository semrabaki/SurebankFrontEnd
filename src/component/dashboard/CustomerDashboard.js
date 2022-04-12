import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import client from '../../service/SureBankClient';
import { toastError } from '../../util/Toast';
import './card.css'
import account from  '../images/dashboard/account.png'
import deposit from  '../images/dashboard/deposit.png'
import withdraw from  '../images/dashboard/withdraw.png'
import transfer from  '../images/dashboard/transfer.png'
import TransactionList from '../transaction/TransactionList';

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
        {statement?( 
             <Container>
                 <fieldset>
                  <Row>
                      <Col lg="3" className="p-3">
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
                      </Col>

                      <Col lg="3" className="p-3">
                          <Card className="card">
                              <CardImg
                              className="cardimg deposit"
                              src={deposit}
                              alt="deposit"
                              />
                              <CardBody>
                                  <CardTitle className="cardtitle">TOTAL DEPOSIT</CardTitle>
                                  <CardText className="cardtext">Last 15 Days</CardText>
                                  <CardText className="cardtext">
                                      {statement?.totalDeposit?statement.totalDeposit+"$":""}
                                  </CardText>
                              </CardBody>

                          </Card>
                      </Col> 

                       <Col lg="3" className="p-3">
                          <Card className="card">
                              <CardImg
                              className="cardimg withdraw"
                              src={withdraw}
                              alt="withdraw"
                              />
                              <CardBody>
                                  <CardTitle className="cardtitle">TOTAL WITHDRAW</CardTitle>
                                  <CardText className="cardtext">Last 15 Days</CardText>
                                  <CardText className="cardtext">
                                      {statement?.totalWithdraw?statement.totalWithdraw+"$":""}
                                  </CardText>
                              </CardBody>

                          </Card>
                      </Col> 

                       <Col lg="3" className="p-3">
                          <Card className="card">
                              <CardImg
                              className="cardimg transfer"
                              src={transfer}
                              alt="transfer"
                              />
                              <CardBody>
                                  <CardTitle className="cardtitle">TOTAL TRANSFER</CardTitle>
                                  <CardText className="cardtext">Last 15 Days</CardText>
                                  <CardText className="cardtext">
                                      {statement?.totalTransfer?statement.totalTransfer+"$":""}
                                  </CardText>
                              </CardBody>

                          </Card>
                      </Col>         
                      </Row>  
                      </fieldset>

                      <Row>
                          <Col>
                                <TransactionList dates={dates} transactions={statement.list}  />
                          </Col>
                      </Row>
                     
             </Container>
        ):null}
    </div>
  )
}

export default CustomerDashboard
