import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  // Dummy news data
  const newsData = [
    { id: 1, title: 'News 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, title: 'News 2', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 3, title: 'News 3', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    // Add more dummy news data as needed
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      {/* Main content */}
      <ScrollView style={styles.content}>
        {/* Dummy news list */}
        {newsData.map((news) => (
          <View key={news.id} style={styles.newsItem}>
            <Text style={styles.newsTitle}>{news.title}</Text>
            <Text style={styles.newsContent}>{news.content}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer navbar */}
      <View style={styles.footer}>
        {/* Add navbar buttons here */}
        <Text style={styles.navbarButton}>Home</Text>
        <Text style={styles.navbarButton}>Calculate Emissions</Text>
        <Text style={styles.navbarButton}>Settings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  newsItem: {
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsContent: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
  },
  navbarButton: {
    color: '#fff',
    fontSize: 16,
  },
});
