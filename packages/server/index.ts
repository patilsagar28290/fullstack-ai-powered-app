import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

const env_var = dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req: Request, res: Response) => {
   res.send(
      env_var.parsed?.OPENAI_API_KEY ? `API Key is set` : 'API Key is not set',
   );
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
