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

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
// import Recommendations from '../components/Recommendations'; // Import your Recommendations modal component

// const ProductList: React.FC = () => {
//     const [products, setProducts] = useState([]);
//     const [loadingProducts, setLoadingProducts] = useState(true);
//     const [loadingRecommendations, setLoadingRecommendations] = useState(false);
//     const [error, setError] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [recommendations, setRecommendations] = useState([]); // Sample recommendations data

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://172.20.10.4:8000/fridge/products'); // Replace with your API URL
//                 const data = await response.json();
//                 setProducts(data.fridge_products);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoadingProducts(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         const fetchRecommendations = async () => {
//             try {
//                 setLoadingRecommendations(true);
//                 const response = await fetch('http://172.20.10.4:8000/recipes/recommend'); // Replace with your API URL
//                 const data = await response.json();
//                 console.log('Recommendations:', data); // Log the recommendations data
//                 setRecommendations(data.recipies); // Assuming the response structure is { recipies: [...] }
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoadingRecommendations(false);
//             }
//         };
//         fetchRecommendations(); // Fetch recommendations on component mount
//     }, []);



//     const handleOpenModal = async () => {
//         setModalVisible(true);
//     };

//     if (loadingProducts) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     if (error) {
//         return <Text>Error: {error.message}</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Product List</Text>
//             <FlatList
//                 data={products}
//                 keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.productContainer}>
//                         <Text>{item.name}</Text>
//                     </View>
//                 )}
//             />
//             <TouchableOpacity onPress={handleOpenModal}>
//                             <Text style={styles.recommendationButton}>See Recommendations</Text>
//             </TouchableOpacity>
//             <Recommendations 
//                 visible={modalVisible} 
//                 onClose={() => setModalVisible(false)} 
//                 recommendations={recommendations} 
//             />
//             {loadingRecommendations && <ActivityIndicator size="small" color="#0000ff" />}
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
    

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import Recommendations from '../components/Recommendations';


const ProductList: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingRecommendations, setLoadingRecommendations] = useState(false);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [recommendations, setRecommendations] = useState('');

    // State for user preferences/input
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbo, setCarbo] = useState('');
    const [fats, setFats] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://172.20.10.2:8000/fridge/products'); // Replace with your API URL
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

    const fetchRecommendations = async () => {
        try {
            setLoadingRecommendations(true);
            const bodyData = {
                calories: parseInt(calories),
                protein: parseInt(protein),
                carbo: parseInt(carbo),
                fats: parseInt(fats),
            };
            const response = await fetch('http://172.20.10.2:8000/recipes/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });
            console.log('Request body:', bodyData); // Log the request body
            const data = await response.json();
            console.log('Response data:', data); // Log the response data
            const formattedText = formatRecommendations(data);

            setRecommendations(formattedText);
            console.log('Recommendations:', formattedText); // Log the recommendations data
        } catch (err) {
            setError(err);
        } finally {
            setLoadingRecommendations(false);
        }
    };

    interface Recipe {
        name: string;
        ingredients: string[];
        steps: string[];
        calories: number;
        protein: number;
        carbo: number;
        fats: number;
    }

    interface RecipesData {
        recipes: Recipe[];
    }

    interface RecommendationsResponse {
        recipies?: RecipesData;
    }

    const formatRecommendations = (data: RecommendationsResponse): string => {
        if (!data || !data.recipies || !data.recipies.recipes) return '';

        return data.recipies.recipes.map((recipe: Recipe, index: number) => {
            const ingredients = recipe.ingredients.join('\n');
            const steps = recipe.steps.join('\n');
            return `
        ${index + 1}. ${recipe.name}
        ------------------------
        Składniki:
        ${ingredients}

        Instrukcje:
        ${steps}

        Wartości odżywcze:
        Kalorie: ${recipe.calories}
        Białko: ${recipe.protein}g
        Węglowodany: ${recipe.carbo}g
        Tłuszcz: ${recipe.fats}g

        ------------------------
        `;
        }).join('\n');
    };


    



    const handleOpenModal = async () => {
        await fetchRecommendations();   // wait here
        setModalVisible(true);          // then open modal
    };

    if (loadingProducts) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Twoje preferencje</Text>
            {/* Form Inputs */}
            <TextInput
                style={styles.input}
                placeholder="Kalorie"
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
            />
            <TextInput
                style={styles.input}
                placeholder="Białko"
                keyboardType="numeric"
                value={protein}
                onChangeText={setProtein}
            />
            <TextInput
                style={styles.input}
                placeholder="Węglowodany"
                keyboardType="numeric"
                value={carbo}
                onChangeText={setCarbo}
            />
            <TextInput
                style={styles.input}
                placeholder="Tłuszcze"
                keyboardType="numeric"
                value={fats}
                onChangeText={setFats}
            />

            {/* Product list */}
            <Text style={styles.title}>Lista Produktów</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />

            {/* Button to get recommendations based on preferences */}
            <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
                <Text style={styles.buttonText}>Pokaż rekomendacje</Text>
            </TouchableOpacity>

            <Recommendations
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                recommendations={recommendations}
            />

            {loadingRecommendations && <ActivityIndicator size="small" color="#0000ff" />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    productContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    recommendationButton: {
        color: 'blue',
        marginBottom: 100,
    },
    recipeText: {
        fontSize: 16,
        lineHeight: 24,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: 'white',
    },
});

export default ProductList;


