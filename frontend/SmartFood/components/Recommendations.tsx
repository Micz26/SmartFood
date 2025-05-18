import React from 'react';
import { View, Text, StyleSheet, Modal, Button, ScrollView } from 'react-native';

interface RecommendationsProps {
    visible: boolean;
    onClose: () => void;
    recommendations: any; // This is now a single string
}

const Recommendations: React.FC<RecommendationsProps> = ({ visible, onClose, recommendations }) => {
    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>Recommendacje</Text>
                <ScrollView>
                    {/* Render the recommendations string directly */}
                    <Text style={styles.recipeText}>{recommendations}</Text> {/* Render the entire string */}
                </ScrollView>
                <Button title="Powrót" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: 'white',
    },
    recipeText: {
        fontSize: 16,
        lineHeight: 24, // Adjust line height for better readability
    },
});

export default Recommendations;