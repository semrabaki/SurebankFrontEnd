import React from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap'

//when i add props it can recive item from parent component
const RecipientList = (props) => {
  return (
      
    <Container>
         <Row>
             <Col className="text-center p-3">
                  <h1>Recipients</h1>
                 {/* I am using the these three avaliableprops the table component */}
                  <Table responsive striped hover>

                      <thead>
                          <tr>
                              <th>FirstName</th>
                              <th>LastName</th>
                              <th>E-mail</th>
                              <th>Phone Number</th>
                              <th>Account Number</th>
                              <th></th> 
                          </tr>
                      </thead>

                       {/* creating table body */}
                      <tbody>
                           {/* we are passing the table body in here */}
                           {/* props.recipients.map((r,i)=> with this one I am gettng the recipients from parent with a prop  */}
                            {/* r:recipient i:indexofrecipients */}
                          {
                              props.recipients.map((r,i)=>
                                <tr key={i}>
                                    <td>{r.firstName}</td>
                                    <td>{r.lastName}</td>
                                    <td>{r.email}</td>
                                    <td>{r.phoneNumber}</td>
                                    <td>{r.accountNumber}</td>

                                    <td>
                                        <Button color="danger"

                                        //when i click on the button there wlll be a diolog for cinformation of deletion process
                                         onClick={()=>props.dialogHandler(r)} 
                                        >Delete</Button>
                                    </td>
                                </tr>
                              )
                          }

                      </tbody>


                  </Table>

             </Col>
             </Row>   

    </Container>

  )
}

export default RecipientList