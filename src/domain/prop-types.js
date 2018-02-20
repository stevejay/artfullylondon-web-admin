import PropTypes from 'prop-types'
import _ from 'lodash'

import entityType from '_src/domain/types/entity-type'

export const ENTITY_TYPE = PropTypes.oneOf(_.values(entityType))
