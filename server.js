import express from 'express';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import dotenv from "dotenv";
import multer from 'multer';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Set up multer for handling multiple file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function fileToGenerativePart(data, mimeType) {
    return {
        inlineData: {
            data: data.toString('base64'),
            mimeType,
        },
    };
}

app.post('/generate-content', upload.array('images', 10), async (req, res) => { 
    try {
        const { context } = req.body;
        const prompt = `You are a powerful multimodal AI designed to generate detailed testing instructions based on screenshots and context provided. Your task is to analyze the provided screenshots and optional text context to generate a comprehensive guide for testing each functionality.

**Instructions:**

1. **Analyze Screenshots and Context:**
   - Review the provided screenshots and any additional context to understand the features and functionalities being depicted.

2. **Generate Test Cases:**
   - For each distinct functionality or feature visible in the screenshots, create a test case with the following sections:

     1. **Description:** Provide a brief description of what the test case is about. Explain the functionality or feature being tested.
     
     2. **Pre-conditions:** List any conditions or setup required before executing the test case. This could include user roles, data setup, or application state.
     
     3. **Testing Steps:** Outline the steps to perform the test. Include detailed, clear, and sequential instructions that guide the tester through the process.
     
     4. **Expected Result:** Describe what should happen if the functionality works correctly. Include any expected outcomes, such as messages, changes in the interface, or data updates.

**Example Format:**

1. **Description:** Verify that the login button is functional on the login page.
   
2. **Pre-conditions:** Ensure that the application is running and accessible, and that the user is on the login page.

3. **Testing Steps:**
   - Open the login page.
   - Enter valid username and password.
   - Click the login button.

4. **Expected Result:** The user should be redirected to the dashboard, and the dashboard should display the user's name and other relevant information.

**Context:** ${context}

Use the provided screenshots and context to generate detailed and accurate testing instructions following the format above.
`;

        const imageFiles = req.files;

        if (!prompt || !imageFiles || imageFiles.length === 0) {
            return res.status(400).json({ error: 'Missing prompt or image files in the request body' });
        }

        console.log('Received request with prompt:', prompt);
        console.log('Received image files:', imageFiles.map(file => file.originalname));

        const template = prompt;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Convert each uploaded image file to the format expected by the LLM
        const images = imageFiles.map(file => fileToGenerativePart(file.buffer, file.mimetype));

        const result = await model.generateContent([template, ...images]);
        const response = await result.response;
        const text = response.text();

        console.log('Generated text:', text);

        res.json({ result: text });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
