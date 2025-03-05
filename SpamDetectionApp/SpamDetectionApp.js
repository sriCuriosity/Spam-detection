// spamDetection.js

// Function to check if SMS is spam using Postmark's SpamCheck API
export const checkSpamSMS = async (smsText) => {
  try {
    const response = await fetch('https://spamcheck.postmarkapp.com/filter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: smsText,  // Sending the SMS content as if it were an email
        options: 'short', // Use 'short' for a faster response
      }),
    });

    const result = await response.json();

    // If Postmark returns a score greater than 5, consider it spam
    if (result && result.score > 5) {
      return true;  // Mark as spam
    }

    return false; // Not spam
  } catch (error) {
    console.error('Error checking spam for SMS:', error);
    return false; // Assume not spam in case of error
  }
};

// Function to check if an email is spam using Postmark's SpamCheck API
export const checkSpamEmail = async (emailContent) => {
  try {
    const response = await fetch('https://spamcheck.postmarkapp.com/filter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailContent,  // Sending the raw email content
        options: 'short', // Use 'short' for faster processing
      }),
    });

    const result = await response.json();

    // If Postmark returns a score greater than 5, consider it spam
    if (result && result.score > 5) {
      return true;  // Mark as spam
    }

    return false; // Not spam
  } catch (error) {
    console.error('Error checking spam for email:', error);
    return false; // Assume not spam in case of error
  }
};

// Function for checking if a caller is flagged as spam using Truecaller API (no change needed here)
export const checkSpamCaller = async (phoneNumber) => {
  try {
    const response = await fetch(`https://truecaller4.p.rapidapi.com/api/v1/getDetails?countryCode=IN&phoneNumber=${phoneNumber}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '4a6e0ad8bfmsh12f324e821816ffp1edb8bjsnc8ed73c5cd91',  // Truecaller API Key
        'x-rapidapi-host': 'truecaller4.p.rapidapi.com',
      },
    });

    const result = await response.json();
    
    // If the response indicates spam, mark it as spam
    if (result && result.data && result.data.isSpam) {
      return true; // Mark as spam
    }

    return false; // Not spam
  } catch (error) {
    console.error('Error checking spam for caller:', error);
    return false; // Assume not spam in case of error
  }
};