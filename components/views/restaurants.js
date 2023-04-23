import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import RestaurantCard from '../other/restaurantCard';

export default function Restaurants({ navigation}) {
  const [rating, setRating] = useState(null)
  const [price, setPrice] = useState(null)
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
            <Col key={restaurant.id} xs={12} md={4} lg={4} style={{marginBottom: '7.5px'}}>
                <RestaurantCard restaurant={restaurant} key={restaurant.id} style={{height: '150px', padding: '7.5px'}} />
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
    <Container fluid className="m-3">
        <Row>
            <Col><h1>Restaurants</h1></Col>
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
                  <option key={1} value={1}>1</option>
                  <option key={2} value={2}>2</option>
                  <option key={3} value={3}>3</option>
                  <option key={4} value={4}>4</option>
                  <option key={5} value={5}>5</option>
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
        </Row>
        <Row xs={2} className="me-2">
          {restaurantList()}
        </Row>
    </Container>
  )
}
