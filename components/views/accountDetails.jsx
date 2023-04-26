import React, {useEffect, useState} from 'react'
import {Container, Form, Button, Row, Col} from 'react-bootstrap'

export default function AccountDetails({accountType}) {
    const type = 'Customer';
    const pEmail = 'lynell@skiles.name';
    return (
        <Container fluid className='p-5 vh-100 white-container'>
            <Row className='pt-1 pb-1'>
                <Col>
                    <h1><b>My Account</b></h1>
                </Col>
            </Row>
            <Row className='pt-1 pb-1'>
                <Col>
                    <b>Logged in as: {type} </b>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                    <Form.Group className="mb-3" controlId="primaryEmail">
                        <Form.Label>Primary Email (Read Only)</Form.Label>
                        <Form.Control type="email" placeholder={pEmail} disabled/>
                        <Form.Text className="text-muted">
                        Email used to login to the application.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="secondaryEmail">
                        <Form.Label>{type} Email </Form.Label>
                        <Form.Control type="email" placeholder="Enter secondary email" />
                        <Form.Text className="text-muted">
                        Email used for your {type} account.
                        </Form.Text>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>{type} phone</Form.Label>
                        <Form.Control type="text" placeholder={`Enter ${type.toLowerCase()} phone`} />
                        <Form.Text className="text-muted">
                            Phone number for your {type.toLowerCase()} account.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
      );
}