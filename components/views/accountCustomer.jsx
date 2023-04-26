import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AccountCourier({ userType, userEmail, userPhone }) {
  const [userTypeEmail, setUserTypeEmail] = useState('');
  const [userTypePhone, setUserTypePhone] = useState('');

  // Function to handle editing of user-type email
  const handleUserTypeEmailEdit = (text) => {
    setUserTypeEmail(text);
  };

  // Function to handle editing of user-type phone
  const handleUserTypePhoneEdit = (text) => {
    setUserTypePhone(text);
  };

  return (
    <View style={{ margin: 20}}>
      <Text style={styles.accountTitle}>My Account {userEmail}</Text>
      <Text style={styles.loggedInAs}> Logged in as: Customer {userType === 'Courier' ? userEmail : userTypeEmail}</Text>
      {/* <Text>User-Type Phone: {userType === 'Courier' ? userPhone : userTypePhone}</Text> */}
      {userType !== 'Courier' && (
        <View>
          <Text> Primary Email (Read Only):</Text>
          <TextInput
            value={userTypeEmail}
            onChangeText={handleUserTypeEmailEdit}
            editable={true}
            style={styles.input}
          />
          <Text style={{ fontSize: 12, color: 'grey' }} >Email used loggin to this application:</Text>

          <Text>Customer Email:</Text>
          <TextInput
            value={userTypeEmail}
            onChangeText={handleUserTypeEmailEdit}
            editable={true}
            style={styles.input}
          />
          <Text style={{ fontSize: 12, color: 'grey' }}>Email used for your Customer account:</Text>
          <Text>Customer Phone:</Text>
          <TextInput
            value={userTypePhone}
            onChangeText={handleUserTypePhoneEdit}
            editable={true}
            style={styles.input}
          />
          <Text style={{ fontSize: 12, color: 'grey' }}>Phone Number for your Customer Account:</Text>
            {/* <Button as="a" variant="primary">
                Button as link
            </Button> */}
          <Button variant= "rdelivery-header"
            title="Save"
            onClick={() => alert('Changes saved!')}
            buttonStyle={[styles.button, { height: 10, marginTop: 100 }]}// Increase button height
            titleStyle={styles.buttonTitle}
          >UPDATE ACCOUNT</Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#DA583B', // Change button color to orange
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonTitle: {
    color: 'white',
  },
  accountTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loggedInAs: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 20,
  },
});

  


  
//     // Function to handle edit button press
//     const handleEditPress = () => {
//       // Add logic to update user-type email and phone in the database
//       // based on userTypeEmail and userTypePhone state values
//       // You can use APIs or other methods to interact with your backend
//       // and update the data in the database accordingly
//       // Note: user email is read-only and should not be updated
//       // Display success or error message based on the result of the update
//       alert('User-type email and phone updated successfully!');
//     }
  

