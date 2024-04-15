import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import axios from 'axios';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [docData, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDocs(collection(db, '/Books/'))
                let data = []
                docSnap.forEach((doc) => {

                    data.push({

                        ...doc.data(),
                        id: doc.id
                    })
                })
                console.log(data)
                setData(data)
            } catch (error) { console.log(error) }

        }
        fetchData()
        const interval = setInterval(fetchData, 9000)
        return () => {

            clearInterval(interval)
        }
    }, [])

    function renderInputToolbar(props) {
        return <InputToolbar {...props} containerStyle={styles.toolbar} />;
    }

    function renderSend(props) {
        return (
            <Send {...props} containerStyle={styles.sendButton}>
                <View style={styles.enter} />
            </Send>
        );
    }

    const handleSend = async (newMessages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        const messageText = newMessages[0].text.toLowerCase();
        const serializedDocData = JSON.stringify(docData);
        try {
            const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
                prompt: `This file is the json file “${serializedDocData}” that contains details of books in the library. Each {} represents a new book entry with fields for the author's name, availability status(True or False) , book number (shelf location), and the book ID (book name). As BookWand's chatbot, you should use this data to inform users accurately. If a user queries about a book, first check if the book is in the provided file. If the book is listed in the file as false under availability or if the book is not found in the file, respond with "Book not Available." Else, return with the information of the book. For any questions regarding the book's content such as genre, ratings, synopsis, or comparisons, provide answers if the data is available. If the user wants to borrow a book, respond with the location of the book as written on the file and ask the user to redirect to the Borrow books page. The users query is: “${messageText}”`,
                max_tokens: 1400,
                temperature: 0.2,
                n: 1,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer `
                }
            });

            const botResponse = response.data.choices[0].text.trim();
            const botMessage = {
                _id: Date.now(),
                text: botResponse,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'BookWand'
                }
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        } catch (error) {
            console.error('Error responding:', error);
        }
    };

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>BookWand</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={newMessages => handleSend(newMessages)}
                user={{ _id: 1 }}
                renderInputToolbar={renderInputToolbar}
                renderSend={renderSend}
                placeholder="Type your message..."
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#006400',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Georgia',
        color: '#000000',
    },
    toolbar: {
        minHeight: 44,
        borderTopWidth: 0,
        borderRadius: 20,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    sendButton: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    enter: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#006400',
    },
});