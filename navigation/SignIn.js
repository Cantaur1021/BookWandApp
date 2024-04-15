import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

export default function SignIn({navigation}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style = {styles.imagecontainer}>

        <Image style={styles.image}
                    source={require('../assets/iphone-splash-preview-dark.png')} />
        </View>

        <View style={styles.header}>
          <Text style={[styles.title, { marginBottom: 10 }]}> Welcome back to Bookwand!</Text>
          <Text style={[styles.subtitle, { marginBottom: 10 }]}>Your literary companion says hello! Sign in below.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => setForm({ ...form, email })}
              
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              onChangeText={password => setForm({ ...form, password })}
              
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Main')
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp')
            }}>
            <Text style={[styles.formFooter, { marginBottom: 10 }]}>
              Don't have an account?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdminLogIn')
            }}
            style={styles.adminSignIn}>
            <Text style={styles.formFooter}>
              Admin?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Sign in here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },

  image: {

    width:150,
    height: 150, 
    marginBottom:-22,
    marginTop: -10,

  },

imagecontainer: {

justifyContent: 'center',
alignItems: 'center'


},

  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d1d1d',
    textAlign: 'center',
    fontFamily: 'Georgia', // Change font family to Georgia
    marginTop: 0,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#b8860b',
    textAlign: 'center',
    fontFamily: 'Georgia', // Change font family to Georgia
  },
  form: {
    marginBottom: '2%',
  },
  formAction: {
    marginVertical: '1%',
    marginBottom: 20, 
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Georgia', // Change font family to Georgia
  },
  adminSignIn: {
    marginTop: '2%',
    alignSelf: 'center',
    fontFamily: 'Georgia', // Change font family to Georgia
  },
  input: {
    marginBottom: '5%',
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: '2%',
    fontFamily: 'Georgia', // Change font family to Georgia
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    fontFamily: 'Georgia', // Change font family to Georgia
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#006400',
    borderColor: '#006400',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Georgia', // Change font family to Georgia
  },
});