
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());  // To parse incoming JSON requests

app.post('/api/getGPTResponse', async (req, res) => {
  const userMessage = req.body.message;
  const apiKey = 'sk-xxxxxxxxxxxxxxxxxx';  // Replace with your OpenAI API key

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',  // Using GPT-4
      prompt: userMessage,
      max_tokens: 150
    })
  });

  const data = await response.json();
  const reply = data.choices[0].text.trim();

  res.json({ reply });  // Return the GPT response to the frontend
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
