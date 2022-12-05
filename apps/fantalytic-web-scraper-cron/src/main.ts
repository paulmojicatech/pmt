/* eslint-disable @typescript-eslint/no-var-requires */

import * as express from 'express';
import * as path from 'path';
import * as cron from 'node-cron';
import * as bodyParser from 'body-parser';
import {deleteAllQBsForYear, getQBStats, postUpdatedQBs} from './app/services/qb.service';
import { deleteAllRBsForYear, getRBStats, postUpdatedRBs } from './app/services/rb.service';
import { deleteAllRecsForYear, getRecStats, postUpdatedRecs } from './app/services/recs.service';
import { deleteAllDefsForYear, getDefStats, postUpdatedDefs } from './app/services/def.service';

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

cron.schedule("0 0 0 * * *", async  () => {
  console.log('REC STATS CRON');
  const recs = await getRecStats(2022);
  await deleteAllRecsForYear(2022);
  await postUpdatedRecs(recs);
});

cron.schedule('0 0 0 * * *', async () => {
  console.log('DEF STATS CRON');
  const defs = await getDefStats(2022);
  await deleteAllDefsForYear(2022);
  await postUpdatedDefs(defs);
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/scrape/qbs', bodyParser.json());
app.use('/scrape/rbs', bodyParser.json());
app.use('/scrape/recs', bodyParser.json());
app.use('/scrape/defenses', bodyParser.json());

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
      res.send({message: 'Success'});
    } catch (err) {
      res.status(400).send(`Error: ${err}`);
    }
    
  });

app.route('/scrape/recs')
  .post(async (req, res) => {
    try {
      const year = +req.body.year;
      const recs = await getRecStats(year);
      await deleteAllRecsForYear(year);
      await postUpdatedRecs(recs);
      res.send({message: 'Success'});
    } catch (err) {
      res.status(400).send(`Error: ${err}`);
    }
  });

app.route('/scrape/defenses')
  .post(async (req, res) => {
    try {
      const year = +req.body.year;
      const defs = await getDefStats(year);
      await deleteAllDefsForYear(year);
      await postUpdatedDefs(defs);
      res.send({message: 'Success'});
    } catch (err) {
      res.status(400).send(`Error: ${err}`);
    }
  });


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/scrape`);
});
server.on('error', console.error);
