import express, { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import dotenv from 'dotenv';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';
import db from './Database';
import { messagesRouter } from "./messages/messages.router";
import { redirectsRouter } from "./redirects/redirects.router";
import { usersRouter } from "./users/users.router"
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";




dotenv.config();


const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV)

const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
console.log( "CLIENT_ORIGIN_URL:", CLIENT_ORIGIN_URL )


const app = express();
const apiRouter = express.Router();



    app.use(
      cors({
        origin: CLIENT_ORIGIN_URL,
        methods: ["GET"],
        allowedHeaders: ["Authorization", "Content-Type"],
        maxAge: 86400,
      })
    );

app.use(express.json())


app.use("/api", apiRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use("/redirects", redirectsRouter);
apiRouter.use("/users", usersRouter);


app.get('/api/users/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
      const user = await db.getUserById(user_id);
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ error: `No user with id ${user_id}` });
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
});


app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});


app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});