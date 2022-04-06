import moment from 'moment';
import React from 'react'
import { Col, Container, Row, Table } from 'reactstrap';

const TransactionList = (props) => {
 
    let sDate;
    let eDate;

    if(props.dates){
        const {startDate,endDate}=props.dates;
        sDate=moment(startDate).format('MM-DD-YYYY');
        eDate=moment(endDate).format('MM-DD-YYYY');
    }

  return (
      <Container>
          <Row>
              <Col className="text-center p-3">
                  <h1>Transactions</h1>
                  {/* eger transaction varsa table create edior */}
                    {props.transactions&&props.transactions.length>0?(
                        <div>
                           <h4>{sDate +"-"+eDate}</h4>     
                              
                              <Table>
                                  <thead>
                                      <tr>
                                          <th>Date</th>
                                          <th>Type</th>
                                          <th>Amount</th>
                                          <th>Balance</th>
                                          <th>Description</th>
                                          {/* {props.isAdmin?<th>Account Number</th>:null}
                                          {props.isAdmin?<th>Name</th>:null} */}
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {/* iterating all transactions by using map  and using key for uniqueness and doing conditional styleing*/}
                                  {
                                        props.transactions.map((tr,i)=>(
                  
                                        <tr key={i} style={
                                            i%2===0?{backgroundColor:"#EDF1F6"}
                                            :{backgroundColor:"#AABFBD"}
                                        }>    
                                        <td>{moment(tr.date).format("MM-DD-YYYY-hh-mm-ss")}</td>
                                        <td>{tr.type}</td>
                                        <td>{tr.amount}</td>
                                        <td>{tr.availableBalance}</td>
                                        <td>{tr.description}</td>
                                        {/* {props.isAdmin&&tr.account?<td>{tr.account.accountNumber}</td>:null}
                                        {props.isAdmin&&tr.account&&tr.account.user?<td>{tr.account.user.firstName+" "+tr.account.user.lastName}</td>:null} */}
                                        </tr>
                                        ))
                                    }  

                                  </tbody>

                              </Table>

                        </div>
                    ):(
                        <p>Transaction List Empty</p>
                    )}


              
              </Col>
          </Row>
      </Container>
  )
}

export default TransactionList