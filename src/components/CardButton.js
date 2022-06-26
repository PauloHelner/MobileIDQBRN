import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class CardButton extends React.Component {
    constructor(props) {
        super(props);
        const freqArray = ["Desconhecida", "Baixa", "Média", "Alta"];
        const colorArray = ['#2B9EB3', '#FFC482', '#F59777', '#FF6663']
        this.onPress = props.onPress;
        this.name = props.name;
        this.freq = freqArray[props.freq];
        this.color = colorArray[props.freq];
    }
    render() {
        return (
            <>
                <TouchableOpacity
                    onPress={this.onPress}
                    style={[styles.cardButton, { backgroundColor: this.color }]}>
                    <Text style={[styles.buttonName, { color: this.color }]}>{this.name}</Text>
                    <Text style={styles.buttonInfo}>Frequência {this.freq}</Text>
                </TouchableOpacity>
            </>
        )
    }
}

const styles = StyleSheet.create({
    cardButton: {
        padding: 10,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 5,
    },
    buttonName: {
        position: 'relative',
        width: '100%',
        fontWeight: 'bold',
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