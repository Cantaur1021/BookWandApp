import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { db } from '../firebaseConfig';

const windowWidth = Dimensions.get('window').width;

export default function Profile() {


  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const [borrowedBooks, setBorrowedBook] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDocs(collection(db, '/Users/user_id/borrowedBooks'))
        let data = []
        docSnap.forEach((doc) => {
          data.push({
            ...doc.data(),
            id: doc.id
          })
        })
        setBorrowedBook(data)
        console.log("data is: ", data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    const intervalID = setInterval(fetchData, 4000)
    return () => clearInterval(intervalID)
  }, []);

  const renderBorrowedBook = ({ item }) => (
    <View style={styles.bookItemContainer}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.bookId}</Text>
        <Text style={styles.bookAuthor}>Return Date: {item.returnDate}</Text>
        <Text style={styles.bookAuthor}>Borrow Date: {item.borrowDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { fontSize: 24, marginTop: 20 }]}>Profile</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={[styles.section, { paddingTop: 4 }]}>
            <Text style={styles.sectionTitle}>User</Text>

            <View style={styles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.profile}>
                <Image
                  alt=""
                  source={require('../assets/d8c55621-1c84-4405-8839-e813d8af4e53.jpg')}
                  style={styles.profileAvatar} />

                <View style={styles.profileBody}>
                  <Text style={styles.profileName}>Ninas Gama</Text>

                  <Text style={styles.profileHandle}>
                    ninasgama@user.com
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Language</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>English</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Location</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Middlesex University, Dubai</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 20 }]}>Books Borrowed</Text>
            <FlatList
              data={borrowedBooks}
              renderItem={renderBorrowedBook}
              keyExtractor={item => item.id}

              style={{ height: 200 }}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionBody}>
              <View
                style={[
                  styles.rowWrapper,
                  styles.rowFirst,
                  styles.rowLast,
                  { alignItems: 'center' },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.contentFooter}></Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Georgia',
  },
  content: {
    marginTop: 28,
    paddingHorizontal: 16,
    paddingBottom: 16,
    width: windowWidth,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#092532',
    fontFamily: 'Georgia',
  },
  section: {
    paddingVertical: 12,
  },
  bookItemContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',


    borderBottomWidth: 1,

    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 9,
    marginTop: 9,
    borderColor: 'green',

  },
  bookInfo: {
    flex: 1,
  },
  sectionTitle: {
    marginLeft: 12,
    marginBottom: 8,
    fontSize: 20,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#292929',
    textTransform: 'capitalize',
    fontFamily: 'Georgia',
  },
  sectionBody: {
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Georgia',
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontFamily: 'Georgia',
    fontWeight: '400',
    color: '#858585',
  },
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
    fontFamily: 'Georgia',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#006400',
    marginRight: 4,
    fontFamily: 'Georgia',
  },
  rowLast: {
    marginTop: 170,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {

    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
    fontFamily: 'Georgia',
  },
});