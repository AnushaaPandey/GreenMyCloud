import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ArticleDetailScreen = ({ route }) => {
  const { title, url } = route.params.article;
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticleContent();
  }, []);

  const fetchArticleContent = async () => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      // Parse the HTML and extract content here
      // Example: const content = parseHTML(html);
      // For simplicity, let's assume the content is directly available in the HTML
      setContent(html); // Set the content fetched from the API
    } catch (error) {
      console.error('Error fetching article content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default ArticleDetailScreen;
