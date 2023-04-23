import React from 'react'
import { Rating } from 'react-native-stock-star-rating'
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';

export default function Menu({ route, navigation}) {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container fluid className="m-3">
          <Row>
              <Col><h1>Restaurant Menu</h1></Col>
          </Row>
          <Row>
              <Col><h2>Restaurant Something</h2></Col>
          </Row>
          </Container>
    </ScrollView>
  )
}
