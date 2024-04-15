// import React from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
// } from 'react-native';

// export default function AdminButtons({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Hello, Admin!</Text>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             navigation.navigate('AdminPage'); 
//           }}>
//           <Text style={styles.buttonText}>Add Books</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {

            
//           }}>
//           <Text style={styles.buttonText}>Re-scan</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';

export default function AdminButtons({ navigation }) {

  const handleReScanPress = () => {
    // Get the database instance
    const database = getDatabase();
  
    // Create a reference to the 'int' field inside 'test' node
    const intRef = ref(database, 'test/int');
  
    // Set the value of 'int' to 1
    set(intRef, 1)
      .then(() => {
        alert('BookWand is scanning your shelf :)');
  
        // Set a timeout to update the value to 0 after 2 seconds
        setTimeout(() => {
          set(intRef, 0)
            .then(() => {
              //alert('');
            })
            .catch((error) => {
              console.error("Error updating int value to 0: ", error);
              alert('Failed to update the int value to 0.');
            });
        }, 2000); // 2000 milliseconds = 2 seconds
      })
      .catch((error) => {
        console.error("Error updating int value to 1: ", error);
        alert('Failed to update the int value to 1.');
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello, Admin!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdminPage')}>
          <Text style={styles.buttonText}>Add Books</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleReScanPress}>
          <Text style={styles.buttonText}>Re-scan</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 30,
    fontFamily: 'Georgia',
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006400',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Georgia',
  },
});