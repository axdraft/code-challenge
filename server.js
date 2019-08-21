import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import path from 'path';
import fs from 'fs';
import express from 'express';
import App from './App';
import { Helmet } from 'react-helmet';
import { StaticRouter, matchPath } from 'react-router-dom';

const app = express();

app.get('*', axdssr);

/**
 * Function which executes SSR on AWS
 * @param req
 * @param res
 */
function ssr(req, res) {
  let promise;
  const currentRoute = routes.find(route => matchPath(req.url, route)) || {};

  if (currentRoute.fetchData)
    promise = currentRoute.fetchData('us');
  else
    promise = Promise.resolve(null);

  promise.then(data => {
    const context = { fetchedData: data, requestCountry: country, isFirstRun: true };
    const indexFile = path.join(__dirname, 'index.html');
    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    );
    const helmet = Helmet.renderStatic();

    fs.readFile(indexFile, 'utf8', (err, data) => {
      const oldBody = '<div id="root"></div>';
      const newBody = `<div id="root">${app}</div><script>window.ssrContext = ${serialize(context)}</script>`;

      return res.send(
        data
          .replace(oldBody, newBody)
          .replace(/@@title@@/, helmet.title.toString())
      );
    });
  });
}
