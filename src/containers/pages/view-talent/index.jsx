import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from '_src/components/loader'
import Error from '_src/pages/error'
import EntityImage from '_src/components/entity/image'
import SectionsContainer from '_src/components/section/sections-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import EntityDescription from '_src/components/entity/description'
import DetailsContainer from '_src/components/entity/details-container'
import ExternalLinks from '_src/components/entity/external-links'
import EntityHeading from '_src/components/entity/heading'
import WeSay from '_src/components/entity/we-say'
import { FullTalent } from '_src/entities/talent'
import InfoBar from '_src/components/entity/info-bar'

const ViewTalent = ({ talentId, talent, getInProgress, getFailed }) => {
  if (getFailed) {
    return <Error statusCode={500} />
  }

  if (getInProgress || !talent || talent.id !== talentId) {
    return (
      <SectionsContainer>
        <Loader size='massive' />
      </SectionsContainer>
    )
  }

  const { entityType, images, name, links, weSay } = talent

  return (
    <SectionsContainer>
      <BasicSection>
        <EntityImage entityType={entityType} images={images} />
        <EntityHeading>{name}</EntityHeading>
        <DetailsContainer type='narrow' style={{ paddingBottom: 0 }}>
          <InfoBar entity={talent} />
          <EntityDescription entity={talent} />
          <WeSay>{weSay}</WeSay>
          <ExternalLinks links={links} />
        </DetailsContainer>
      </BasicSection>
      <BasicSection>
        <CopyrightFooter />
      </BasicSection>
    </SectionsContainer>
  )
}

ViewTalent.propTypes = {
  talentId: PropTypes.string.isRequired,
  talent: PropTypes.instanceOf(FullTalent),
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired
}

export default connect((state, ownProps) => ({
  talentId: ownProps.params.splat,
  talent: state.talent.entity,
  getInProgress: state.talent.getInProgress,
  getFailed: state.talent.getFailed
}))(ViewTalent)
