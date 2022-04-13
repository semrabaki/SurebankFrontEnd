import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Input, Row, Table } from 'reactstrap';
import client from '../../service/SureBankClient';

import {itemsCountPerPage as itemCount} from '../../service/SureBankClient';
import { toastError } from '../../util/Toast';
import './pagination.css'

const UserManagement = () => {

    //we need to get all users

    const [usersData,setUsersData] = useState([]);
    const [totalPage,setTotalPage]= useState(0);
    const [itemsCountPerPage,setItemsCountPerPage]=useState(itemCount);
    const [totalItemsCount,setTotalItemsCount]=useState({});

    const [activePage,setActivePage]= useState(0);


    //creating this to get all userrs data
    async function getUsersData(activePage){
        try{
            const usersDataResponse=await client.getAllUsers(activePage);
        if(usersDataResponse&&usersDataResponse.status===200){
            // content object has all user list
           const usersData= usersDataResponse.data.content;
           setUsersData(usersData);
           setTotalPage(usersDataResponse.data.totalPage);
           setTotalItemsCount(usersDataResponse.data.totalElements);
           setItemsCountPerPage(usersDataResponse.data.size);
        }
        }
        catch(error){
            toastError(error);    
        }
    }
//when the page loaded
    useEffect(()=>{
        getUsersData(activePage);    
    },
    [])
//when we load the users data when active page change 
    useEffect(()=>{
        getUsersData(activePage);    
    },[activePage])


    function handlePageChange(pageNumber){
        setActivePage(pageNumber-1);
        getUsersData(pageNumber-1);
    }

  return (
       <Container>
        <Row>
            <Col className="text-center p-3">
                <h1>Users</h1>  
                {
                    usersData && usersData.length > 0 ? (
                     <Table responsive striped hover>
                         <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>SSN</th>
                                <th>E-mail</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Roles</th>
                                <th>Enabled</th>
                            </tr>
                         </thead>
                         <tbody>
                              {usersData.map((user,i)=>(
                                  <tr key={i}>
                                       <td>{user.firstName}</td>
                                       <td>{user.lastName}</td>
                                       <td>{user.ssn}</td>
                                       <td>{user.email}</td>
                                       <td>{user.phoneNumber}</td>
                                       <td>{user.address}</td>
                                       {/* since the roles has array we need to iterate it with map */}
                                        <td>{user.roles.map((role,i)=>
                                        i===user.roles.length-1?role:role+", "
                                       )}</td>
                                       {/* we are putting checkboz input */}
                                       <td><Input type="checkbox" checked={user.enabled}/></td>
                                         {/* when i click the button i want to update user so i need to go an other page. So i need to add link component over here */}
                                       <td><Link to={`/user-edit/${user.id}`}><Button color="warning">Update</Button></Link></td>         

                                  </tr>
                              ))}  
                         </tbody>

                     </Table>
                    ):(
                    <p>User List Empty</p>
                        )}
            </Col>
        </Row>

        <Row>
            <Col className="text-center p-3">
            {/* spring boot requires it as 0 but pagination requires it as 1 */}
                <Pagination
                 activePage={activePage+1}
                 itemsCountPerPage={itemsCountPerPage}
                 totalItemsCount={totalItemsCount}
                 totalPages={totalPage}
                 pageRangeDisplayed={10}
                 onChange={handlePageChange}
                />
                 
            </Col>
        </Row>
</Container>
  )
}

export default UserManagement