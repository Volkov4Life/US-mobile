import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6a8xuziwgU_1GVK8fzvvUHUYb9RuPYOA",
  authDomain: "us-react.firebaseapp.com",
  databaseURL: "https://us-react-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "us-react",
  storageBucket: "us-react.firebasestorage.app",
  messagingSenderId: "652009287650",
  appId: "1:652009287650:web:320ea74d5f41bae1b4d3bb",
  measurementId: "G-15DK94CQEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const adsCollection = collection(db, 'ads');
      const adsSnapshot = await getDocs(adsCollection);
      const adsList = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAds(adsList);
    };
    fetchAds();
  }, []);

  const renderAd = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imgSrc }} style={styles.image} />
      <Text style={styles.title}>{item.naslov}</Text>
      <Text style={styles.description}>{item.opis}</Text>
      <Text style={styles.details}>Cena: {item.cena}</Text>
      <Text style={styles.details}>Kategorija: {item.kategorija}</Text>
      <Text style={styles.details}>Prodajalec: {item.seller}</Text>
      <Text style={styles.details}>Tip: {item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
        renderItem={renderAd}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
  },
  card: {
    backgroundColor: '#444',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc0000',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 3,
  },
});
