import React, {useState, useEffect} from 'react'
import { Rating } from 'react-native-stock-star-rating'
import {StyleSheet,Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Cuisine from '../../assets/images/restaurants/cuisineViet.jpg'


const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function Menu({ route}) {
  const [products, setProducts] = useState([]);
  const { restaurant } = route.params;

  useEffect(() => {
  
    const getProducts = async () => {
        
      try {
          const fetchResponse = await fetch(`http://localhost:3000/api/products?restaurant=${restaurant.id}`);
          const data = await fetchResponse.json();
          if(data.error){
            alert('Response Error')
          }
          else{
            setProducts(data);
          }
      } catch (e) {
          alert('failed fetch: '+ e.message)
      }   

    };
    getProducts()

  }, []);

  function productList(){
    return products.map((product) => {
      return (
        <Row key={product.id}>
          <Col>
            <Image style={styles.menuPic} source={Cuisine} />
          </Col>
          <Col>
            <h2>{product.name}</h2>
            <Text>{product.cost}</Text>
            <Text>Lorem ipsum</Text>
          </Col>
        </Row>
      );
    });
  }

  function renderDollarSigns() {
    let length = restaurant.rating;
    let range = "";
    for(let i = 0; i < length; i++){
      range += "$";
    }

    return range;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <style type="text/css">
        {`
            .btn-rdelivery {
                background-color: #DA583B;
                color: white;
                width: 100%;
            }
        `}
      </style>
      <Container fluid className="m-3">
          <Row>
              <Col><h1>Restaurant Menu</h1></Col>
          </Row>
          <Row>
              <Col>
                <h4>{restaurant.name}</h4>
                <h4>Price: {renderDollarSigns()}</h4>
                <h4>Rating: </h4> <Rating stars={restaurant.price_range} maxStars={5} size={20} />
              </Col>
              <Col>
                <Button variant="rdelivery" type="Button">
                  Create Order
                </Button>
              </Col>
          </Row>
          {productList()}
      </Container>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  menuPic: {
    width: "100%",
    height: undefined,
    aspectRatio: 16/9,
    resizeMode: 'contain',
  }
});