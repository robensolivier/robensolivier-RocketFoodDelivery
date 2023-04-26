import React from 'react'
import Card from 'react-bootstrap/Card';
import GreekCuisine from '../../assets/images/restaurants/cuisineGreek.jpg'

export default function RestaurantCard(props) {
  const Restaurant = props.restaurant
  const Name = props.restaurant.name;
  const Rating = props.restaurant.rating;

  return (
    <Card style={{ width: '18rem' } }>
      <Card.Img variant="top" src={GreekCuisine} />
      <Card.Body>
        <Card.Title>{Name}</Card.Title>
        <Card.Text>
          Rating: {Rating}.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
