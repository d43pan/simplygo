import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './Database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
    console.log('using cors')
    app.use(cors());
  }


app.get('/api/redirects', async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    try {
      const recentRedirects = await db.getRecentRedirects(limit);
      console.log(recentRedirects)
      res.json(recentRedirects);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching redirects' });
    }
  });

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});