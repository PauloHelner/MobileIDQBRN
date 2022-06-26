import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import CardButton from './CardButton';
import { FloatingAction } from "react-native-floating-action";

export default function HomeScreen({ navigation }) {
  const buttonClickedHandler = () => {
    navigation.navigate("Info");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <CardButton onPress={buttonClickedHandler} name={"DENGUE"} freq={3} />
          <CardButton onPress={buttonClickedHandler} name={"BOTULISMO"} freq={2} />
          <CardButton onPress={buttonClickedHandler} name={"exemplinho"} freq={1} />
          <CardButton onPress={buttonClickedHandler} name={"CAAAAAAAAAAAAAAAAAAA"} freq={0} />
          <Text style={styles.paragraph}>Com base em Minha Localização</Text>
          <Text style={styles.paragraph}>Atualizado por último em: xx/xx/xxxx</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  paragraph: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'gray',
  },
});