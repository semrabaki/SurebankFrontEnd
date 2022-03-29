import React from "react";
import { Container, Row, Col } from "reactstrap";
import about from "../images/about/ebank.png";
import about1 from "../images/about/about1.png";
import about2 from "../images/about/about2.png";
import "./about.css";
const About = () => {
  return (
    <Container id="About">
      <Row>
        <Col lg="5" md="8" >
            <div className="about">
                <img src={about} alt="about" />
            </div>
          
        </Col>
        <Col lg={{ size: 6,  offset: 1}}>
          <Row>
            <Col>
              <h6>About The E-Banking</h6>
              <h2>
                Everything is possible. We can help you achieve your goals!
              </h2>
              <p>
                Internet Banking is a convenient way to do banking from the
                comfort of your home or office. Avoid the queue or delays and
                try our simple and secure Internet Banking facility for an
                unmatched online banking experience.
              </p>
            </Col>
          </Row>
          <Row className="media">
            <Col sm="2" md="3" lg="4" className="media-left">
            <div className="media-1">
                   <img src={about1} alt="img1" /> 
                </div>
            </Col>
            <Col className="media-body">
              <p>
                Just login today using your User ID and Password to experience
                the Internet Banking
              </p>
            </Col>
          </Row>
          <Row className="media">
            <Col sm="2" md="3" lg="4"   className="media-left" >
                <div className="media-2">
                   <img src={about2} alt="img2" /> 
                </div>
              
            </Col>
            <Col  className="media-body">
              <p>
                With E-Banking Check Account Statement , Do Payments using Net
                Banking , Order Cheque Book and many more financial and
                non-financial services
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default About;