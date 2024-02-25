// FaqScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import { Color } from '../../assets/themes/theme';

const FaqScreen = () => {

  const faqs = [
    { question: 'How do I sell a property on Cyzill?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' },
    { question: 'How do I sell a property on Cyzill?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' },
    { question: 'How do I sell a property on Cyzill?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' },
    { question: 'How do I sell a property on Cyzill?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' },
    // Add more FAQs as needed
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.container}>
            <TouchableOpacity
              style={[styles.question, { backgroundColor: activeIndex === index ? '#2893FE' : Color.lightgray }]}
              onPress={() => toggleAnswer(index)}
            >
              <Text style={[styles.questionText, { color: activeIndex === index ? 'white' : 'black' }]}>
                {faq.question}
              </Text>
            </TouchableOpacity>
            {activeIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.bgcolor,
  },
  wrapper: {
    width: '100%',
  },
  question: {
    borderRadius: 20,
    marginBottom: 1,
    padding: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.white,
  },
  answerContainer: {
    maxHeight: 500, // Set a maximum height for the answer container
    overflow: 'hidden',
    transition: 'height 0.3s',
    borderRadius: 20,
    backgroundColor: Color.lightblue, 
  },
  answerText: {
    padding: 20,
    lineHeight: 24,
    color: Color.white,
  },
});

export default FaqScreen;
