const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const router = express.Router();

//ChatGPT code
const apiKey = process.env.OPENAI_API_KEY;

router.post('/chat', async(req, res) => {
    try{
        const {language, tech, topic, info} = req.body;
        const sentence =  `Create a comprehensive README for a coding project using ${language}.` +
            `The README should have a title that is descriptive of the project.`+
            `The README should begin with an engaging introduction that explains the purpose of the project and its relevance.`+
            `The subject of the project should focus on ${topic} and be ${info}.`+
            `Include detailed sections on the following:`+
            `- **Project Subject**: Describe what the project aims to achieve and the problems it solves.`+
            `- **Technology Stack**: List all technologies like ${tech} used in the project and explain why each technology was chosen.`+
            `- **Features**: Detail the key features and functionalities of the project.`+
            `- **Setup Instructions**: Provide step-by-step instructions on how to get the project running locally, including environment setup, dependencies installation, and any necessary configurations.`+
            `- **Usage**: Explain how to use the project, including examples of the commands or scripts to run`+
            `- **Contributing**: Outline how others can contribute to the project, mentioning any guidelines they need to follow.`;
        //`Only give ${language} coding project outline that is ${difficulty} difficulty using ${topic} and ${info}`;

        const response = await axios.post(
            'https://api.openai.com/v1/completions', 
            {
                model: "gpt-3.5-turbo-instruct",
                prompt: sentence,
                max_tokens: 2048,
                temperature: 1,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            } 
        );

        const answer = response.data.choices[0].text;
        //console.log(answer);
        res.status(200).json({ response: answer });
    }catch(err){
        console.error('Error:', err.response.data.error.message);
        res.status(500).send(err.response.data.error.message);
    }
});

module.exports = router;
