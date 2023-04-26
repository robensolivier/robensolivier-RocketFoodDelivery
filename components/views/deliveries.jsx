import React, {useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import CenteredIcon from '../other/centeredIcon';
import DeliveryModal from '../other/deliveryModal'

import {StyleSheet,Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Deliveries() {
  const[deliveries, setDeliveries] = useState([]);
  const [user, setUser] = useState({});
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {

    async function getUserFromLocal(){
      try{
        const userData = await AsyncStorage.getItem('@user');
        if(userData){
          setUser(JSON.parse(userData));
        }
        else{
          throw Error('User data not present.')
        }
      }
      catch(error){
        alert(error.message);
      }
    }
    getUserFromLocal();
  },[]);

  useEffect(() => {
    async function fetchCourierOrders(){

      try{
        const response = await fetch(`http://localhost:3000/api/orders?id=${user.courier_id}&type=courier`)
        const data = await response.json();
        if(data.error){
          alert(`Error: ${data.error}`)
        }
        else{
          setDeliveries(data);
        }
      }
      catch(error){
        alert(error.message);
      }

    }
    fetchCourierOrders();
  },[user]);

  function deliveriesList() {
    return deliveries.map((delivery) => {
        return (
            <Row key={delivery.id} className='text-center m-1'>
              <Col xs={2}> {delivery.id} </Col>
              <Col xs={4} className='text-truncate'> {delivery.customer_address.street_address} </Col>
              {/* <Col xs={4}> {delivery.status} </Col> */}
              {generateStatus(delivery.status)}
              <Col xs={2} key={delivery.id} >
                <TouchableOpacity key={delivery.id} onPress={() => { setActiveModal(delivery.id)}}>
                  <CenteredIcon />
                </TouchableOpacity>
                {activeModal === delivery.id && (
                  <DeliveryModal
                    show={true}
                    onHide={() => setActiveModal(null)}
                    delivery={delivery}
                  />
                )}
              </Col>
            </Row>
        );
    });
  }
  
  function generateStatus(status){
    let styling = {color: '#ffffff'};
    if(status == 'delivered'){
      styling['backgroundColor'] = '#609475'
    }
    else if(status == 'pending'){
      styling['backgroundColor'] = '#851919'
    }
    else{
      styling['backgroundColor'] = '#F0CB67'
    }

    return (<Col xs={4} style={styling} className='rounded mt-1'><div> {status} </div> </Col>)

  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container fluid className='align-items-center'>
          <Row className='p-2'>
              <Col xs={8}> <h1>My Deliveries</h1> </Col>
          </Row>
          <Row className='row-header text-center m-1'>
              <Col xs={2}> Order ID </Col>
              <Col xs={4}> Address </Col>
              <Col xs={4}> Status </Col>
              <Col xs={2}> View </Col>
          </Row>
          {deliveriesList()}
      </Container>
    </ScrollView>
  )
}