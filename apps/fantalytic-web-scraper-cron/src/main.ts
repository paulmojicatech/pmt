/* eslint-disable @typescript-eslint/no-var-requires */

import * as express from 'express';
import * as path from 'path';
import * as cron from 'node-cron';
import * as bodyParser from 'body-parser';
import {deleteAllQBsForYear, getQBStats, postUpdatedQBs} from './app/services/qb.service';
import { deleteAllRBsForYear, getRBStats, postUpdatedRBs } from './app/services/rb.service';

const app = express();

cron.schedule("0 0 0 * * *", async () => {
  console.log('QB STATS CRON');
  const qbs = await getQBStats(2022);
  await deleteAllQBsForYear(2022);
  await postUpdatedQBs(qbs);
});

cron.schedule("0 0 0 * * *", async () => {
  console.log('RB STATS CRON');
  const rbs = await getRBStats(2022);
  await deleteAllRBsForYear(2022);
  await postUpdatedRBs(rbs);
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/scrape/qbs', bodyParser.json());
app.use('/scrape/rbs', bodyParser.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to fantalytic-web-scraper-cron!' });
});

app.route('/scrape/qbs')
  .post(async (req, res) => {
    try {
      const year = +req.body.year;
      const qbs = await getQBStats(year);
      await deleteAllQBsForYear(year);
      await postUpdatedQBs(qbs);
      res.send({message: 'Success'});
    } catch (err) {
      res.status(400).send(`Error: ${err}`);
    }
    
  });

app.route('/scrape/rbs')
  .post(async (req, res) => {
    try {
      const year = +req.body.year;
      const rbs = await getRBStats(year);
      await deleteAllRBsForYear(year);
      await postUpdatedRBs(rbs);
      res.send({message: 'Succcess'});
    } catch (err) {
      res.status(400).send(`Error: ${err}`);
    }
    
  });


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/scrape`);
});
server.on('error', console.error);
