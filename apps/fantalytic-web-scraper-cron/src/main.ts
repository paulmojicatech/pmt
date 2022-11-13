/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';
import * as cron from 'node-cron';
import {deleteAllQBsForYear, getQBStats, postUpdatedQBs} from './app/services/qb.service';

const axios = require('axios');

const app = express();

cron.schedule("1 * * * * *", async () => {
  console.log('QB STATS CRON');
  const qbs = await getQBStats(2022);
  await deleteAllQBsForYear(2022);
  await postUpdatedQBs(qbs);
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to fantalytic-web-scraper-cron!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
