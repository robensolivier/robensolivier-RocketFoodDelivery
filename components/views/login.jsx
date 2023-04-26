import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppLogoV2 from '../../assets/images/AppLogoV2.png';
import { AuthContext } from '../../context';

export default function Login({navigation}) {
    const {signIn} = React.useContext(AuthContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const storeUser = async (user) => {
        try{
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem("@user", jsonValue);
        }
        catch(e){
            alert(e.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let loginData = await fetchLogin();
        if(loginData.success == false){
            alert("Error");
        }
        else{
            storeUser(loginData);
            signIn();
        };
    };

    async function fetchLogin(id){
        let newLogin = { ...form };
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLogin)
        };

        try {
            const fetchResponse = await fetch(`http://localhost:3000/api/login`, settings);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }    
    }

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    return (
        <>
            <style type="text/css">
            {`
                .btn-rdelivery {
                    background-color: #DA583B;
                    color: white;
                    width: 100%;
                }
            `}
            </style>
            <View style={styles.container}>
                <View style={styles.bodyContainer}>
                    <Image style={styles.logo} source={AppLogoV2} />
                    <Form style={{border: '1px'}} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email"
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                        />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            name="Password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                        </Form.Group>
                        <Button variant="rdelivery" type="submit">
                            Submit
                        </Button>
                    </Form>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bodyContainer: {
        margin: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
      width: "100%",
      height: undefined,
      aspectRatio: 16/9,
      resizeMode: 'contain',
    },
    formContainer: {
        margin: '1rem',
        border: '1px',
    }
});