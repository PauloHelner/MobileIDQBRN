import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function CardButton({ onPress }) {
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={styles.cardButton}>
                <Text style={styles.buttonName}>DENGUE</Text>
                <Text style={styles.buttonInfo}>Frequência Alta</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    cardButton: {
        padding: 10,
        width: '80%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#FF6663',
        marginBottom: 10,
    },
    buttonName: {
        position: 'relative',
        width: '100%',
        fontWeight: 'bold',
        color: '#FF6663',
        fontSize: 20,
        borderRadius: 30,
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 7,
    },
    buttonInfo: {
        position: 'relative',
        width: '100%',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        borderRadius: 30,
        textAlign: 'left',
        paddingHorizontal: 10,
    },
});