import React from 'react'
import { Button, Col, Container, Form, FormFeedback, Input, InputGroup, InputGroupText, Row, Spinner } from 'reactstrap';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DispatchContext } from '../../App'
import "./logout.css"

const Logout = () => {

    const dispatch= useContext(DispatchContext); 
    const navigate=useNavigate();

    const handleYes=()=>{
      debugger;
        sessionStorage.clear("token");
        dispatch({   // with this we are changing the state
            type:"LOGOUT",
            item:null      //I want to delete user info that is why i put null
        });

        navigate("/");
    }

    const handleNo=()=>{
        navigate(-1); //it is for previous page it is goign to go to previous page
    }

  return (
    <Container>
    <Row>
        <Col>
            <fieldset>
                <h1>Are you really want to logout</h1>
                <Button
                  color="primary"
                  className="button"
                  onClick={handleYes}
                >Yes</Button>

                <Button
                  color="secondary"
                  className="button"
                  onClick={handleNo}
                >No</Button>
            </fieldset>
        </Col>
    </Row>

</Container>
  )
}

export default Logout