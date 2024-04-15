import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Modal, FlatList, SafeAreaView, Alert, Platform } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc, addDoc } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const sliderWidth = screenWidth
const sliderHeight = screenHeight
const itemWidth = screenWidth


// Your BookItem component
const BookItem = ({ book, onSelect }) => {

  return (
    <View style={styles.bookItemContainer}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.id}</Text>
        <Text style={styles.bookAuthor}>{book.Author}</Text>
      </View>
      <TouchableOpacity onPress={() => { onSelect(book) }} style={styles.subscribeButton}>
        <Text style={styles.subscribeButtonText}>Borrow</Text>
      </TouchableOpacity>
    </View>
  );
};



// Your main component
const BorrowBooks = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'Books'), where('Availability', '==', "True")));
        const fetchedBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(fetchedBooks);
      } catch (error) {
        Alert.alert("Error", "There was an error fetching the books.");
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const showDatePicker = (book) => {
    setSelectedBook(book);
    setDatePickerVisibility(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePickerVisibility(Platform.OS === 'ios');
    setDate(currentDate);
    if (event.type === 'set') { // Only proceed when the user has confirmed the date
      handleConfirm(currentDate);
    }
  };

  const handleConfirm = (selectedDate) => {
    setDatePickerVisibility(false)
    if (!selectedBook) {
      Alert.alert("Error", "No book selected.");
      return;
    }
    const borrowDate = moment(selectedDate);
    const returnDate = moment(selectedDate).add(14, 'days');
    handleBorrow(selectedBook, borrowDate, returnDate);
  };

  const handleBorrow = async (book, borrowDate, returnDate) => {
    try {
      const bookRef = doc(db, 'Books', book.id);
      await updateDoc(bookRef, {
        Availability: "False",
        BookNumber: "0",
      });

      const userId = "user_id"; // This should be dynamically determined
      const userBorrowedBooksRef = collection(db, 'Users', userId, 'borrowedBooks');
      await addDoc(userBorrowedBooksRef, {
        bookId: book.id,
        borrowDate: borrowDate.toISOString(),
        returnDate: returnDate.toISOString(),
      });

      Alert.alert("Success", `You've borrowed ${book.id} until ${returnDate.format("DD MM YYYY")}.`);
      navigation.navigate('Profile');

      // Update local state to reflect changes
      setBooks(prevBooks => prevBooks.map(b => b.id === book.id ? { ...b, Availability: "False" } : b));
    } catch (error) {
      Alert.alert("Error", "Could not borrow the book. Please try again.");
      console.error("Error during borrowing process:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Borrow Books</Text>
      </View>

      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookItem book={item} onSelect={showDatePicker} />
        )}
        keyExtractor={item => item.id}
      />
      {isDatePickerVisible && (
        <Modal
          animationType='fade'
          transparent={true}
          visible={isDatePickerVisible}
          onRequestClose={() => setDatePickerVisibility(false)}>
          <View style={styles.modalOverlay}>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
              minimumDate={new Date()} // Disable past dates
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

// Styles for your components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e4dc'

  },
  modalOverlay: {
    width: screenWidth,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 90,
    backgroundColor: "#b8860b",
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,


  },
  bookItemContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',


    borderBottomWidth: 1,
    width: 380,
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 9,
    marginTop: 9,
    borderColor: 'green',

  },
  headerText: {
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    marginTop: 40,
    fontSize: 20,

  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: 'Georgia',
    color: '#666',
  },
  subscribeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'green',
  },
  subscribeButtonText: {
    color: '#fff',
    fontFamily: 'Georgia',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BorrowBooks;
