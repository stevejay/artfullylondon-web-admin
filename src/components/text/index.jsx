import React from 'react'
import PropTypes from 'prop-types'
import Icon from './icon'
import './index.m.scss'

class Text extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.error !== this.props.error ||
      nextProps.touched !== this.props.touched ||
      nextProps.disabled !== this.props.disabled
    )
  }
  render () {
    const {
      value,
      error,
      touched,
      disabled,
      maxLength,
      password,
      autos,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      forceSingleLine,
      icon,
      autoFocus,
      id,
      onClick,
      readOnly,
      ...rest
    } = this.props

    const hasError = !!touched && !!error
    const rows = Math.ceil(maxLength / 100)
    const type = password ? 'password' : 'text'
    const autoCapitalize = autos ? 'sentences' : 'none'
    const autoCorrect = autos ? 'on' : 'off'
    const autoComplete = autos ? 'on' : 'off'
    const spellCheck = autos
    const isSingleLine = rows === 1 || type === 'password' || forceSingleLine

    let styleName = isSingleLine ? 'input' : 'textarea'
    styleName = hasError && !disabled ? styleName + '-error' : styleName

    return isSingleLine
      ? <div styleName='container'>
        <Icon icon={icon} />
        <input
          {...rest}
          ref={ref => ref && autoFocus && ref.focus()}
          styleName={styleName}
          id={id}
          type={type}
          maxLength={maxLength}
          value={value}
          disabled={!!disabled}
          readOnly={!!readOnly}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
        />
      </div>
      : <textarea
        {...rest}
        ref={ref => ref && autoFocus && ref.focus()}
        styleName={styleName}
        id={id}
        maxLength={maxLength}
        rows={rows}
        value={value}
        disabled={!!disabled}
        readOnly={!!readOnly}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
      />
  }
}

Text.propTypes = {
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.any,
  touched: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  password: PropTypes.bool,
  autos: PropTypes.bool,
  forceSingleLine: PropTypes.bool,
  icon: PropTypes.func
}

Text.defaultProps = {
  placeholder: '',
  password: false,
  autos: true,
  disabled: false,
  readOnly: false
}

export default Text
