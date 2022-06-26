import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import CardButton from './CardButton';
//import { FloatingAction } from "react-native-floating-action";
//import { useEffect, useState } from 'react/cjs/react.production.min';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_IP } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import fs from 'fs'

export default function HomeScreen({ navigation }) {
  const [dadosTotal, setDadosTotal] = useState();
  const [doencas_lista, setDoencasLista] = useState([]);


  const onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  //funciona do mesmo jeito do componentDidMount()
  useEffect(() => {
    //console.log(LOCAL_IP);
    axios.get(LOCAL_IP + '/dados/')
      .then(response => {
        setDadosTotal(response.data);
        let aux_lista = [...doencas_lista];
        response.data.forEach(element => {
          if (aux_lista.length === 0) {
            for (let i = 11; i < Object.keys(element).length; i++) {
              aux_lista.push(Object.keys(element)[i]);
            }
          }
        });
        setDoencasLista(aux_lista);
      })
      .catch(error => console.log(error));
  }, []);
  
  useEffect(() => {
    (async () => {
      if (dadosTotal) {
        try {
          await AsyncStorage.setItem('@dados', JSON.stringify(dadosTotal));
        }
        catch (e) {
          console.log(e);
        }
      }
      //const value = await AsyncStorage.getItem('@dados');
      //console.log(JSON.parse(value));
    })();

  }, [dadosTotal])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          {doencas_lista.map(doenca => <CardButton key={doenca} name={doenca} freq={3} navigation={navigation} />)}
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