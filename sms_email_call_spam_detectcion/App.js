import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SmsRetriever from 'react-native-sms-retriever';
import { GoogleSignin } from '@react-native-community/google-signin';
import { google } from 'googleapis';
import CallLogs from 'react-native-call-log';
import { checkSpamSMS, checkSpamEmail, checkSpamCaller } from './SpamDetectionApp';
import TcpSocket from "react-native-tcp-socket";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color to black
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Ensure safe area padding for different OS
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 40, // Set the width of the logo
    height: 40, // Set the height of the logo
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
});

// Request permission for SMS access
async function requestSmsPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "SMS Permission",
        message: "We need access to your SMS to display messages.",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;  // No permission needed for iOS
}

// Fetch SMS
async function fetchSms(setSMSList) {
  try {
    const hasPermission = await requestSmsPermission();
    if (hasPermission) {
      const messages = await SmsRetriever.requestPhoneNumber();
      setSMSList(prev => [...prev, { id: '3', text: messages }]); // Add fetched SMS
    } else {
      console.log("Permission denied");
    }
  } catch (error) {
    console.error("Error retrieving SMS: ", error);
  }
}

// Configure Google Sign-In
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
  webClientId: '456281401658-ao2h92lr4ah0aju8c7s6dun639rpsuho.apps.googleusercontent.com', // Add your Web Client ID here
  offlineAccess: true,
});

// Fetch Emails
async function fetchEmails(setEmailList) {
  try {
    await GoogleSignin.signIn();
    const userInfo = await GoogleSignin.getCurrentUser();
    const auth = userInfo.idToken;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: auth,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const res = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults: 10,
    });

    const emails = res.data.messages.map(msg => ({
      id: msg.id,
      subject: msg.snippet,
    }));

    setEmailList(emails); // Set fetched emails
  } catch (error) {
    console.error('Error fetching emails: ', error);
  }
}

// Request permission for call logs access
async function requestCallLogPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: "Call Log Permission",
        message: "We need access to your call logs to display caller information.",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;  // No permission needed for iOS
}

async function fetchCalls(setCallList) {
  try {
    const hasPermission = await requestCallLogPermission();
    if (hasPermission) {
      const callLogs = await CallLogs.load(10);  // Fetch last 10 calls
      const calls = callLogs.map(log => ({
        id: log.id,
        number: log.number,
      }));
      setCallList(calls); // Set fetched calls
    } else {
      console.log("Permission denied for call log access");
    }
  } catch (error) {
    console.error("Error retrieving call logs: ", error);
  }
}

// SMS Component
const SMS = () => {
  const [smsList, setSMSList] = useState([
    { id: '1', text: 'Congratulations, you have won a free gift!' },
    { id: '2', text: 'Reminder: Your appointment is scheduled for tomorrow.' },
  ]);

  useEffect(() => {
    const checkSMS = async () => {
      await fetchSms(setSMSList); // Fetch SMS
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
      await fetchEmails(setEmailList); // Fetch Emails
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
      await fetchCalls(setCallList); // Fetch Calls
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
    <SafeAreaView style={styles.container}>

      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="SMS" component={SMS} />
          <Tab.Screen name="Emails" component={Emails} />
          <Tab.Screen name="Calls" component={Calls} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

