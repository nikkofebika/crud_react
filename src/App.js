import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  Form
} from 'react-native';

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('useEffect 1')
    getData();
  }, []);

  const getData = () => {
    axios.get('https://my-json-server.typicode.com/nikkofebika/crud_react/users').then(res => {
      console.log('fetch data', res)
      setData(res.data);
    }).catch(error => console.log('error fetch users', error));
  }

  const handleSubmit = () => {
    const data = JSON.stringify({
      name, age, email
    })
    axios.post('https://my-json-server.typicode.com/nikkofebika/crud_react/users', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response);
      setName("");
      setEmail("");
      setAge(null);
      getData();
    }).catch(error => {
      console.log(error);
    });
    console.log('data submit', data)
  }
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <StatusBar backgroundColor="#f0f" />
      <Text style={styles.headTitle}>TUTORIAL CRUD REACT NATIVE</Text>
      <View>
        <TextInput value={name} onChangeText={val => setName(val)} placeholder="Nama Lengkap" style={styles.inputan} />
        <TextInput value={email} onChangeText={val => setEmail(val)} placeholder="Alamat Email" style={styles.inputan} />
        <TextInput value={age} onChangeText={val => setAge(val)} placeholder="Usia" keyboardType="numeric" style={styles.inputan} />
        <Button
          title="Simpan"
          color="green"
          accessibilityLabel="Learn more about this purple button"
          onPress={handleSubmit}
          style={styles.buttonSubmit}
        />
      </View>
      <View style={{ height: 1, backgroundColor: 'black', marginVertical: 10 }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {data.map(user => {
          return <Card key={user.id} name={user.name} email={user.email} age={user.age} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const Card = ({ name, email, age }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <View style={styles.cardDetail}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
        <Text>{email}</Text>
        <Text>Usia {age} Th</Text>
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
