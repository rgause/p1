import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TenantTypeURL from './tenant-type-url';
import TenantTypeURLDetail from './tenant-type-url-detail';
import TenantTypeURLUpdate from './tenant-type-url-update';
import TenantTypeURLDeleteDialog from './tenant-type-url-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TenantTypeURLUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TenantTypeURLUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TenantTypeURLDetail} />
      <ErrorBoundaryRoute path={match.url} component={TenantTypeURL} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TenantTypeURLDeleteDialog} />
  </>
);

export default Routes;
