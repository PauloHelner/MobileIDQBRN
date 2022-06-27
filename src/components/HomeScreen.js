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
  const [flag_salvar, setFlag] = useState(true);

  const onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  function filterDoencas(element) {
    let aux_lista = [...doencas_lista];

    if (aux_lista.length === 0) {
      console.log("Doenças Filtradas");
      for (let i = 11; i < Object.keys(element).length; i++) {
        aux_lista.push(Object.keys(element)[i]);
      }
      return aux_lista;
    }
  }


  //funciona do mesmo jeito do componentDidMount()
  useEffect(() => {
    (async () => {
      const dados = await AsyncStorage.getItem('@dados');
      const dados_lista = await AsyncStorage.getItem('@doencas');
      //const dados = null;
      if (dados != null) {
        //console.log(JSON.parse(dados));
        setFlag(false);
        setDadosTotal(JSON.parse(dados));
        setDoencasLista(JSON.parse(dados_lista));
        const keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.multiRemove(keys)
        console.log("Dados Limpados");
      }
      else {
        axios.get(LOCAL_IP + '/dados/')
          .then(response => {
            console.log("Dados Recebidos!");
            setDadosTotal(response.data);
          })
          .catch(error => console.log(error));
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (dadosTotal !== "" && flag_salvar) {
        await AsyncStorage.setItem('@dados', JSON.stringify(dadosTotal));
        const element = dadosTotal[0];
        const aux_lista = filterDoencas(element)
        setDoencasLista(aux_lista);
        await AsyncStorage.setItem('@doencas', JSON.stringify(aux_lista));
        console.log("Dados Armazenados");
      }
      //console.log(dadosTotal);
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