import { MDCTextField } from '@material/textfield';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import uuidv1 from 'uuid/v1';

import '@material/textfield/mdc-text-field.scss';

export const empty = () => {};

class TextField extends React.Component {
  static getClassNamesLineRipple() {
    return classnames({ 'mdc-line-ripple': true });
  }
  static getClassNamesNotchedOutline() {
    return classnames({ 'mdc-notched-outline': true });
  }
  constructor(props) {
    super(props);
    this.state = { helperTextControlsId: uuidv1(), id: uuidv1() };
    this.elementIcon = undefined;
    this.elementRoot = undefined;
    this.textField = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesFloatingLabel = this.getClassNamesFloatingLabel.bind(this);
    this.getClassNamesHelperText = this.getClassNamesHelperText.bind(this);
    this.getId = this.getId.bind(this);
    this.hasFloatingLabel = this.hasFloatingLabel.bind(this);
    this.hasIcon = this.hasIcon.bind(this);
    this.iconAddOnClick = this.iconAddOnClick.bind(this);
    this.isBox = this.isBox.bind(this);
    this.isOutlined = this.isOutlined.bind(this);
    this.isTextArea = this.isTextArea.bind(this);
    this.textFieldSetValid = this.textFieldSetValid.bind(this);
  }
  componentDidMount() {
    this.textField = new MDCTextField(this.elementRoot);
    this.textFieldSetValid();
    this.iconAddOnClick();
  }
  componentDidUpdate({ isValid }) {
    const { isValid: previousIsValid } = this.props;
    if (isValid !== previousIsValid) {
      this.textFieldSetValid();
    }
  }
  componentWillUnmount() {
    this.textField.destroy();
  }
  getClassNames() {
    const {
      className,
      disabled,
      icon,
      isFullWidth,
      isIconAlignedEnd,
    } = this.props;
    return classnames({
      'mdc-text-field': true,
      'mdc-text-field--box': this.isBox(),
      'mdc-text-field--disabled': disabled,
      'mdc-text-field--fullwidth': isFullWidth,
      'mdc-text-field--outlined': this.isOutlined(),
      'mdc-text-field--textarea': this.isTextArea(),
      'mdc-text-field--with-leading-icon': !!icon && !isIconAlignedEnd,
      'mdc-text-field--with-trailing-icon': !!icon && isIconAlignedEnd,
      'mdc-typography': true,
      [className]: !!className,
    });
  }
  getClassNamesFloatingLabel() {
    return classnames({
      'mdc-floating-label': true,
      'mdc-floating-label--float-above': !!this.props.value,
    });
  }
  getClassNamesHelperText() {
    const { isHelperTextPersistent, isHelperTextValidationMessage } = this.props;
    return classnames({
      'mdc-text-field-helper-text': true,
      'mdc-text-field-helper-text--persistent': isHelperTextPersistent,
      'mdc-text-field-helper-text--validation-msg': isHelperTextValidationMessage,
      'mdc-typography': true,
    });
  }
  getId() {
    return this.props.id || this.state.id;
  }
  hasFloatingLabel() {
    const { isFullWidth } = this.props;
    return !isFullWidth || this.isTextArea();
  }
  hasIcon() {
    const { icon, isBox, isOutlined } = this.props;
    return !!icon && (isBox || isOutlined);
  }
  iconAddOnClick() {
    if (this.hasIcon()) {
      this.elementIcon.addEventListener('MDCTextField:icon', this.props.onIconClick || empty);
    }
  }
  isBox() {
    const { isOutlined, props: { isBox, isFullWidth } } = this;
    return isBox && !isFullWidth && !isOutlined();
  }
  isOutlined() {
    const { isFullWidth, isOutlined } = this.props;
    return isOutlined && !isFullWidth;
  }
  isTextArea() {
    return this.props.type === 'textarea';
  }
  textFieldSetValid() {
    const { isValid } = this.props;
    if (isValid !== undefined) {
      this.textField.valid = isValid;
    }
  }
  render() {
    const {
      getClassNames,
      getClassNamesFloatingLabel,
      getClassNamesHelperText,
      getId,
      hasFloatingLabel,
      hasIcon,
      isTextArea,
      props: {
        disabled,
        helperText,
        icon,
        isFullWidth,
        isOutlined,
        label,
        lengthMaximum,
        lengthMinimum,
        onBlur,
        onChange,
        onDragStart,
        onDrop,
        onFocus,
        required,
        type,
        value,
      },
      state: { helperTextControlsId },
    } = this;
    return (
      <React.Fragment>
        <div
          className={getClassNames()}
          ref={(elementRoot) => { this.elementRoot = elementRoot; }}
        >
          {hasIcon() &&
            <i
              className="material-icons mdc-text-field__icon"
              ref={(elementIcon) => { this.elementIcon = elementIcon; }}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex="0"
            >
              {icon}
            </i>}
          {!isTextArea() && <input
            aria-controls={helperTextControlsId}
            aria-label={label}
            className="mdc-text-field__input"
            disabled={disabled}
            id={getId()}
            maxLength={lengthMaximum}
            minLength={lengthMinimum}
            onBlur={onBlur}
            onChange={onChange}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onFocus={onFocus}
            placeholder={isFullWidth ? label : undefined}
            required={required}
            type={type}
            value={value}
          />}
          {isTextArea() &&
            <textarea
              aria-controls={helperTextControlsId}
              aria-label={label}
              className="mdc-text-field__input"
              disabled={disabled}
              id={getId()}
              maxLength={lengthMaximum}
              minLength={lengthMinimum}
              onBlur={onBlur}
              onChange={onChange}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onFocus={onFocus}
              required={required}
              rows={8}
              columns={40}
            >
              {value}
            </textarea>}
          {hasFloatingLabel() &&
            <label className={getClassNamesFloatingLabel()} htmlFor={getId()}>
              {label}
            </label>
          }
          {!isOutlined && <div className={TextField.getClassNamesLineRipple()} />}
          {isOutlined &&
            <React.Fragment>
              <div className={TextField.getClassNamesNotchedOutline()}>
                <svg><path className="mdc-notched-outline__path" /></svg>
              </div>
              <div className="mdc-notched-outline__idle" />
            </React.Fragment>
          }
        </div>
        {helperText &&
          <p aria-hidden className={getClassNamesHelperText()} id={helperTextControlsId}>
            {helperText}
          </p>
        }
      </React.Fragment>
    );
  }
}

TextField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string,
  isBox: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  isHelperTextPersistent: PropTypes.bool,
  isHelperTextValidationMessage: PropTypes.bool,
  isIconAlignedEnd: PropTypes.bool,
  isOutlined: PropTypes.bool,
  isValid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  lengthMaximum: PropTypes.number,
  lengthMinimum: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
  onIconClick: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

TextField.defaultProps = {
  className: undefined,
  disabled: false,
  helperText: undefined,
  icon: undefined,
  id: undefined,
  isBox: false,
  isFullWidth: false,
  isHelperTextPersistent: false,
  isHelperTextValidationMessage: false,
  isIconAlignedEnd: false,
  isOutlined: false,
  isValid: undefined,
  lengthMaximum: undefined,
  lengthMinimum: undefined,
  onBlur: undefined,
  onChange: undefined,
  onDragStart: undefined,
  onDrop: undefined,
  onFocus: undefined,
  onIconClick: undefined,
  required: false,
  type: 'text',
  value: undefined,
};

export default TextField;
