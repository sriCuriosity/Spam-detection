# 🛡️ Ultimate Spam Detector

## Overview

Welcome to the **Ultimate Spam Detector**! This React Native application is your personal shield against digital nuisance. Whether it's a pesky telemarketer, a phishing SMS, or a "You've won a lottery" email, this app is designed to identify and flag them, keeping your communication channels clean and secure.

This repository contains two projects, with `sms_email_call_spam_detectcion` being the main, feature-rich application.

---

## 🚀 Features

The application is built around three core pillars of protection:

### 📱 1. SMS Guard
Automatically scans your incoming SMS messages.
- **How it works:** Retreives SMS messages from your inbox and analyzes their content.
- **Spam Check:** Uses advanced text analysis to detect spam keywords and patterns.

### 📧 2. Email Shield
Connects securely to your Gmail account to filter out junk.
- **How it works:** Uses Google Sign-In to fetch recent emails (subject and snippet).
- **Spam Check:** Evaluates the email subject lines for known spam triggers.

### 📞 3. Call Screener
Identifies potential spam callers before you pick up.
- **How it works:** Accesses your call log history.
- **Spam Check:** Cross-references phone numbers against a massive global database of reported spam numbers.

---

## 🧠 Technical Deep Dive

This project isn't just a UI wrapper; it leverages powerful APIs to perform real-time analysis.

### The Brain: Spam Logic (`SpamDetectionApp.js`)

The intelligence of the app comes from two primary external services:

1.  **Postmark SpamCheck API** (For SMS & Email)
    *   **Endpoint:** `https://spamcheck.postmarkapp.com/filter`
    *   **Logic:** The app sends the text content (SMS body or Email subject) to Postmark. If the returned "spam score" is greater than **5**, the message is flagged as spam.

2.  **Truecaller API via RapidAPI** (For Calls)
    *   **Endpoint:** `https://truecaller4.p.rapidapi.com/api/v1/getDetails`
    *   **Logic:** The app queries the Truecaller database with the caller's phone number. If the API returns `isSpam: true`, the call is flagged.

### The Senses: Data Retrieval (`App.js`)

To feed the brain, the app needs to see and hear. It uses native modules to access device data:

*   **SMS:** Uses `react-native-sms-retriever` to read SMS messages.
*   **Email:** Uses `@react-native-community/google-signin` and `googleapis` to authenticate via OAuth2 and fetch Gmail messages.
*   **Calls:** Uses `react-native-call-log` to access the device's call history.

---

## 🛠️ Tech Stack

*   ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
*   ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
*   ![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white) (Gmail API)
*   **Postmark API** (Text Analysis)
*   **RapidAPI** (Truecaller Integration)

---

## 📂 Repository Structure

*   **`sms_email_call_spam_detectcion/`**: The main application code containing all features.
*   **`SpamDetectionApp/`**: A simplified or earlier version of the project.

---

## ⚙️ Installation & Setup

To run the main application:

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd sms_email_call_spam_detectcion
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure API Keys**
    *   Open `SpamDetectionApp.js` and ensure the RapidAPI key is valid for Truecaller.
    *   Open `App.js` and configure your Google Web Client ID for Gmail authentication.

4.  **Run the App**
    ```bash
    npx expo start
    ```

---

## ⚠️ Privacy & Permissions

This app requires sensitive permissions (Read SMS, Read Call Log, Access Gmail).
*   **Privacy:** The data fetched (messages, logs) is sent to external APIs (Postmark, RapidAPI) for analysis. Ensure you are comfortable with this data flow before using the app with real personal data.

---

*Stay safe and spam-free!* 🛡️
