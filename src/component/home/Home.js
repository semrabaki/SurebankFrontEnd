import React from 'react'
import About from '../about/About'
import Banner from '../banner/Banner'
import Product from '../product/Product'
import Silver from '../images/product/silver.jpg'
import Gold from '../images/product/gold.jpg'
import Platinum from '../images/product/platinum.jpg'
import Price from '../prize/Prize'
import { Container,Row,Col } from 'reactstrap'
import Footer from '../footer/Footer'

const Home = () => {
  return (
    <div>
        <Banner/>
        <About/>
        <Container id="Products" fluid>
        <Row>
                 <Col lg="4">
                     <Product
                        benefit="Basic package with interactive features. Enjoy up to 20% discount at select restaurants.You don’t have to pay any additional"
                        type="Silver"
                        price={300}
                        image={Silver}
                     />

                 </Col>

                      <Col lg="4">
                     <Product
                        benefit="Paylinn has partnered with leading travel providers to bring offers on airline tickets, hotel stays, car hire and more."
                        type="Gold"
                        price={500}
                        image={Gold}
                     />

                 </Col> 
                 
                 <Col lg="4">
                     <Product
                        benefit="Get up to 5 supplementary cards for your family members. You don’t have to pay any additional fee and can choose the spending limit on each card."
                        type="Platinum"
                        price={1000}
                        image={Platinum}
                     />

                 </Col> 
                </Row> 
        </Container>
        <Price/>
        <Footer/>
      
    </div>
  )
}

export default Home