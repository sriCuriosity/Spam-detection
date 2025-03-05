import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getSMSData, getEmailData, getCallData } from "./dataStorage";

const Tab = createBottomTabNavigator();

const SMSScreen = () => {
  const [smsData, setSmsData] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setSmsData(await getSMSData(2));
  };

  const refreshData = async () => {
    setSmsData(await getSMSData(smsData.length + 1));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>SMS</Text>
      <FlatList 
        data={smsData} 
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.sender}</Text>
            <Text>{item.message}</Text>
            <Text>Status: {item.isSpam ? "Spam" : "Normal"}</Text>
          </View>
        )} 
        keyExtractor={(item, index) => index.toString()} 
      />
      <Button title="Refresh SMS" onPress={refreshData} />
    </View>
  );
};

const EmailScreen = () => {
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setEmailData(await getEmailData(2));
  };

  const refreshData = async () => {
    setEmailData(await getEmailData(emailData.length + 1));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Emails</Text>
      <FlatList 
        data={emailData} 
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.from}</Text>
            <Text>{item.subject}</Text>
            <Text>Status: {item.isSpam ? "Spam" : "Normal"}</Text>
          </View>
        )} 
        keyExtractor={(item, index) => index.toString()} 
      />
      <Button title="Refresh Emails" onPress={refreshData} />
    </View>
  );
};

const CallScreen = () => {
  const [callData, setCallData] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setCallData(await getCallData(2));
  };

  const refreshData = async () => {
    setCallData(await getCallData(callData.length + 1));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Calls</Text>
      <FlatList 
        data={callData} 
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.caller}</Text>
            <Text>Call Received</Text>
            <Text>Status: {item.isSpam ? "Spam" : "Normal"}</Text>
          </View>
        )} 
        keyExtractor={(item, index) => index.toString()} 
      />
      <Button title="Refresh Calls" onPress={refreshData} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Spam Detection" component={SMSScreen} />
        <Tab.Screen name="Spam Detection" component={EmailScreen} />
        <Tab.Screen name="Spam Detection" component={CallScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;