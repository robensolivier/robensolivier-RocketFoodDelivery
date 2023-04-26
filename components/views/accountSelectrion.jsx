import React from 'react'

//React Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import AppLogoV2 from '../../assets/images/AppLogoV2.png';
import AccountSelectionCard from '../other/accountSelectionCard';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

export default function AccountSelection({navigation}) {
  return (
    <Container fluid className="d-flex flex-column vh-100 text-center white-container">
      {/* <Row className='justify-content-center'>
        <Col xs={6} className='mx-auto'> */}
            <Image src={AppLogoV2} className="p-5 logo"/>
        {/* </Col>
      </Row> */}
      <Row>
        <Col xs={6}>
            <AccountSelectionCard accountType={"Courier"} accountIcon={faMugSaucer}/>
        </Col>
        <Col xs={6}>
            <AccountSelectionCard accountType={"Customer"} accountIcon={faMugSaucer}/>
        </Col>
      </Row>
    </Container>
  )
}