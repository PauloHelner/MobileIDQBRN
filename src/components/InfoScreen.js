import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_IP } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const IP_PORT = LOCAL_IP;

export default function InfoScreen(props) {
  const [formasDeContagio, setFormasDeContagio] = useState("");
  const [recomendacoes, setRecomendacoes] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [infos, setInfos] = useState([]);
  function capitalize_first_letter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    (async () => {
      const infos = await AsyncStorage.getItem('@infos');
      if (infos != null) {
        setInfos(JSON.parse(infos));
      }
      else {
        axios.get((IP_PORT + '/info/doenca'))
          .then(res => {
            console.log(res.data);
            setInfos(res.data);
          })
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (infos !== []) {
        await AsyncStorage.setItem('@infos', JSON.stringify(infos));
        var doencaNome = props.route.params.toLowerCase();
        doencaNome = capitalize_first_letter(doencaNome);
        for (let i = 0; i < infos.length; i++) {
          if (infos[i]['doenca'] === doencaNome) {
            setRecomendacoes(infos[i]['recomendacoes']);
            setFormasDeContagio(infos[i]['formasdecontagio']);
            setSintomas(infos[i]['sintomas']);
            break;
          }
        }
      }
    })();
  }, [infos])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, { paddingBottom: 20 }]}>
          <View style={styles.box}>
            <Image source={require('../img/microscopioFlat.png')} style={{ width: 150, height: 150 }} />
            <Text style={styles.title}>{props.route.params}</Text>
          </View>
          <Text style={styles.topic} >Formas de Contágio: </Text>
          <Text style={styles.paragraph} >{formasDeContagio}</Text>
          <Text style={styles.topic} >Sintomas: </Text>
          <Text style={styles.paragraph} >{sintomas}</Text>
          <Text style={styles.topic} >Recomendações: </Text>
          <Text style={styles.paragraph} >{recomendacoes}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  box: {
    width: '90%',
    maxWidth: 400,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'left',
    color: '#34495e',
    textAlignVertical: 'center',
  },
  topic: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e',
  },
  paragraph: {
    marginHorizontal: 25,
    fontSize: 15,
    textAlign: 'left',
    color: '#34495e',
  },
});