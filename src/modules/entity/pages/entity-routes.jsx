import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import EntityPage from './entity'

const EntityRoutes = ({
  entityType,
  editOrCreateComponent,
  detailComponent
}) => (
  <Switch>
    <Route
      path={`/${entityType}`}
      exact
      render={() => (
        <EntityPage entityType={entityType} component={editOrCreateComponent} />
      )}
    />
    <Route
      path={`/${entityType}/edit/(.*)`}
      exact
      render={() => (
        <EntityPage entityType={entityType} component={editOrCreateComponent} />
      )}
    />
    <Route
      path={`/${entityType}/(.*)`}
      exact
      render={() => (
        <EntityPage entityType={entityType} component={detailComponent} />
      )}
    />
  </Switch>
)

EntityRoutes.propTypes = {
  entityType: PropTypes.string.isRequired,
  editOrCreateComponent: PropTypes.func.isRequired,
  detailComponent: PropTypes.func.isRequired
}

export default EntityRoutes
