import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import { CloseButton } from 'react-bootstrap';

export default function DeliveryModal({ delivery, show, onHide }) {
  const Products = delivery.products;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  function productList() {
    return Products.map((product) => {
        return (
          <Row key={product.product_id}>
            <Col xs={7}> {product.product_name} </Col>
            <Col xs={2}> x{product.quantity} </Col>
            <Col xs={3} className="d-flex justify-content-end"> {formatter.format(product.total_cost/100)} </Col>
          </Row>
        );
    });
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" show={show} onHide={onHide} >
      <Modal.Header className='m-1 close-button' style={{backgroundColor: '#222126'}}>
        <Container fluid className='text-center'>
            <Row>
                <Col xs={11}>
                    <Container fluid>
                    <Row>
                        <Col xs={12}> <h2 className='modal-header-title'>Delivery Details</h2> </Col>
                    </Row>
                    <Row>
                        <Col xs={12}><div className='modal-header-subtitle'>Status: {delivery.status}</div></Col>
                    </Row>
                    </Container>
                </Col>
                <Col xs={1}>
                    <CloseButton variant="white" onClick={onHide} />
                </Col>
            </Row>
        </Container>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container fluid className='p-1'>
            <Row>
                <Col>
                    Delivery Address: {delivery.customer_address.street_address}
                </Col>
            </Row>
            <Row>
                <Col>
                    Restaurant: {delivery.restaurant_name}
                </Col>
            </Row>
            <Row>
                <Col>
                    Order Date: {delivery.date_created.split('T')[0]}
                </Col>
            </Row>
        </Container>
        <Container fluid className='p-1'>
            <Row>
                <Col> <b>Order Details</b>  </Col>
            </Row>
            {productList()}
        </Container>
      </Modal.Body>
      <Modal.Footer className='m-1 border-dark'>
        <b>TOTAL: {formatter.format(delivery.total_cost/100)}</b>
      </Modal.Footer>
    </Modal>
  );
}