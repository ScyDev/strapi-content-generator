/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ErrorBoundary} from 'strapi-helper-plugin';
// Utils
import pluginId from '../../pluginId';
// Containers
import GeneratePage from '../GeneratePage';
import UtilPage from '../UtilPage';

const App = () => {
  return (
    <div>
      <ErrorBoundary>
        <Switch>
          <Route path={`/plugins/${pluginId}/generate`} component={GeneratePage}
                 exact/>
          <Route path={`/plugins/${pluginId}/utilities`} component={UtilPage}
                 exact/>
          <Redirect to={`/plugins/${pluginId}/generate`}/>
        </Switch>
      </ErrorBoundary>
    </div>
  );
};

export default App;
