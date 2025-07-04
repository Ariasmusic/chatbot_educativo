const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un experto sobre la Ruta Libertadora de 1819 en Colombia. Responde de forma clara y educativa.' },
        { role: 'user', content: message }
      ]
    });

    res.json({ reply: completion.data.choices[0].message.content });

  } catch (error) {
    console.error('Error con OpenAI:', error.message);
    res.status(500).json({ error: 'Error al generar respuesta' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
