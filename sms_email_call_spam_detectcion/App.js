import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Sample data for demonstration purposes
const sampleSMS = [
  { id: '1', content: 'Congratulations! You have won a prize!', isSpam: true },
  { id: '2', content: 'Your appointment is confirmed.', isSpam: false },
];

const sampleEmails = [
  { id: '1', subject: 'Your invoice is ready', isSpam: false },
  { id: '2', subject: 'Win a free iPhone!', isSpam: true },
  
];

const sampleCalls = [
  { id: '1', number: '+1234567890', isSpam: true },
  { id: '2', number: '+0987654321', isSpam: false },
  
];

// Component for displaying SMS
const SMSScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 10 SMS</Text>
      <FlatList
        data={sampleSMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={item.isSpam ? styles.spam : styles.normal}>
            {item.content} - {item.isSpam ? 'Spam' : 'Normal'}
          </Text>
        )}
      />
    </View>
  );
};

// Component for displaying Emails
const EmailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 10 Emails</Text>
      <FlatList
        data={sampleEmails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={item.isSpam ? styles.spam : styles.normal}>
            {item.subject} - {item.isSpam ? 'Spam' : 'Normal'}
          </Text>
        )}
      />
    </View>
  );
};

// Component for displaying Call Data
const CallScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 10 Calls</Text>
      <FlatList
        data={sampleCalls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={item.isSpam ? styles.spam : styles.normal}>
            {item.number} - {item.isSpam ? 'Spam' : 'Normal'}
          </Text>
        )}
      />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="SMS" component={SMSScreen} />
        <Tab.Screen name="Email" component={EmailScreen} />
        <Tab.Screen name="Calls" component={CallScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spam: {
    color: 'red',
    marginVertical: 5,
  },
  normal: {
    color: 'green',
    marginVertical: 5,
  },
});

export default App;
