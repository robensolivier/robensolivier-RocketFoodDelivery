import React from 'react';

export const AuthContext = React.createContext();
const signIn = async (data) => {
    try {
      // Vérifier si l'utilisateur est déjà connecté
      const user = await AsyncStorage.getItem('@user');
      if (user !== null) {
        navigation.navigate('AccountSelectionScreen');
        setUser(JSON.parse(user));
      } else {
        setAuthState(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
