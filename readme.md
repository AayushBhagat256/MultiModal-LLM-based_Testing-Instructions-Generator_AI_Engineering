# Testing Instructions Generator

This project is a multimodal AI-powered tool that generates detailed testing instructions for digital product features based on screenshots and optional context. The backend is built with Node.js, and the frontend uses HTML, CSS, and JavaScript.

## Features

- Upload multiple screenshots of a digital product's UI.
- Provide optional context to guide the AI in generating test cases.
- Get a comprehensive, step-by-step guide on how to test each functionality based on the provided screenshots and context.
- Each test case includes a description, pre-conditions, testing steps, and expected results.

## Tech Stack

- **Backend:** Node.js, Express, Google Generative AI (Gemini API)
- **Frontend:** HTML, CSS, JavaScript

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Google API key with access to the Gemini API.
- Install `nodemon` globally if you want to use it for hot-reloading:

```bash
npm install -g nodemon
```
Backend Setup
Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```
Install the dependencies:

```bash
npm install
```
Create a .env file in the root directory and add your Google API key:

makefile
Copy code
GOOGLE_API_KEY=your-google-api-key
Run the backend server:

```bash
Copy code
node server.js
Or, if you have nodemon installed, you can use:
```

```bash
Copy code
nodemon server.js
```
The server will start running on http://localhost:3000.

Frontend Setup
Open the index.html file in your browser.

Use the UI to upload screenshots and enter any optional context. Click the "Generate Testing Instructions" button to see the generated test cases.

Usage
Input: Upload multiple screenshots of a UI, and optionally provide context to generate more tailored test cases.
Output: Detailed test cases displayed on the front end in a clear, organized markdown format.
Prompting Strategy
To generate high-quality test cases, we provide a structured prompt to the AI model. The prompt consists of:

Introduction: Briefly explain to the AI its role as a multimodal AI designed to generate testing instructions.

Instructions: Detailed steps for the AI to follow in order to generate accurate and relevant test cases, including:

Analyzing screenshots and context.
Generating test cases for each distinct functionality.
Output Format: Specify a consistent and clear format for the AI to follow for each test case, including sections like:

Description
Pre-conditions
Testing Steps
Expected Result
Example Test Case: Provide an example of a well-structured test case to guide the AI's response.

This strategy ensures that the AI outputs comprehensive and standardized test cases suitable for thorough testing of digital products.

# Demo Video
Below is a 3-4 minute video demonstration showing the implementation of this tool with the features of the Red Bus mobile app:

<!-- <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7b24b9bd769349799968d5ce9c4eca8b?sid=e4cb5654-00f1-417c-b26b-c5c7439ac1de" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div> -->
[![Watch the video](https://www.loom.com/share/7b24b9bd769349799968d5ce9c4eca8b?sid=7f0668f3-f2ff-44b9-8dc8-9aed37ae33b2)

# Contact
For any inquiries or support, please contact Aayush Bhagat at aayush91103@gmail.com.