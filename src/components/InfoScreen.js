import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_IP } from '@env'

export default function InfoScreen(props) {
  const [formasDeContagio, setFormasDeContagio] = useState("");
  const [recomendacoes, setRecomendacoes] = useState("");
  const [sintomas, setSintomas] = useState("");
  function capitalize_first_letter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    console.log(props.route.params);
    var doencaNome = props.route.params.toLowerCase();
    doencaNome = capitalize_first_letter(doencaNome);
    axios.post((LOCAL_IP + '/info/doenca'), { doenca: doencaNome })
      .then(res => {
        setFormasDeContagio(res.data.formasdecontagio);
        setRecomendacoes(res.data.recomendacoes);
        setSintomas(res.data.sintomas);
      })
      .catch(error => console.log(error));
  }, []);
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