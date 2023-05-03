import React, {useEffect, useState} from 'react'
import {StyleSheet,Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import Container from 'react-bootstrap/Container';
import OrderModal from '../other/orderModal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
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
    async function fetchCustomerOrders(){

      try{
        const response = await fetch(`http://localhost:3000/api/orders?id=${user.customer_id}&type=customer`)
        const data = await response.json();
        if(data.error){
          alert(`Error: ${data.error}`)
        }
        else{
          setOrders(data);
        }
      }
      catch(error){
        alert(error.message);
      }

    }
    console.log("useEffect in fetchCustomers")
    fetchCustomerOrders();
  },[user]);

  function ordersList() {
    return orders.map((order) => {
        return (
            <tr key={order.id}>
              <td> {order.restaurant_name} </td>
              <td> {order.status} </td>
              <td>
              <div key={order.id}>
              <TouchableOpacity key={order.id} onPress={() => { setActiveModal(order.id)}}>
                <FontAwesomeIcon icon={faSearch} />
              </TouchableOpacity>
              {activeModal === order.id && (
                <OrderModal
                  show={true}
                  onHide={() => setActiveModal(null)}
                  order={order}
                />
              )}
              </div>
              </td>
            </tr>
        );
    });
  }

  return (
    <>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container fluid className="m-3">
          <Row>
              <Col><h1>My Orders</h1></Col>
          </Row>
          <Row>
          <Table>
          <thead>
                <tr>
                <th>Order</th>
                <th>Status</th>
                <th>View</th>
                </tr>
          </thead>
          <tbody>
            {ordersList()}
          </tbody>
          </Table>
          </Row>
        </Container>
    </ScrollView>
    </>
  )
}