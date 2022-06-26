import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

export default function InfoScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={require('../img/microscopioFlat.png')} style={{ width: 150, height: 150 }}/>
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
});