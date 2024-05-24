import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => { 
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/scrape-articles/');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const openArticleDetail = (article) => {
    navigation.navigate('ArticleDetail', { article });
  };

  const renderArticleItem = ({ item }) => (
    <TouchableOpacity onPress={() => openArticleDetail(item)} style={styles.articleItem}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleSource}>{item.source}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.title}
        style={styles.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6F8D6',
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
});

export default Dashboard;
