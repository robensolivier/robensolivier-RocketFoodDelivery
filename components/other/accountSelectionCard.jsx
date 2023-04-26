import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'

export default function AccountSelectionCard(props) {
  return (
    <Card>
        <Container className="d-flex justify-content-center">
            <FontAwesomeIcon icon={props.accountIcon} size={140} />
        </Container>
        <Card.Body>
        <Card.Title>{props.accountType}</Card.Title>
        </Card.Body>
    </Card>
  )
}