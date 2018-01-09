import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { submit } from 'redux-form'
import Divider from '_src/components/divider'
import { validate } from '_src/lib/validation'
import { ENTITY_TYPE_EVENT } from '_src/constants/entity'
import Loader from '_src/components/loader'
import Error from '_src/pages/error'
import EntityImage from '_src/components/entity/image'
import EntityHeading from '_src/components/entity/heading'
import SectionsContainer from '_src/components/section/sections-container'
import DetailsContainer from '_src/components/entity/details-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import StepCollection from '_src/components/step/collection'
import EditEventBasicsForm from '_src/containers/forms/edit-event/basics'
import EditEventTagsForm from '_src/containers/forms/edit-event/tags'
import EditEventImagesForm from '_src/containers/forms/edit-event/images'
import EditEventTimesForm from '_src/containers/forms/edit-event/times'
import EditEventTalentsForm from '_src/containers/forms/edit-event/talents'
import { normaliseEventValues } from '_src/lib/mappings'
import {
  BASIC_CONSTRAINT,
  tagConstraint,
  TIMES_CONSTRAINT,
  talentConstraint
} from '_src/constants/event-constraints'
import {
  EDIT_EVENT_BASICS_FORM_NAME,
  EDIT_EVENT_TAGS_FORM_NAME,
  EDIT_EVENT_TALENTS_FORM_NAME,
  EDIT_EVENT_TIMES_FORM_NAME
} from '_src/constants/form'
import { updateEntityForEdit, saveEntity } from '_src/actions/entity'

const steps = [
  { page: 1, title: 'Basics' },
  { page: 2, title: 'Tags' },
  { page: 3, title: 'Times' },
  { page: 4, title: 'Talent' },
  { page: 5, title: 'Images' }
]

class EditEvent extends React.Component {
  constructor (props) {
    super(props)
    this.state = { page: 1 }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.eventId !== this.props.eventId) {
      this.setState({ page: 1 })
    }
  }
  nextPage = () => {
    if (this.state.page < 5) {
      this.setState({ page: this.state.page + 1 })
    }
  }
  previousPage = event => {
    event.preventDefault()

    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
    }
  }
  handleStepClick = newPage => {
    const { submit } = this.props
    const { page } = this.state

    if (newPage > page) {
      switch (page) {
        case 1:
          return submit(EDIT_EVENT_BASICS_FORM_NAME)
        case 2:
          return submit(EDIT_EVENT_TAGS_FORM_NAME)
        case 3:
          return submit(EDIT_EVENT_TIMES_FORM_NAME)
        case 4:
          return submit(EDIT_EVENT_TALENTS_FORM_NAME)
      }
    } else {
      this.setState({ page: newPage })
    }
  }
  handleCancel = event => {
    event.preventDefault()
    this.props.history.goBack()
  }
  handleSubmitBasics = values => {
    return validate(values, BASIC_CONSTRAINT, (values, errors) => {
      if (!values.venue || !values.venue.id) {
        errors.venue = 'No venue selected'
      }
    }).then(values => {
      return new Promise(resolve => {
        normaliseEventValues(values)

        this.props.updateEntityForEdit({
          entityType: ENTITY_TYPE_EVENT,
          values
        })

        this.nextPage()
        resolve()
      })
    })
  }
  handleSubmitTags = values => {
    return validate(values, tagConstraint, (values, errors) => {
      if (!values.mediumTags || values.mediumTags.length === 0) {
        errors.mediumTags = "Medium Tags can't be empty"
      }
    }).then(values => {
      return new Promise(resolve => {
        this.props.updateEntityForEdit({
          entityType: ENTITY_TYPE_EVENT,
          values
        })

        this.nextPage()
        resolve()
      })
    })
  }
  handleSubmitTimes = values => {
    return validate(values, TIMES_CONSTRAINT).then(values => {
      return new Promise(resolve => {
        normaliseEventValues(values)

        this.props.updateEntityForEdit({
          entityType: ENTITY_TYPE_EVENT,
          values
        })

        this.nextPage()
        resolve()
      })
    })
  }
  handleSubmitTalent = values => {
    return validate(values, talentConstraint, (values, errors) => {
      if (values.talents.filter(x => x.roles === '').length) {
        errors.talents = 'All talent must have roles assigned'
      }
    }).then(values => {
      return new Promise(resolve => {
        this.props.updateEntityForEdit({
          entityType: ENTITY_TYPE_EVENT,
          values
        })

        this.nextPage()
        resolve()
      })
    })
  }
  handleSubmit = values => {
    this.props.saveEntity({
      entityType: ENTITY_TYPE_EVENT,
      values,
      isEdit: !!this.props.eventId
    })
  }
  render () {
    const { images, name, getInProgress, getFailed } = this.props
    const { page } = this.state

    if (getFailed) {
      return <Error statusCode={500} />
    }

    if (getInProgress) {
      return (
        <SectionsContainer>
          <Loader size='massive' />
        </SectionsContainer>
      )
    }

    return (
      <SectionsContainer>
        <BasicSection>
          <EntityImage entityType={ENTITY_TYPE_EVENT} images={images} />
          <EntityHeading>{name}</EntityHeading>
          <DetailsContainer>
            <StepCollection
              currentPage={page}
              onStepClick={this.handleStepClick}
              steps={steps}
            />
            <Divider />
            {this.renderForm()}
          </DetailsContainer>
        </BasicSection>
        <BasicSection>
          <CopyrightFooter />
        </BasicSection>
      </SectionsContainer>
    )
  }
  renderForm () {
    const { page } = this.state

    switch (page) {
      case 1:
        return (
          <EditEventBasicsForm
            onSubmit={this.handleSubmitBasics}
            onCancel={this.handleCancel}
            constraint={BASIC_CONSTRAINT}
          />
        )
      case 2:
        return (
          <EditEventTagsForm
            onSubmit={this.handleSubmitTags}
            previousPage={this.previousPage}
            onCancel={this.handleCancel}
          />
        )
      case 3:
        return (
          <EditEventTimesForm
            onSubmit={this.handleSubmitTimes}
            previousPage={this.previousPage}
            onCancel={this.handleCancel}
          />
        )
      case 4:
        return (
          <EditEventTalentsForm
            onSubmit={this.handleSubmitTalent}
            previousPage={this.previousPage}
            onCancel={this.handleCancel}
          />
        )
      case 5:
        return (
          <EditEventImagesForm
            onSubmit={this.handleSubmit}
            previousPage={this.previousPage}
            onCancel={this.handleCancel}
          />
        )
    }
  }
}

EditEvent.propTypes = {
  eventId: PropTypes.string,
  name: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  saveEntity: PropTypes.func.isRequired,
  updateEntityForEdit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    (state, ownProps) => ({
      eventId: ownProps.params.splat,
      name: ownProps.params.splat
        ? state.eventForEdit.entity.name
        : 'New Event',
      images: state.eventForEdit.entity.images,
      getInProgress: state.eventForEdit.getInProgress,
      getFailed: state.eventForEdit.getFailed
    }),
    dispatch => ({
      saveEntity: bindActionCreators(saveEntity, dispatch),
      updateEntityForEdit: bindActionCreators(updateEntityForEdit, dispatch),
      submit: bindActionCreators(submit, dispatch)
    })
  )(EditEvent)
)
