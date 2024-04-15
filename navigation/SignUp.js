import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignUp({navigation}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.image}
            source={require('../assets/iphone-splash-preview-dark.png')}
          />
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <View style={styles.headerBack}>
              {/* Placeholder for potential back button or other header elements */}
            </View>

            <Text style={styles.title}>
              Welcome To BookWand!
            </Text>

            <Text style={styles.subtitle}>
            Fill in your details down below to indulge in the magic of books!
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={name => setForm({ ...form, name })}
                placeholderTextColor="#FFFFFF"
                style={styles.inputControl}
                value={form.name}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
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
                clearButtonMode="while-editing"
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
                  navigation.navigate('Main');
                }}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Let's get started!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          style={{ marginTop: 'auto' }}
        >
          <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in here</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AdminLogIn');
          }}
          style={{ marginTop: 'auto' }}
        >
          <Text style={styles.adminSigninText}>
            Admin?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: -15,
    marginTop: 0,
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 30,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 16,
    textAlign: 'center', // Center align the text
  },
  subtitle: {
    fontFamily: 'Georgia',
    fontSize: 15,
    fontWeight: '500',
    color: '#B8860B',
    textAlign: 'center', // Center align the subtitle as well
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 30,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontFamily: "Georgia",
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  adminSigninText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: "Georgia",
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
    marginTop: 10,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Georgia',
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#006400', // Dark green color
    borderColor: '#006400', // Dark green color
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'Georgia',
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
