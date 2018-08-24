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
    this.elementField = undefined;
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
  componentDidUpdate({ valid }) {
    const { valid: previousIsValid } = this.props;
    if (valid !== previousIsValid) {
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
      fullWidth,
      iconAlignEnd,
    } = this.props;
    return classnames({
      'mdc-text-field': true,
      'mdc-text-field--box': this.isBox(),
      'mdc-text-field--disabled': disabled,
      'mdc-text-field--fullwidth': fullWidth,
      'mdc-text-field--outlined': this.isOutlined(),
      'mdc-text-field--textarea': this.isTextArea(),
      'mdc-text-field--with-leading-icon': !!icon && !iconAlignEnd,
      'mdc-text-field--with-trailing-icon': !!icon && iconAlignEnd,
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
    const { helperTextPersistent, helperTextValidationMessage } = this.props;
    return classnames({
      'mdc-text-field-helper-text': true,
      'mdc-text-field-helper-text--persistent': helperTextPersistent,
      'mdc-text-field-helper-text--validation-msg': helperTextValidationMessage,
      'mdc-typography': true,
    });
  }
  getId() {
    return this.props.id || this.state.id;
  }
  focus() {
    this.elementField.focus();
  }
  hasFloatingLabel() {
    const { fullWidth } = this.props;
    return !fullWidth || this.isTextArea();
  }
  hasIcon() {
    const { icon, box, outlined } = this.props;
    return !!icon && (box || outlined);
  }
  iconAddOnClick() {
    if (this.hasIcon()) {
      this.elementIcon.addEventListener('MDCTextField:icon', this.props.onIconClick || empty);
    }
  }
  isBox() {
    const { isOutlined, props: { box, fullWidth } } = this;
    return box && !fullWidth && !isOutlined();
  }
  isOutlined() {
    const { fullWidth, outlined } = this.props;
    return outlined && !fullWidth;
  }
  isTextArea() {
    return this.props.type === 'textarea';
  }
  textFieldSetValid() {
    const { valid } = this.props;
    if (valid !== undefined) {
      this.textField.valid = valid;
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
      isOutlined,
      isTextArea,
      props: {
        box,
        className,
        defaultValue,
        disabled,
        fullWidth,
        helperText,
        helperTextPersistent,
        helperTextValidationMessage,
        icon,
        iconAlignEnd,
        id,
        label,
        lengthMaximum,
        lengthMinimum,
        name,
        onBlur,
        onChange,
        onDragStart,
        onDrop,
        onFocus,
        onIconClick,
        onKeyUp,
        outlined,
        required,
        type,
        valid,
        value,
        ...props
      },
      state: { helperTextControlsId },
    } = this;
    return (
      <React.Fragment>
        <div
          className={getClassNames()}
          ref={(elementRoot) => { this.elementRoot = elementRoot; }}
          {...props}
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
            defaultValue={defaultValue}
            disabled={disabled}
            id={getId()}
            maxLength={lengthMaximum}
            minLength={lengthMinimum}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onFocus={onFocus}
            onKeyUp={onKeyUp}
            placeholder={fullWidth ? label : undefined}
            ref={(elementField) => { this.elementField = elementField; }}
            required={required}
            type={type}
            value={value}
          />}
          {isTextArea() &&
            <textarea
              aria-controls={helperTextControlsId}
              aria-label={label}
              className="mdc-text-field__input"
              defaultValue={defaultValue}
              disabled={disabled}
              id={getId()}
              maxLength={lengthMaximum}
              minLength={lengthMinimum}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onFocus={onFocus}
              onKeyUp={onKeyUp}
              ref={(elementField) => { this.elementField = elementField; }}
              required={required}
              rows={8}
              columns={40}
            >
              {value}
            </textarea>}
          {hasFloatingLabel() && (
            // eslint-disable-next-line jsx-a11y/label-has-for
            <label className={getClassNamesFloatingLabel()} htmlFor={getId()}>
              {label}
            </label>
          )}
          {!isOutlined() && <div className={TextField.getClassNamesLineRipple()} />}
          {isOutlined() &&
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
  box: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  helperTextPersistent: PropTypes.bool,
  helperTextValidationMessage: PropTypes.bool,
  icon: PropTypes.string,
  iconAlignEnd: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  lengthMaximum: PropTypes.number,
  lengthMinimum: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
  onIconClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  outlined: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string,
};

TextField.defaultProps = {
  box: false,
  className: undefined,
  defaultValue: undefined,
  disabled: false,
  fullWidth: false,
  helperText: undefined,
  helperTextPersistent: false,
  helperTextValidationMessage: false,
  icon: undefined,
  iconAlignEnd: false,
  id: undefined,
  lengthMaximum: undefined,
  lengthMinimum: undefined,
  name: undefined,
  onBlur: undefined,
  onChange: undefined,
  onDragStart: undefined,
  onDrop: undefined,
  onFocus: undefined,
  onKeyUp: undefined,
  onIconClick: undefined,
  outlined: false,
  required: false,
  type: 'text',
  valid: undefined,
  value: undefined,
};

export default TextField;
