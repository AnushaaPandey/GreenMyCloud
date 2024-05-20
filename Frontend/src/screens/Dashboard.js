import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = ({navigation}) => { 
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:8000/scrape-articles/');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const openArticleUrl = (url) => {
    Linking.openURL(url);
  };

  const renderArticleItem = ({ item }) => (
    <TouchableOpacity onPress={() => openArticleUrl(item.url)} style={styles.articleItem}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleSource}>{item.source}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>GreenCloud</Text>
      </View>

      {/* Main content */}
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.title}
        style={styles.content}
      />

      {/* Footer navbar */}
      <View style={styles.footer}>
        {/* Add navbar buttons here */}
        <Text
          style={styles.navbarButton}
          onPress={() => navigation.navigate('Home')} // Example navigation action
        >
          Home
        </Text>
        <Text
          style={styles.navbarButton}
          onPress={() => navigation.navigate('CarbonEmissions')} // Example navigation action
        >
          Calculate Emissions
        </Text>
        <Text
          style={styles.navbarButton}
          onPress={() => navigation.navigate('Settings')} // Example navigation action
        >
          Settings
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6F8D6',
  },
  header: {
    backgroundColor: '#D6F8D6',
    padding: 15,
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  articleItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleSource: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0D1321',
    paddingVertical: 8,
  },
  navbarButton: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Dashboard;
