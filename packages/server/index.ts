import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Content } from '@google/generative-ai';
import { randomUUID } from 'crypto';

const env_var = dotenv.config(); // Load environment variables
const genAI = new GoogleGenerativeAI(
   env_var.parsed?.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
); // Initialize Google Generative AI with API key

const app = express();

// Store conversation histories keyed by conversationId
const conversationHistories = new Map<string, Content[]>();

app.use(express.json());

const port = process.env.PORT || 3000;
app.get('/', (req: Request, res: Response) => {
   res.send(
      env_var.parsed?.GEMINI_API_KEY || process.env.GEMINI_API_KEY
         ? `API Key is set`
         : 'API Key is not set',
   );
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const { prompt, conversationId } = req.body;

   // Use existing conversation or start a new one
   const id: string = conversationId || randomUUID();
   const history: Content[] = conversationHistories.get(id) ?? [];

   try {
      const model = genAI.getGenerativeModel({
         model: 'gemini-2.5-flash',
         generationConfig: {
            temperature: 0.2,
         maxOutputTokens: 700,
         },
      });

      // Start a chat session with the stored history
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(prompt);
      const reply = result.response.text();

      // Append the new turn to history and save it
      history.push({ role: 'user', parts: [{ text: prompt }] });
      history.push({ role: 'model', parts: [{ text: reply }] });
      conversationHistories.set(id, history);

      res.json({ message: reply, conversationId: id });
   } catch (error) {
      console.error('Error generating content with Gemini:', error);
      res.status(500).json({ error: 'Failed to generate content' });
   }
});
