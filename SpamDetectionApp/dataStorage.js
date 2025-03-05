import AsyncStorage from "@react-native-async-storage/async-storage";

const getStoredData = async (key, limit) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    let parsedData = storedData ? JSON.parse(storedData) : [];
    return parsedData.slice(0, limit);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return [];
  }
};

const saveData = async (key, newData) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(newData));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const getSMSData = async (limit) => {
  return getStoredData("SMS_DATA", limit);
};

export const getEmailData = async (limit) => {
  return getStoredData("EMAIL_DATA", limit);
};

export const getCallData = async (limit) => {
  return getStoredData("CALL_DATA", limit);
};

export const addNewSMS = async (sms) => {
  const existingData = await getStoredData("SMS_DATA", 100);
  const updatedData = [sms, ...existingData];
  saveData("SMS_DATA", updatedData);
};

export const addNewEmail = async (email) => {
  const existingData = await getStoredData("EMAIL_DATA", 100);
  const updatedData = [email, ...existingData];
  saveData("EMAIL_DATA", updatedData);
};

export const addNewCall = async (call) => {
  const existingData = await getStoredData("CALL_DATA", 100);
  const updatedData = [call, ...existingData];
  saveData("CALL_DATA", updatedData);
};
