import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import FormButtons from '_src/components/form/buttons'
import Form from '_src/components/form'
import Divider from '_src/components/divider'
import { TALENT_MATCHES_FOUND_FORM_NAME } from '_src/constants/form'
import { formatTalentName } from '_src/lib/talent'
import './index.m.scss'

export const TalentMatchesFoundForm = ({ handleSubmit, onCancel, talents }) => (
  <Form styleName='container' onSubmit={handleSubmit}>
    <ul>
      {talents.map(talent => (
        <li key={talent.id}>
          <span>{formatTalentName(talent)}</span>—{talent.commonRole}
        </li>
      ))}
    </ul>
    <Divider />
    <FormButtons
      onCancel={onCancel}
      submitting={false}
      submitLabel='Add Talent'
    />
  </Form>
)

TalentMatchesFoundForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  talents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstNames: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      commonRole: PropTypes.string.isRequired
    })
  ).isRequired
}

export default connect(() => ({
  initialValues: {}
}))(
  reduxForm({
    form: TALENT_MATCHES_FOUND_FORM_NAME
  })(TalentMatchesFoundForm)
)
