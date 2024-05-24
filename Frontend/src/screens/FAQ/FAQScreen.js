import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const FAQScreen = ({ navigation }) => {
  // Dummy data for FAQ questions and answers
  const faqData = [
    {
      id: '1',
      question: 'What is carbon footprint?',
      answer: 'A carbon footprint is the total amount of greenhouse gases emitted directly or indirectly by human activities.',
    },
    {
      id: '2',
      question: 'How can I reduce my carbon footprint?',
      answer: 'You can reduce your carbon footprint by conserving energy, using renewable resources, reducing waste, and making sustainable choices in daily life.',
    },
    {
      id: '3',
      question: 'What are the main contributors to carbon emissions?',
      answer: 'The main contributors to carbon emissions include transportation, electricity production, industrial processes, and agriculture.',
    },
    {
      id: '4',
      question: 'Why is it important to reduce carbon emissions?',
      answer: 'Reducing carbon emissions is important to mitigate climate change, preserve natural resources, and protect the environment for future generations.',
    },
  ];

  // Render individual FAQ item
  const renderFAQItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('FAQDetail', { faqItem: item })}
    >
      <Text style={styles.questionText}>{item.question}</Text>
      <Text style={styles.answerPreview}>{item.answer.substring(0, 50)}...</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <FlatList
        data={faqData}
        renderItem={renderFAQItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answerPreview: {
    fontSize: 16,
    color: '#666',
  },
});

export default FAQScreen;
