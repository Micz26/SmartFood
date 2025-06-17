// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

// const ProductList: React.FC = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProducts = async () => {

//             try {
//                 const response = await fetch('http://172.20.10.4:8000/fridge/products'); // Replace with your API URL
//                 const data = await response.json();
//                 setProducts(data.fridge_products); // Assuming the response structure is { fridge_products: [...] }
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     if (error) {
//         return <Text>Error fetching products: {error.message}</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Product List</Text>
//             <FlatList
//                 data={products}
//                 keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Fallback to random id if id is not present
//                 renderItem={({ item }) => (
//                     <View style={styles.productContainer}>
//                         <Text>{item.name}</Text> {/* Ensure to use the correct property */}
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20,
//     },
//     productContainer: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
// });

// export default ProductList;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Recommendations from '../components/Recommendations'; // Import your Recommendations modal component

const ProductList: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingRecommendations, setLoadingRecommendations] = useState(false);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [recommendations, setRecommendations] = useState([]); // Sample recommendations data

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://172.20.10.4:8000/fridge/products'); // Replace with your API URL
                const data = await response.json();
                setProducts(data.fridge_products);
            } catch (err) {
                setError(err);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoadingRecommendations(true);
                const response = await fetch('http://172.20.10.4:8000/recipes/recommend'); // Replace with your API URL
                const data = await response.json();
                console.log('Recommendations:', data); // Log the recommendations data
                setRecommendations(data.recipies); // Assuming the response structure is { recipies: [...] }
            } catch (err) {
                setError(err);
            } finally {
                setLoadingRecommendations(false);
            }
        };
        fetchRecommendations(); // Fetch recommendations on component mount
    }, []);



    const handleOpenModal = async () => {
        setModalVisible(true);
    };

    if (loadingProducts) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product List</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
            <TouchableOpacity onPress={handleOpenModal}>
                            <Text style={styles.recommendationButton}>See Recommendations</Text>
            </TouchableOpacity>
            <Recommendations 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                recommendations={recommendations} 
            />
            {loadingRecommendations && <ActivityIndicator size="small" color="#0000ff" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    productContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    recommendationButton: {
        color: 'blue',
        marginBottom: 100,
    },
});

export default ProductList;


