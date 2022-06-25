import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CardButton from './CardButton';

export default function Informations() {
    const buttonClickedHandler = () => {
        console.log('You have been clicked a button!');
        // do something
      };
    
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <CardButton onPress={buttonClickedHandler}/>
          </View>
        </SafeAreaView>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 40,
      backgroundColor: '#ecf0f1',
      borderRadius: 20,
  
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
      color: '#34495e',
    },
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