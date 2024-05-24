import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ArticleDetailScreen = ({ route }) => {
  const { title, content } = route.params.article;

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
