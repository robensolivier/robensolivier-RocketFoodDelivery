import { Modal } from "bootstrap";
import { TouchableOpacity } from "react-native-web";

return(
    <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
            setModalVisible(false);
        }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedOrder.restaurant_name}</Text>
            <Text style={styles.modalText}>Order Date: {selectedOrder.order.date}</Text>
            <Text style={styles.modalText}>Status: {selectedOrder.status}</Text>
            <Text style={styles.modalText}>Courier: {selectedOrder.courier_id}</Text>
            <View style={styles.modalProductsContainer}>
            {selectedOrder.products.map((products, index)=> (
                <View key ={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                 <Text styles={{ fontSize: 18, paddingHorizontal: 10}}>{products.product_name}</Text>
                    <Text styles={{ fontSize: 18, paddingHorizontal: 10}}>x{products.product_quantity}</Text>
                    <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>{((products.product_cost / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))}</Text>
                </View>
            ))}
        </View>
        < Text styles={styles.modalTotal}>
            Total: ${(selectedOrder.total_cost / 100).toFixed(2)}
         </Text>.
            <TouchableOpacity
                styles={styles.closeButton}
                onPress={() => setModalVisible(false)}
            >
                <Text styles ={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            </View>
            </View>
    </Modal>
);
