import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SpamDetectionApp from './SpamDetectionApp'; // Adjust the path as necessary

const App = () => {
  return (
    <NavigationContainer>
      <SpamDetectionApp />
    </NavigationContainer>
  );
};

export default App;