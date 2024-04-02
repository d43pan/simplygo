import { Router, Request, Response } from 'express';
import * as redirectsService from './redirects.service';

export const redirectsRouter = Router();

redirectsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { path, url } = req.body;
        const newRedirect = await redirectsService.createRedirect(path, url);
        res.json(newRedirect);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating a redirect' });
    }
});

redirectsRouter.get('/', async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    try {
        const recentRedirects = await redirectsService.getRecentRedirects(limit);
        res.json(recentRedirects);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching redirects' });
    }
});

redirectsRouter.get('/:path', async (req: Request, res: Response) => {
    const { path } = req.params;
    try {
        const redirect = await redirectsService.getRedirectByPath(path);
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
