import db from '../Database';

export async function createRedirect(path: string, url: string) {
    return db.createRedirect(path, url);
}

export async function getRecentRedirects(limit: number) {
    return db.getRecentRedirects(limit);
}

export async function getRedirectByPath(path: string) {
    return db.getRedirectByPath(path);
}