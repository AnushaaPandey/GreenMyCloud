import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://your-django-backend-url/scrape-articles/');
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
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default Articles;
