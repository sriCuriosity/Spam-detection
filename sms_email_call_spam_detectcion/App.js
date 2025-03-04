import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { checkSpamSMS, checkSpamEmail, checkSpamCaller } from './SpamDetectionApp';

const Tab = createBottomTabNavigator();

// SMS Component
const SMS = () => {
  const [smsList, setSMSList] = useState([
    { id: '1', text: 'Congratulations, you have won a free gift!' },
    { id: '2', text: 'Reminder: Your appointment is scheduled for tomorrow.' },
  ]);

  useEffect(() => {
    const checkSMS = async () => {
      const updatedSMS = await Promise.all(
        smsList.map(async (sms) => ({
          ...sms,
          spam: await checkSpamSMS(sms.text),
        }))
      );
      setSMSList(updatedSMS);
    };

    checkSMS();
  }, []);

  return (
    <View>
      <FlatList
        data={smsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.text} - {item.spam ? 'Spam' : 'Normal'}</Text>
        )}
      />
    </View>
  );
};

// Email Component
const Emails = () => {
  const [emailList, setEmailList] = useState([
    { id: '1', subject: 'Free money for you!' },
    { id: '2', subject: 'Your recent order is confirmed.' },
  ]);

  useEffect(() => {
    const checkEmails = async () => {
      const updatedEmails = await Promise.all(
        emailList.map(async (email) => ({
          ...email,
          spam: await checkSpamEmail(email.subject),
        }))
      );
      setEmailList(updatedEmails);
    };

    checkEmails();
  }, []);

  return (
    <View>
      <FlatList
        data={emailList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.subject} - {item.spam ? 'Spam' : 'Normal'}</Text>
        )}
      />
    </View>
  );
};

// Calls Component
const Calls = () => {
  const [callList, setCallList] = useState([
    { id: '1', number: '+919443678098' },
    { id: '2', number: '+917600000000' },
  ]);

  useEffect(() => {
    const checkCalls = async () => {
      const updatedCalls = await Promise.all(
        callList.map(async (call) => ({
          ...call,
          spam: await checkSpamCaller(call.number),
        }))
      );
      setCallList(updatedCalls);
    };

    checkCalls();
  }, []);

  return (
    <View>
      <FlatList
        data={callList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.number} - {item.spam ? 'Spam' : 'Normal'}</Text>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="SMS" component={SMS} />
        <Tab.Screen name="Emails" component={Emails} />
        <Tab.Screen name="Calls" component={Calls} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
