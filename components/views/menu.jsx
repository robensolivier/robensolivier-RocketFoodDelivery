import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  View
} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Cuisine from '../../assets/images/restaurants/cuisineViet.jpg';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function Menu({ route }) {
  const [products, setProducts] = useState([]);
  const { restaurant } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsProcessing(true); // Set isProcessing to true while fetching data
        const fetchResponse = await fetch(`http://localhost:3000/api/products?restaurant=${restaurant.id}`);
        const data = await fetchResponse.json();
        if (data.error) {
          alert('Response Error');
        } else {
          setProducts(data);
        }
        setIsProcessing(false); // Set isProcessing back to false after data fetch is complete
      } catch (e) {
        alert('Failed fetch: ' + e.message);
        setIsProcessing(false); // Set isProcessing back to false on fetch error
      }
    };
    getProducts();
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: isNaN(quantity) ? 0 : quantity // Check for NaN and set to 0 if NaN
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleIncrement = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: isNaN(product.quantity) ? 1 : product.quantity + 1 // Check for NaN and set to 1 if NaN
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleDecrement = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId && product.quantity > 0) {
        return {
          ...product,
          quantity: isNaN(product.quantity) ? 0 : product.quantity - 1 // Check for NaN and set to 0 if NaN
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const showModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const renderProducts = () => {
    return products.map(product => {
      return (
        <Row key={product.id}>
          <Col>
            <Image style={styles.menuPic} source={Cuisine} />
          </Col>
          <Col>
            <h2>{product.name}</h2>
            <Text>{formatter.format(product.cost)}</Text>
            <Text>Lorem ipsum</Text>
            <Row>
              <Col>
                <Button variant="link" onClick={() => handleDecrement(product.id)}>-</Button>
              </Col>
              <Col>
                <Text>{product.quantity}</Text>
                </Col>
<Col>
<Button variant="link" onClick={() => handleIncrement(product.id)}>+</Button>
</Col>
</Row>
<TouchableOpacity style={styles.orderBtn} onPress={() => showModal(product)}>
<Text style={styles.orderBtnText}>Add to Order</Text>
</TouchableOpacity>
</Col>
</Row>
);
});
};

const renderOrderModal = () => {
if (selectedOrder) {
return (
<Modal animationType="slide" transparent={true} visible={modalVisible}>
<View style={styles.modalContainer}>
<View style={styles.modalContent}>
<Text style={styles.modalTitle}>{selectedOrder.name}</Text>
<Text style={styles.modalSubtitle}>{formatter.format(selectedOrder.cost)}</Text>
<Text style={styles.modalText}>Quantity: {selectedOrder.quantity}</Text>
<View style={styles.modalButtonsContainer}>
<TouchableOpacity
style={styles.modalButton}
onPress={() => hideModal()}
>
<Text style={styles.modalButtonText}>Close</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.modalButton}
onPress={() => handleAddToCart(selectedOrder)}
>
<Text style={styles.modalButtonText}>Add to Cart</Text>
</TouchableOpacity>
</View>
</View>
</View>
</Modal>
);
} else {
return null;
}
};

const handleAddToCart = (product) => {
// Implement logic to add product to cart
// You can use a global state management solution like Redux or a local state management solution like useState
// Example: addToCart(product);
hideModal();
};

return (
<Container>
<ScrollView contentContainerStyle={styles.container}>
{isProcessing ? (
<Text>Loading products...</Text>
) : (
renderProducts()
)}
{renderOrderModal()}
</ScrollView>
</Container>
);
}

const styles = StyleSheet.create({
container: {
paddingVertical: 20,
paddingHorizontal: 10,
},
menuPic: {
width: 120,
height: 120,
resizeMode: 'cover',
},
orderBtn: {
backgroundColor: '#DA583B',
borderRadius: 5,
padding: 10,
marginTop: 10,
},
orderBtnText: {
color: 'white',
textAlign: 'center',
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
backgroundColor: 'white',
borderRadius: 10,
padding: 20,
minWidth: 250,
alignItems: 'center',
},
modalTitle: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
},
modalSubtitle: {
fontSize: 16,
color: 'gray',
marginBottom: 15,
},
modalText: {
fontSize: 14,
marginBottom: 15,
},
modalButtonsContainer: {
flexDirection: 'row',
},
modalButton: {
flex: 1,
backgroundColor: '#DA583B',
borderRadius: 5,
padding: 10,
marginHorizontal: 5,
},
modalButtonText: {
color: 'white',
textAlign: 'center',
},
});
