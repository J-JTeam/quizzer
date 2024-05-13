const fs = require('fs');
const axios = require('axios');

// Function to fetch questions from the API
async function fetchQuestions() {
    const questions = [];
    const seenIds = new Set(); // To store IDs of fetched questions

    // Fetch questions 50 times
    for (let i = 0; i < 100; i++) {
        try {
            const response = await axios.get('https://the-trivia-api.com/v2/questions');
            const data = response.data;

            // Log progress
            console.log(`Fetched batch ${i + 1}/100`);

            // Iterate through each question in the response
            for (const question of data) {
                // Check if the question ID is not already seen
                if (!seenIds.has(question.id)) {
                    questions.push(question);
                    seenIds.add(question.id);
                }
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    return questions;
}

// Function to save questions as JSON
async function saveQuestionsAsJson() {
    try {
        console.log('Fetching questions...');
        const questions = await fetchQuestions();
        fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
        console.log('Questions saved to questions.json');
    } catch (error) {
        console.error('Error saving questions:', error);
    }
}

// Example usage
saveQuestionsAsJson();
