import React from 'react';
import routes from './routes';
import ScrollToTop from 'react-scroll';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8"/>

        <meta name="application-name" content={'AXDRAFT'}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="title" content="@@title@@"/>
      </Helmet>
      <div id="inner-root">
        <ScrollToTop>
          <Switch>
            {routes.map(route =>
              <Route
                key={route.path}
                isPrivate={route.isPrivate}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />)}
          </Switch>
        </ScrollToTop>
      </div>
    </React.Fragment>
  );
}
