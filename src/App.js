import axios from 'axios';
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
  Keyboard,
} from 'react-native';

const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(null);
  const [data, setData] = useState([]);
  const [button, setButton] = useState('Simpan');

  useEffect(() => {
    console.log('useEffect 1');
    getData();
  }, []);

  const getData = () => {
    axios
      .get('https://my-json-server.typicode.com/nikkofebika/crud_react/users')
      .then(res => {
        console.log('fetch data', res);
        setData(res.data);
      })
      .catch(error => console.log('error fetch users', error));
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    const data = {
      name,
      age,
      email,
    };
    console.log('data submit', data);
    if (selectedId !== null) {
      console.log('update data bro');
      axios
        .put(
          `https://my-json-server.typicode.com/nikkofebika/crud_react/users/${selectedId}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response);
          setName('');
          setEmail('');
          setAge(null);
          setSelectedId(null);
          setButton('Simpan');
          getData();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .post(
          'https://my-json-server.typicode.com/nikkofebika/crud_react/users',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response);
          setName('');
          setEmail('');
          setAge(null);
          getData();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const showData = user => {
    console.log('selected user', user);
    setSelectedId(user.id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age.toString());
    setButton('Update');
  };

  const handleDelete = id => {
    console.log('deleted user', id);
    axios
      .delete(
        `https://my-json-server.typicode.com/nikkofebika/crud_react/users/${id}`,
      )
      .then(response => {
        console.log(response);
        setName('');
        setEmail('');
        setAge(null);
        getData();
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={{padding: 20}}>
      <StatusBar backgroundColor="#f0f" />
      <Text style={styles.headTitle}>TUTORIAL CRUD REACT NATIVE</Text>
      <View>
        <TextInput
          value={name}
          onChangeText={val => setName(val)}
          placeholder="Nama Lengkap"
          style={styles.inputan}
        />
        <TextInput
          value={email}
          onChangeText={val => setEmail(val)}
          placeholder="Alamat Email"
          style={styles.inputan}
        />
        <TextInput
          value={age}
          onChangeText={val => setAge(val)}
          placeholder="Usia"
          keyboardType="numeric"
          style={styles.inputan}
        />
        <Button
          title={button}
          color="green"
          accessibilityLabel="Learn more about this purple button"
          onPress={handleSubmit}
          style={styles.buttonSubmit}
        />
      </View>
      <View style={{height: 1, backgroundColor: 'black', marginVertical: 10}} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {data.map(user => {
          return (
            <Card
              key={user.id}
              name={user.name}
              email={user.email}
              age={user.age}
              onPress={() => showData(user)}
              onDelete={() => handleDelete(user.id)}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const Card = ({name, email, age, onPress, onDelete}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.cardImage}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </TouchableOpacity>
      <View style={styles.cardDetail}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{name}</Text>
        <Text>{email}</Text>
        <Text>Usia {age} Th</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'space-around',
        }}>
        {/* <TouchableOpacity onPress={onPress}>
          <Text style={styles.btnEdit}>Edit</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onDelete}>
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
