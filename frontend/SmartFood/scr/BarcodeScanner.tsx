import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import axios from 'axios';

const BarcodeScanner: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [scanned, setScanned] = useState(false); // To track if a barcode has been scanned
    const [cameraActive, setCameraActive] = useState(true); // Control camera visibility
    const cameraRef = useRef<any>(null); // Reference to the camera
    const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null); // Camera permission state

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleBarcodeScanned = async ({ type, data }: any) => {
        if (!scanned) {
            setScanned(true); // Prevent multiple scans
            setCameraActive(false); // Hide camera after scan
            console.log(`Bar code with type ${type} and data ${data} was scanned!`);

            // Send the scanned EAN to the backend
            try {
                console.log('Sending barcode data to backend:', data);
                const response = await axios.post('http://172.20.10.2:8000/fridge/scan-barcode', {
                    ean: data, // Sending the scanned barcode ean
                });
                console.log('Success:', response.data);

                navigation.navigate('ProductList'); // Navigate to Product List
            } catch (error) {
                console.error('Error uploading barcode data:', error);
            }
        }
    };

    const handleCameraTap = async (event: any) => {
        const { locationX, locationY } = event.nativeEvent;
        setFocusPoint({ x: locationX, y: locationY }); // Set focus point
        if (cameraRef.current) {
            await cameraRef.current.setFocusMode('on'); // Enable autofocus
            // Focus on the tapped location (you may need to normalize these coordinates)
            await cameraRef.current.setFocusPoint({ x: locationX, y: locationY });
        }
    };

    const handleScan = () => {
        setScanned(false); // Reset scanned state
        setCameraActive(true); // Show camera again
    };

    return (
        <View style={styles.container}>
            {cameraActive && (
                <CameraView
                    style={styles.camera}
                    onBarcodeScanned={handleBarcodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ['ean13', 'ean8'],
                    }}
                    active={true} // Keep the camera active
                    ref={cameraRef}
                    onTouchStart={handleCameraTap} // Handle touch events to set focus
                    onTouchEnd={() => setFocusPoint(null)} // Clear focus point on touch end
                    onTouchMove={(event) => {
                        const { locationX, locationY } = event.nativeEvent;
                        setFocusPoint({ x: locationX, y: locationY }); // Update focus point on touch move
                    }}
                />
            )}
            {!cameraActive && (
                <View style={styles.overlay}>
                    <Text style={styles.overlayText}>Produkt dodany do listy</Text>
                </View>
            )}
            {cameraActive && (
                <View style={styles.instructionOverlay}>
                    <Text style={styles.instructionText}>Skieruj kamerę na kod kreskowy </Text>
                </View>
            )}
            {scanned && (
                <TouchableOpacity style={styles.button} onPress={() => handleScan()}>
                    <Text style={styles.buttonText}>Naciśnij aby zeskanować ponownie</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('ProductList')}>
                <Text style={styles.buttonText}>Przejdź do listy produktów</Text>
            </TouchableOpacity>
            {focusPoint && (
                <View
                    style={[
                        styles.focusCircle,
                        {
                            left: focusPoint.x - 20, // Adjust these values to center the circle
                            top: focusPoint.y - 20,
                        }
                    ]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 200,
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        alignSelf: 'center',
    },
    button2: {
        position: 'absolute',
        bottom: 100,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    instructionOverlay: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    instructionText: {
        color: '#fff',
        fontSize: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    focusCircle: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'transparent',
    },
});


export default BarcodeScanner;