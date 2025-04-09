import * as functions from 'firebase-functions';
import next from 'next';
import { Request, Response } from 'express';

const dev = process.env.NODE_ENV !== 'production';  // To enable dev mode in local environment
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  exports.nextjs = functions.https.onRequest((req: Request, res: Response) => {
    return handle(req, res);  // Handle all requests with Next.js
  });
});