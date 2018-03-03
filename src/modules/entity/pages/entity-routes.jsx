import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import EntityPage from './entity'

// TODO find a better solution than the viewing flag:

const EntityRoutes = ({
  entityType,
  editOrCreateComponent,
  detailComponent
}) => (
  <Switch>
    <Route
      path={`/${entityType}`}
      exact
      render={/* istanbul ignore next */
        () => (
          <EntityPage
            entityType={entityType}
            viewing={false}
            component={editOrCreateComponent}
          />
        )}
    />
    <Route
      path={`/${entityType}/edit/(.*)`}
      exact
      render={/* istanbul ignore next */ () => (
        <EntityPage
          entityType={entityType}
          viewing={false}
          component={editOrCreateComponent}
        />
      )}
    />
    <Route
      path={`/${entityType}/(.*)`}
      exact
      render={/* istanbul ignore next */ () => (
        <EntityPage
          entityType={entityType}
          viewing
          component={detailComponent}
        />
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
