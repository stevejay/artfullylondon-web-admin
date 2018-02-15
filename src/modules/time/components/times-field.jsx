import React from 'react'
import PropTypes from 'prop-types'

import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import Grid from '_src/components/grid'
import * as arrayLib from '_src/lib/array'

class TimesField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.timesRangesOptions !== this.props.timesRangesOptions
    )
  }
  handleMounted = /* istanbul ignore next */ ref => {
    this._form = ref
  }
  handleSubmit = values => {
    const { onSubmit, parentFormName } = this.props
    onSubmit(values, parentFormName)
  }
  handleDelete = key => {
    const { input: { value, onChange } } = this.props
    const newValue = arrayLib.removeElementByKey(value, key)
    onChange(newValue)
  }
  render () {
    const {
      label,
      input: { value },
      meta: { touched, error },
      containerStyle,
      constraint,
      minDate,
      maxDate,
      audienceTags,
      timesRangesOptions
    } = this.props

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
        style={containerStyle}
      >
        <FieldBorder>
          <this.props.formComponent
            ref={this.handleMounted}
            onSubmit={this.handleSubmit}
            constraint={constraint}
            audienceTags={audienceTags}
            minDate={minDate}
            maxDate={maxDate}
            timesRangesOptions={timesRangesOptions}
          />
          <FieldDivider />
          <Grid>
            {value.map(element => (
              <this.props.itemComponent
                key={element.key}
                value={element}
                onDelete={this.handleDelete}
              />
            ))}
          </Grid>
        </FieldBorder>
      </FieldContainer>
    )
  }
}

TimesField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
  containerStyle: PropTypes.object,
  formComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  parentFormName: PropTypes.string.isRequired,
  timesRangesOptions: PropTypes.array,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  audienceTags: PropTypes.array,
  onSubmit: PropTypes.func.isRequired
}

export default TimesField
