import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

export default function OrderModal({ order, show, onHide }) {
  const Products = order.products;

  function productList() {
    return Products.map((product) => {
        return (
          <Row key={product.product_id}>
            <Col> {product.product_name} </Col>
            <Col> x{product.quantity} </Col>
            <Col> {product.total_cost} </Col>
          </Row>
        );
    });
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {order.restaurant_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          {productList()}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        TOTAL: {order.total_cost}
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}


// function App() {
//     const [modalShow, setModalShow] = useState(false);
  
//     return (
//       <>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//           Launch modal with grid
//         </Button>
  
//         <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
//       </>
//     );
//   }
  
//   render(<App />);