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
    

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
// import Recommendations from '../components/Recommendations';


// const ProductList: React.FC = () => {
//     const [products, setProducts] = useState([]);
//     const [loadingProducts, setLoadingProducts] = useState(true);
//     const [loadingRecommendations, setLoadingRecommendations] = useState(false);
//     const [error, setError] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [recommendations, setRecommendations] = useState('');

//     // State for user preferences/input
//     const [calories, setCalories] = useState('');
//     const [protein, setProtein] = useState('');
//     const [carbo, setCarbo] = useState('');
//     const [fats, setFats] = useState('');

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://172.20.10.2:8000/fridge/products'); // Replace with your API URL
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


//     const handleDeleteProduct = async (productId) => {
//         try {
//             const response = await fetch(`http://172.20.10.2:8000/fridge/delete_product`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ ean: productId }), // assuming product.id is EAN
//             });

//             if (response.ok) {
//                 // Remove product from local list after successful deletion
//                 setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
//             } else {
//                 const errorData = await response.json();
//                 alert('Błąd podczas usuwania produktu:', errorData.detail);
//             }
//         } catch (err) {
//             alert('Error:', err.message);
//         }
//     };

//     const fetchRecommendations = async () => {
//         try {
//             setLoadingRecommendations(true);
//             const bodyData = {
//                 calories: parseInt(calories),
//                 protein: parseInt(protein),
//                 carbo: parseInt(carbo),
//                 fats: parseInt(fats),
//             };
//             const response = await fetch('http://172.20.10.2:8000/recipes/recommend', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(bodyData),
//             });
//             console.log('Request body:', bodyData); // Log the request body
//             const data = await response.json();
//             console.log('Response data:', data); // Log the response data
//             const formattedText = formatRecommendations(data);

//             setRecommendations(formattedText);
//             console.log('Recommendations:', formattedText); // Log the recommendations data
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoadingRecommendations(false);
//         }
//     };

//     interface Recipe {
//         name: string;
//         ingredients: string[];
//         steps: string[];
//         calories: number;
//         protein: number;
//         carbo: number;
//         fats: number;
//     }

//     interface RecipesData {
//         recipes: Recipe[];
//     }

//     interface RecommendationsResponse {
//         recipies?: RecipesData;
//     }

//     const formatRecommendations = (data: RecommendationsResponse): string => {
//         if (!data || !data.recipies || !data.recipies.recipes) return '';

//         return data.recipies.recipes.map((recipe: Recipe, index: number) => {
//             const ingredients = recipe.ingredients.join('\n');
//             const steps = recipe.steps.join('\n');
//             return `
//         ${index + 1}. ${recipe.name}
//         ------------------------
//         Składniki:
//         ${ingredients}

//         Instrukcje:
//         ${steps}

//         Wartości odżywcze:
//         Kalorie: ${recipe.calories}
//         Białko: ${recipe.protein}g
//         Węglowodany: ${recipe.carbo}g
//         Tłuszcz: ${recipe.fats}g

//         ------------------------
//         `;
//         }).join('\n');
//     };


    



//     const handleOpenModal = async () => {
//         await fetchRecommendations();   // wait here
//         setModalVisible(true);          // then open modal
//     };

//     if (loadingProducts) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     if (error) {
//         return <Text>Error: {error.message}</Text>;
//     }

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.title}>Twoje preferencje</Text>
//             {/* Form Inputs */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Kalorie"
//                 keyboardType="numeric"
//                 value={calories}
//                 onChangeText={setCalories}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Białko"
//                 keyboardType="numeric"
//                 value={protein}
//                 onChangeText={setProtein}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Węglowodany"
//                 keyboardType="numeric"
//                 value={carbo}
//                 onChangeText={setCarbo}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Tłuszcze"
//                 keyboardType="numeric"
//                 value={fats}
//                 onChangeText={setFats}
//             />

//             {/* Product list */}
//             <Text style={styles.title}>Lista Produktów</Text>
//             <FlatList
//                 data={products}
//                 keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.productContainer}>
//                         <Text>{item.name}</Text>
//                     </View>
//                 )}
//             />

//             {/* Button to get recommendations based on preferences */}
//             <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
//                 <Text style={styles.buttonText}>Pokaż rekomendacje</Text>
//             </TouchableOpacity>

//             <Recommendations
//                 visible={modalVisible}
//                 onClose={() => setModalVisible(false)}
//                 recommendations={recommendations}
//             />

//             {loadingRecommendations && <ActivityIndicator size="small" color="#0000ff" />}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 22,
//         marginVertical: 10,
//     },
//     input: {
//         width: '80%',
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//     },
//     productContainer: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         width: '100%',
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 20,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     recommendationButton: {
//         color: 'blue',
//         marginBottom: 100,
//     },
//     recipeText: {
//         fontSize: 16,
//         lineHeight: 24,
//     },
//     modalContainer: {
//         flex: 1,
//         padding: 20,
//         marginTop: 50,
//         backgroundColor: 'white',
//     },
// });

// export default ProductList;




import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import Recommendations from '../components/Recommendations';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendations, setRecommendations] = useState('');
  const [productInfoModalVisible, setProductInfoModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // User preferences/input states
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbo, setCarbo] = useState('');
  const [fats, setFats] = useState('');

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://172.20.10.2:8000/fridge/products'); // Your API URL
        const data = await response.json();
        console.log('Fetched products:', data); // Log fetched products
        setProducts(data.fridge_products);
      } catch (err) {
        setError(err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDeleteProduct = (productId) => {
    Alert.alert(
        "Potwierdzenie",
        "Czy na pewno chcesz usunąć ten produkt?",
        [
        {
            text: "Anuluj",
            style: "cancel"
        },
        {
            text: "Usuń",
            onPress: async () => {
            try {
                const response = await fetch(`http://172.20.10.2:8000/fridge/delete_product`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ean: productId }),
                });
                if (response.ok) {
                setProducts(prev => prev.filter(p => p.ean !== productId));
                } else {
                const errorData = await response.json();
                alert('Błąd podczas usuwania produktu: ' + errorData.detail);
                }
            } catch (err) {
                alert('Error: ' + err.message);
            }
            }
        }
        ]
    );
  };

  const handleProductPress = async (product) => {
    try {
        const response = await fetch(`http://172.20.10.2:8000/fridge/product_info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ean: product.ean }), // send EAN for backend to fetch product info
        });

        if (response.ok) {
        const productDetails = await response.json();
        console.log('Product details:', productDetails); // Log the product details
        setSelectedProduct(productDetails);
        setProductInfoModalVisible(true);
        } else {
        const errorData = await response.json();
        alert('Nie można pobrać informacji o produkcie: ' + errorData.detail);
        }
    } catch (err) {
        alert('Błąd sieci: ' + err.message);
    }
  };

  // Fetch recommendations based on preferences
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      console.log('Recommendations response:', data); // Log the response data
      const formattedText = formatRecommendations(data);
      setRecommendations(formattedText);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Format recommendations text
  const formatRecommendations = (data) => {
    if (!data || !data.recipies || !data.recipies.recipes) return '';
    return data.recipies.recipes.map((recipe, index) => {
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

  // Handle opening recommendations modal
  const handleOpenModal = async () => {
    await fetchRecommendations();
    setModalVisible(true);
    console.log('Modal state:', modalVisible); // Log modal state
    console.log('Recommendations opened:', recommendations); // Log when modal is opened
  };

  // Handle clicking on product to show info

  if (loadingProducts) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* Your form inputs for preferences */}
            <Text style={styles.title}>Twoje preferencje</Text>
            <Text style={styles.label}> Kalorie</Text>
            <TextInput
                  style={styles.input}
                  placeholder="Kalorie"
                  keyboardType="numeric"
                  value={calories}
                  onChangeText={setCalories}
              />
              <Text style={styles.label}> Białko</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Białko"
                  keyboardType="numeric"
                  value={protein}
                  onChangeText={setProtein}
              />
              <Text style={styles.label}> Węglowodany</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Węglowodany"
                  keyboardType="numeric"
                  value={carbo}
                  onChangeText={setCarbo}
              />
              <Text style={styles.label}> Tłuszcze</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Tłuszcze"
                  keyboardType="numeric"
                  value={fats}
                  onChangeText={setFats}
              />
            
            <Text style={styles.title}>Lista Produktów</Text>
          </View>
        }
        data={products}
        keyExtractor={(item) => item.ean ? item.ean.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {/* Kliknięcie, żeby pokazać info */}
            <TouchableOpacity onPress={() => handleProductPress(item)} style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.name}</Text>
            </TouchableOpacity>
            {/* Usuwanie */}
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(item.ean)}>
              <Text style={styles.deleteText}>Usuń</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <>
            {/* Button do pokazania rekomendacji */}
            <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
              <Text style={styles.buttonText}>Pokaż rekomendacje</Text>
            </TouchableOpacity>
            {loadingRecommendations && <ActivityIndicator size="small" color="#0000ff" />}
          </>
        }
      />
      {/* Modal z rekomendacjami */}
      <Recommendations
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          recommendations={recommendations}
      />
      
      {/* Modal z info o produkcie */}
      <Modal
        visible={productInfoModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setProductInfoModalVisible(false)}
        >
        <View style={styles.modalContainer}>
            {selectedProduct && (
            <>
                <Text style={styles.title}>{selectedProduct.name}</Text>
                <Text>Marka: {selectedProduct.brand || 'Brak danych'}</Text>
                <Text>EAN: {selectedProduct.ean}</Text>
                <Text>Skład: {selectedProduct.ingredients || 'Brak danych'}</Text>
                <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Wartości odżywcze na 100g:</Text>
                <Text>Kalorie: {selectedProduct.nutriments['energy-kcal']} kcal</Text>
                <Text>Energia (kJ): {selectedProduct.nutriments['energy_kj'] || selectedProduct.nutriments.energy || 'Brak danych'}</Text>
                <Text>Cukry {selectedProduct.nutriments.sugars} g</Text>
                <Text>Sól: {selectedProduct.nutriments.salt} g</Text>
                <Text>Tłuszcz: {selectedProduct.nutriments.fat} g</Text>
                <Text>Tłuszcze nasycone: {selectedProduct.nutriments['saturated-fat']} g</Text>
                <Text>Proteiny: {selectedProduct.nutriments.proteins} g</Text>
                <Text>Węglowodany: {selectedProduct.nutriments.carbohydrates} g</Text>
                <Text>Sód: {selectedProduct.nutriments.sodium} g</Text>
                <Text>Fibry: {selectedProduct.nutriments.fiber} g</Text>
                <Text style={{ marginTop: 10 }}>Nazwa: {selectedProduct.name}</Text>
                {/* Dla czytelności można dodać jeszcze więcej szczegółów, jeśli chcesz */}
                <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setProductInfoModalVisible(false)}
                >
                <Text style={styles.closeButtonText}>Zamknij</Text>
                </TouchableOpacity>
            </>
            )}
        </View>
    </Modal>
    </>
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
    fontWeight: 'bold',
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  productName: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: 'white',
    marginTop: 100,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    headerContainer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },

});
export default ProductList;

