import express, { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import dotenv from 'dotenv';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';
import db from './Database';


interface RequestWithUser extends Request<ParamsDictionary, unknown, unknown, unknown> {
  user?: unknown; // or use a more specific type if you know what the user object looks like
}



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV)

const checkJwt = auth({
  audience: process.env.AUTH0_CLIENT_ID ,//'{yourApiIdentifier}',
  issuerBaseURL: process.env.AUTH0_DOMAIN//`https://dev-sajzjwfw.us.auth0.com/`,
});

if (process.env.NODE_ENV === 'development') {
    console.log('using cors')
    app.use(cors({ origin: 'http://localhost:5173' }));
    app.options('/api/redirects', cors({ origin: 'http://localhost:5173' }));
    }

app.use(express.json())

app.post('/api/redirects', cors({ origin: 'http://localhost:5173' }), async (req: Request, res: Response) => {
  console.log("req: ", req.body)

  try {
    const {path, url} = req.body ;
    const newRedirect = await db.createRedirect(path, url);
    
    console.log('New Redirect: ', newRedirect);
    res.json(newRedirect); 
  } catch (error ){
    console.log('Error:', error);
    res.status(500).json({ error: 'An error occurred while creating a redirect' });
  }
})

app.get('/api/redirects', async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    try {
      const recentRedirects = await db.getRecentRedirects(limit);
      //console.log(recentRedirects)
      res.json(recentRedirects);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching redirects' });
    }
  });

  app.get('/api/redirects/:path', async (req: Request, res: Response) => {
    const { path } = req.params;
    try {
        const redirect = await db.getRedirectByPath(path);
        if (redirect) {
            res.json(redirect);
        } else {
            res.status(404).json({ error: 'No redirect found for this path' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching the redirect' });
    }
});

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

app.get('/api/user/account', checkJwt,  async ( req: RequestWithUser, res: Response) => {
  //const loggedInUserId = req.user.sub; // Get the logged-in user's ID from the req.user object
  console.log("in authed endpoing")
  res.json(req.user);
  const user_id = 99;
  /*
  if (user_id !== loggedInUserId) {
    return res.status(403).json({ error: 'Forbidden' }); // Return 403 if the user_id doesn't match the logged-in user's ID
  }
  */
  try {
    const user = await db.getFullUserById(String(user_id)); // Convert user_id to a string
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



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});