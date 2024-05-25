import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const FAQScreen = () => {
  const [expandedAnswerId, setExpandedAnswerId] = useState(null);

  const faqData = [
    {
      id: '1',
      category: 'Carbon Footprint',
      questions: [
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
      ],
    },
    {
      id: '2',
      category: 'Carbon Emissions',
      questions: [
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
      ],
    },
  ];

  // Toggle visibility of full answer
  const toggleAnswer = id => {
    setExpandedAnswerId(id === expandedAnswerId ? null : id);
  };

  // Render individual FAQ item
  const renderFAQItem = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.category}</Text>
      {item.questions.map(question => (
        <TouchableOpacity
          key={question.id}
          style={styles.itemContainer}
          onPress={() => toggleAnswer(question.id)}
        >
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>
            <AntDesign
              name={question.id === expandedAnswerId ? "caretup" : "caretdown"}
              size={18}
              color="#666"
            />
          </View>
          {question.id === expandedAnswerId && (
            <Text style={styles.answerText}>{question.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
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
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 16,
    color: '#666',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default FAQScreen;
