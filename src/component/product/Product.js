import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import './product.css'

const Product = ({benefit,type,price,image}) => {
  return (
    <Container>
        <Row>
            <Col>
            {/*  */}
                <h1>{type}</h1>
                <p>{benefit}</p>
                <p className='product_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </Col>
            <Row>
                <Col className="text_center">
                    <img className='card__img' src={image} alt=""></img>
                </Col>
            </Row>
        </Row>
    </Container>
  )
}

export default Product