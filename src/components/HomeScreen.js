import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import CardButton from './CardButton';
//import { FloatingAction } from "react-native-floating-action";
//import { useEffect, useState } from 'react/cjs/react.production.min';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_IP } from '@env'
//import fs from 'fs'

export default function HomeScreen({ navigation }) {
  const [dadosTotal, setDadosTotal] = useState();

  const onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  //funciona do mesmo jeito do componentDidMount()
  useEffect(() => {

    axios.get(LOCAL_IP + '/dados/')
      .then(response => {
        setDadosTotal(response.data);
        //fs.writeFileSync("./dadosTotal.json",JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch(error => console.log(error));

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <CardButton name={"DENGUE"} freq={3} navigation={navigation} />
          <CardButton name={"BOTULISMO"} freq={2} />
          <CardButton name={"exemplinho"} freq={1} />
          <CardButton name={"CAAAAAAAAAAAAAAAAAAA"} freq={0} />
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