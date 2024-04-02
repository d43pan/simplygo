import { Router, Request, Response } from 'express';
import * as usersService from './users.service';
import {
    validateAccessToken,
  } from "../middleware/auth0.middleware";
export const usersRouter = Router();

usersRouter.get("/account", validateAccessToken, 
    async( req, res ) => {
        try {
            const {user_id} = req.params;
            const user = await usersService.getFullUserById(user_id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: `No user with id ${user_id}` });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while fetching the user' });
        }
    }

  );


usersRouter.get('/:user_id', async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const user = await usersService.getUserById(user_id);
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


usersRouter.post('/createOrUpdate', validateAccessToken, async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const accessToken = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
        if (!accessToken) {
            return res.status(401).json({ error: 'No access token provided' });
        }
        console.log( 'userRouter: ', user)
        const updatedUser = await usersService.createOrUpdateUser(user);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating or updating the user' });
    }
});