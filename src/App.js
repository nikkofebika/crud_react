import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('anying');
    fetch('http://127.0.0.1:8080/users').then(res => console.log('res', res));
  });
  return (
    <SafeAreaView style={{padding: 20}}>
      <StatusBar backgroundColor="#f0f" />
      <Text style={styles.headTitle}>TUTORIAL CRUD REACT NATIVE</Text>
      <View>
        <TextInput placeholder="Nama Lengkap" style={styles.inputan} />
        <TextInput placeholder="Alamat Email" style={styles.inputan} />
        <TextInput placeholder="Usia" style={styles.inputan} />
        <Button
          title="Simpan"
          color="green"
          accessibilityLabel="Learn more about this purple button"
          style={styles.buttonSubmit}
        />
      </View>
      <View style={{height: 1, backgroundColor: 'black', marginVertical: 10}} />
      {/* <ScrollView contentInsetAdjustmentBehavior="automatic">
        {data.map((user, i) => {
          return <Card />;
        })}
      </ScrollView> */}
    </SafeAreaView>
  );
};

const Card = () => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <View style={styles.cardDetail}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Nama Lengkap</Text>
        <Text>EMail</Text>
        <Text>Usia</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={() => alert('edit')}>
          <Text style={styles.btnEdit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Hapus')}>
          <Text style={styles.btnDelete}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputan: {
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'gray',
    padding: 10,
  },
  cardImage: {
    height: 80,
    width: 80,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardDetail: {
    marginLeft: 5,
  },
  btnEdit: {
    backgroundColor: 'yellow',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnDelete: {
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    color: 'white',
  },
});

export default App;
