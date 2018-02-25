import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { withState } from 'recompose'

import Modal from '_src/shared/components/modal'
import ModalContainer from '_src/shared/components/modal/container'
import FadeTransition from '_src/shared/components/transition/fade'
import FormRow from '_src/shared/components/form/row'
import ButtonField from '_src/shared/components/button/field'
import SelectField from '_src/shared/components/select/field'
import { AddTagForm } from '_src/modules/tag'
import './tag-selector.scss'
// import * as eventActions from '../actions'

export class TagSelector extends React.Component {
  handleAddTag = () => {
    this.props.setShowing(true)
  }
  handleHide = () => {
    this.props.setShowing(false)
  }
  handleSubmit = values => {
    this.props.onAddTag(values).then(() => this.handleHide())
  }
  render () {
    const { tagType, label, name, options, required, showing } = this.props

    return (
      <FormRow>
        <Field
          label={label}
          name={name}
          component={SelectField}
          options={options}
          required={required}
          searchable={false}
          multi
          valueKey='id'
          containerStyle={{ flexBasis: 'auto' }}
        />
        <ButtonField
          label='New…'
          type='button'
          submitting={false}
          onClick={this.handleAddTag}
        />
        <Modal
          show={showing}
          transition={FadeTransition}
          onHide={this.handleHide}
          aria-label='Tag Selector'
        >
          <ModalContainer
            title='New Tag'
            type='narrow'
            onHide={this.handleHide}
          >
            <AddTagForm
              canAddTag
              initialValues={{ label: '', tagType }}
              styleName='form'
              onSubmit={this.handleSubmit}
            />
          </ModalContainer>
        </Modal>
      </FormRow>
    )
  }
}

TagSelector.propTypes = {
  tagType: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onAddTag: PropTypes.func.isRequired,
  showing: PropTypes.bool.isRequired,
  setShowing: PropTypes.func.isRequired
}

export default withState('showing', 'setShowing', false)(TagSelector)
