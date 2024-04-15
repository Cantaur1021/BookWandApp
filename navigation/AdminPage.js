import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,

} from 'react-native';
import { db } from '../firebaseConfig';

export default function AdminPage() {

  const [bookName, setBook]= useState('')
  const [AuthorName, setAuthor]= useState('')
  const [RatingsName, setRatings]= useState('')
  function create(){

    setDoc(doc(db, 'Books', bookName ), 
    {
      'Author Name': AuthorName, 
      'Ratings': RatingsName,
      'Availability': 'True',
      'BookNumber': '0'
    }
  )
  }

 

  const handleSubmit = () => {
    // Here you could add the function to handle submitting the data
    console.log("Submitting", form);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add New Books!</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Book Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(bookName)=>{
              setBook(bookName)
            }}
            value={bookName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Author Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(AuthorName)=>{
              setAuthor(AuthorName)
            }}
            value={AuthorName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ratings</Text>
          <TextInput
            style={styles.input}
            onChangeText={(RatingsName)=>{
              setRatings(RatingsName)
            }}
            value={RatingsName}
            keyboardType="numeric"
          />
        </View>  

        <TouchableOpacity style={styles.button} onPress={create}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d1d1d',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Georgia',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#222',
    marginBottom: 5,
    fontFamily: 'Georgia',
  },
  input: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    fontSize: 15,
    fontFamily: 'Georgia',
  },
  inputLarge: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#006400',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Georgia',
  },
});
