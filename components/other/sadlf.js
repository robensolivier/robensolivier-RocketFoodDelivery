import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, ImageBackground, TouchableOpacity, AppRegistry, Item } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Picker } from '@react-native-picker/picker';
const RestaurantPage = () => {
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch('http://127.0.0.1:3000/api/restaurants')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants data');
        }
        console.log('restaurants:' + response.json)
        return response.json();
      })
      .then(data => setRestaurants(data))
      .catch(error => {
        console.error(error);
      });
  };
  const filteredRestaurants = restaurants.filter(restaurant => {
    const ratingMatch = restaurant.rating && restaurant.rating.toString().includes(ratingFilter);
    const priceMatch = restaurant.price && restaurant.price.includes(priceFilter);
    return ratingMatch && priceMatch;
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Restaurants</Text>
      <View style={styles.filterContainer}>
        <Picker
          style={styles.input}
          selectedValue={ratingFilter}
          onValueChange={(itemValue) => setRatingFilter(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
        <Picker
          style={styles.input}
          selectedValue={priceFilter}
          onValueChange={(itemValue) => setPriceFilter(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="$" value="$" />
          <Picker.Item label="$$" value="$$" />
          <Picker.Item label="$$$" value="$$$" />
        </Picker>
      </View>
      <View style={styles.restaurantContainer}>
        {filteredRestaurants.map(restaurant => (
          <TouchableOpacity key={restaurant.name} style={styles.restaurantItem}>
            <Image source={restaurant.image} style={styles.restaurantImage} />
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantRating}>Rating: {restaurant.rating}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  restaurantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  restaurantItem: {
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  restaurantImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantRating: {
    fontSize: 14,
  },
});
export default RestaurantPage;