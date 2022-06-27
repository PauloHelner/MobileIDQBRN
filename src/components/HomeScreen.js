import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import CardButton from './CardButton';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_IP } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const range = 0.5;
var casosTotais = {};
var incomplete_list = [];

export default function HomeScreen({ navigation }) {
  const [dadosTotal, setDadosTotal] = useState("");
  const [doencas_lista, setDoencasLista] = useState([]);
  const [flag_salvar, setFlag] = useState(true);
  const [flag_button, setButton] = useState(false);

  const [location, setLocation] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentTimestamp, setCurrentTimestamp] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const callLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setCurrentLatitude(location.coords.latitude);
    setCurrentLongitude(location.coords.longitude);
    const date = new Date(location.timestamp);
    setCurrentTimestamp(date.toString());
    calcularCasos(location.coords.latitude, location.coords.longitude);
  };

  let text = 'Aguarde..';
  if (errorMsg) {
    text = errorMsg;
  }

  function calcularCasos(clat, clon) {
    for (let i = 11; i < Object.keys(dadosTotal[0]).length; i++) {
      casosTotais[Object.keys(dadosTotal[0])[i]] = 0;
    }
    dadosTotal.forEach(element => {
      let lat = parseFloat(element['latitude'].replace(',', '.'));
      let lon = parseFloat(element['longitude'].replace(',', '.'));
      if (lat >= clat - range && lat <= clat + range && lon >= clon - range && lon <= clon + range) {
        for (let i = 11; i < Object.keys(element).length; i++) {
          casosTotais[Object.keys(element)[i]] = casosTotais[Object.keys(element)[i]] + parseInt(element[Object.keys(element)[i]]);
        }
      }
    });
    for (let i = 11; i < Object.keys(dadosTotal[0]).length; i++) {
      let val = casosTotais[Object.keys(dadosTotal[0])[i]];
      if (val > 0)
        casosTotais[Object.keys(dadosTotal[0])[i]] = 1;
      if (val > 500)
        casosTotais[Object.keys(dadosTotal[0])[i]] = 2;
      if (val > 1000)
        casosTotais[Object.keys(dadosTotal[0])[i]] = 3;
    }
    for (let i = 0; i < incomplete_list.length; i++) {
      for (let j = 0; j < incomplete_list.length - 1; j++) {
        if (casosTotais[incomplete_list[j]] < casosTotais[incomplete_list[j + 1]]) {
          let temp = incomplete_list[j];
          incomplete_list[j] = incomplete_list[j + 1];
          incomplete_list[j + 1] = temp;
        }
        if (casosTotais[incomplete_list[j]] === casosTotais[incomplete_list[j + 1]] && incomplete_list[j] > incomplete_list[j + 1]) {
          let temp = incomplete_list[j];
          incomplete_list[j] = incomplete_list[j + 1];
          incomplete_list[j + 1] = temp;
        }
      }
    }
    setDoencasLista(incomplete_list);
  }

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
      if (dados != null && dados_lista != null) {
        setFlag(false);
        setDadosTotal(JSON.parse(dados));
        incomplete_list = JSON.parse(dados_lista);
        const keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.multiRemove(keys)
        console.log("Dados Limpados");
        setButton(true);
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
        //setDoencasLista(aux_lista);
        incomplete_list = aux_lista;
        await AsyncStorage.setItem('@doencas', JSON.stringify(aux_lista));
        console.log("Dados Armazenados");
        setButton(true);
      }
      //console.log(dadosTotal);
    })();
  }, [dadosTotal])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          {doencas_lista.map(doenca => <CardButton key={doenca} name={doenca} freq={casosTotais[doenca]} navigation={navigation} />)}
          {!flag_button && <Text style={styles.paragraph}>{text}</Text>}
          {flag_button &&
            <>
              {location && <Text style={styles.paragraph}>Atualizado por último em:</Text>}
              <Text style={styles.paragraph}>{currentTimestamp}</Text>
              <Button title="Localizar" onPress={callLocation} />
            </>
          }
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