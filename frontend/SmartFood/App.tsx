import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './scr/Login'; // Adjust the path as necessary
import BarcodeScanner from './scr/BarcodeScanner'; // Adjust the path as necessary
import ProductList from './scr/ProductList'; // Adjust the path as necessary

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator id={undefined} initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
                <Stack.Screen name="ProductList" component={ProductList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;