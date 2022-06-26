import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import CardButton from './CardButton';
//import { FloatingAction } from "react-native-floating-action";
//import { useEffect, useState } from 'react/cjs/react.production.min';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_IP } from '@env'
//import fs from 'fs'

export default function HomeScreen({ navigation }) {
  const [dadosTotal, setDadosTotal] = useState();

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
  };

  //dummy text only for testing, may be erased
  let text = 'Waiting..';
  let data = '';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    text =  "Latitude: " + JSON.stringify(currentLatitude) + "\nLongitude: " + JSON.stringify(currentLongitude);
    // data = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp);
    //const d = new Date(currentTimestamp);
    //data = d.toString;
  }

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
          <Text style={styles.paragraph}>{text}</Text>
          <Text style={styles.paragraph}>Atualizado por último em: {currentTimestamp}</Text>
          <Button title="Localizar" onPress = {callLocation}/>
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