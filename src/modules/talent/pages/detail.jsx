import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import EntityImage from '_src/components/entity/image'
import Error from '_src/components/error'
import BoxesLoader from '_src/components/loader/boxes'
import BasicSection from '_src/components/section/basic'
import EntityDescription from '_src/components/entity/description'
import DetailsContainer from '_src/components/entity/details-container'
import ExternalLinks from '_src/components/entity/external-links'
import EntityHeading from '_src/components/entity/heading'
import WeSay from '_src/components/entity/we-say'
import InfoBar from '_src/components/entity/info-bar'
import { FullTalent } from '_src/entities/talent'
import * as entityConstants from '_src/constants/entity'
// TODO change location of these:
import * as entityActionTypes from '_src/constants/entity'

class TalentDetailPage extends React.Component {
  componentWillMount () {
    this.props.dispatch({
      type: entityActionTypes.GET_ENTITY,
      payload: {
        entityType: entityConstants.ENTITY_TYPE_TALENT,
        id: this.props.talentId
      }
    })
  }
  render () {
    const { talentId, talent, getInProgress, getFailed } = this.props

    if (getFailed) {
      return <BasicSection><Error /></BasicSection>
    }

    if (getInProgress || !talent || talent.id !== talentId) {
      return <BasicSection><BoxesLoader /></BasicSection>
    }

    const { entityType, images, name, links, weSay } = talent

    return (
      <BasicSection>
        <EntityImage entityType={entityType} images={images} />
        <EntityHeading>{name}</EntityHeading>
        <DetailsContainer type='narrow'>
          <InfoBar entity={talent} />
          <EntityDescription entity={talent} />
          <WeSay>{weSay}</WeSay>
          <ExternalLinks links={links} />
        </DetailsContainer>
      </BasicSection>
    )
  }
}

TalentDetailPage.propTypes = {
  talentId: PropTypes.string.isRequired,
  talent: PropTypes.instanceOf(FullTalent),
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
}

export default connect((state, ownProps) => ({
  talentId: ownProps.match.params[0],
  talent: state.talent.entity,
  getInProgress: state.talent.getInProgress,
  getFailed: state.talent.getFailed
}))(TalentDetailPage)
