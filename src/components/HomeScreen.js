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
  const [dadosTotal, setDadosTotal] = useState("");
  const [doencas_lista, setDoencasLista] = useState([]);

  const onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  
  //funciona do mesmo jeito do componentDidMount()
  useEffect(() => {
    (async () => {
      const dados = await AsyncStorage.getItem('@dados');
      //const dados = null;
      if (dados != null) {
        console.log(JSON.parse(dados));
        setDadosTotal(JSON.parse(dados));
      }
      else {
        axios.get(LOCAL_IP + '/dados/')
          .then(response => {
            setDadosTotal(response.data);
            console.log(response.data);
          })
          .catch(error => console.log(error));
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if(dadosTotal !== ""){
        await AsyncStorage.setItem('@dados', JSON.stringify(dadosTotal));
        console.log("saved");
        let aux_lista = [...doencas_lista];
        const element = dadosTotal[0];
        if(aux_lista.lenght === 0){
          for(let i = 11; i < Object.keys(element).lenght; i++){
            aux_lista.push(Object.keys(element)[i]);
          }
          setDoencasLista(aux_lista);
        }
      }
      console.log(dadosTotal);
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