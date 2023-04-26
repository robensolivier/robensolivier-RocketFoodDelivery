import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import RestaurantCard from '../other/restaurantCard';

export default function Restaurants({ navigation}) {
  const [rating, setRating] = useState('')
  const [price, setPrice] = useState('')
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {

    const getRestaurants = async () => {
        
        try {
            const fetchResponse = await fetch(`http://localhost:3000/api/restaurants?price_range=${price}&rating=${rating}`);
            const data = await fetchResponse.json();
            if(data.error){
              alert('Response Error')
            }
            else{
              setRestaurants(data);
            }
        } catch (e) {
            alert('failed fetch: '+ e.message)
        }   

    };
    getRestaurants()

  },[rating,price]);

  function restaurantList() {
    return restaurants.map((restaurant) => {
      return (
        <Col key={restaurant.id}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu', {restaurant})}>
            <RestaurantCard restaurant={restaurant} key={restaurant.id}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                {'*'.repeat(restaurant.rating)}
              </Text>
            </RestaurantCard>
          </TouchableOpacity>
        </Col>
      );
    });
  }

  function updateRating(item) {
    return setRating(item.rating);
  }

  function updatePriceRange(item) {
    return setPrice(item.range);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Col><h1>Nearby Restaurants</h1></Col>
        <Container fluid className="m-3">
          <Row>
          </Row>
          <Row xs={2} className="me-2">
              <Col><h2>Rating</h2></Col>
              <Col><h2>Price Rating</h2></Col>
              <Col>
                <Form.Select 
                  aria-label="Default select example"
                  className="form-control"
                  id="rating_select"
                  onChange={(e) => updateRating({ rating: e.target.value })}>
                    <option key={0} value={""}>--Select--</option>
                    <option key={1} value={1}>*</option>
                    <option key={2} value={2}>**</option>
                    <option key={3} value={3}>***</option>
                    <option key={4} value={4}>****</option>
                    <option key={5} value={5}>*****</option>
                </Form.Select>
              </Col>
              <Col>
              <Form.Select 
                  aria-label="Default select example"
                  className="form-control"
                  id="range_select"
                  onChange={(e) => updatePriceRange({ range: e.target.value })}>
                    <option key={0} value={null}>--Select--</option>
                    <option key={1} value={1}>$</option>
                    <option key={2} value={2}>$$</option>
                    <option key={3} value={3}>$$$</option>
                </Form.Select>
              </Col>
                    <Col><h1>Restaurants</h1></Col>
          </Row>
          <Row xs={2} className="me-2">
            {restaurantList()}
          </Row>
          </Container>
        </ScrollView>
  )
}

