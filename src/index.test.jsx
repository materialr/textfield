import * as textField from '@material/textfield';
import { mount, shallow } from 'enzyme';
import React from 'react';

import TextField, { empty } from './index';

const LABEL = 'LABEL';

test('Builds the text field when the component mounts', () => {
  const MDCTextField = jest.fn();
  const iconAddOnClick = jest.fn();
  const textFieldSetValid = jest.fn();
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedIconAddOnClick = 1;
  const expectedMDCTextField = instance.elementRoot;
  const expectedTextFieldSetValid = 1;
  instance.iconAddOnClick = iconAddOnClick;
  instance.textFieldSetValid = textFieldSetValid;
  textField.MDCTextField = MDCTextField;

  instance.componentDidMount();
  const actualIconAddOnClick = iconAddOnClick.mock.calls.length;
  const actualMDCTextField = MDCTextField.mock.calls[0][0];
  const actualTextFieldSetValid = textFieldSetValid.mock.calls.length;

  expect(actualIconAddOnClick).toBe(expectedIconAddOnClick);
  expect(actualMDCTextField).toEqual(expectedMDCTextField);
  expect(actualTextFieldSetValid).toBe(expectedTextFieldSetValid);
});

test('Does not start manual validation when the component updates', () => {
  const textFieldSetValid = jest.fn();
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = 0;
  instance.textFieldSetValid = textFieldSetValid;

  instance.componentDidUpdate({});
  const actual = textFieldSetValid.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Starts manual validation when the component updates', () => {
  const textFieldSetValid = jest.fn();
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = 1;
  instance.textFieldSetValid = textFieldSetValid;

  instance.componentDidUpdate({ valid: false });
  const actual = textFieldSetValid.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Destroys the textField when the component unmounts', () => {
  const destroy = jest.fn();
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = 1;
  instance.textField = { destroy };

  instance.componentWillUnmount();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('\'getClassNames()\' returns the necessary list of classNames', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const isBox = jest.fn();
  const isOutlined = jest.fn();
  const isTextArea = jest.fn();
  const wrapper = shallow(
    <TextField
      className={CLASS_NAME}
      disabled
      icon="icon"
      fullWidth
      label={LABEL}
    />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 'mdc-text-field mdc-text-field--box mdc-text-field--disabled ' +
    'mdc-text-field--fullwidth mdc-text-field--outlined mdc-text-field--textarea ' +
    `mdc-text-field--with-leading-icon mdc-typography ${CLASS_NAME}`;
  isBox.mockReturnValue(true);
  isOutlined.mockReturnValue(true);
  isTextArea.mockReturnValue(true);
  instance.isBox = isBox;
  instance.isOutlined = isOutlined;
  instance.isTextArea = isTextArea;

  const actual = instance.getClassNames();

  expect(actual).toBe(expected);
});

test('\'getClassNames()\' returns the classNames for an end aligned icon', () => {
  const isBox = jest.fn();
  const isOutlined = jest.fn();
  const isTextArea = jest.fn();
  const wrapper = shallow(
    <TextField icon="icon" iconAlignEnd label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 'mdc-text-field mdc-text-field--with-trailing-icon mdc-typography';
  isBox.mockReturnValue(false);
  isOutlined.mockReturnValue(false);
  isTextArea.mockReturnValue(false);
  instance.isBox = isBox;
  instance.isOutlined = isOutlined;
  instance.isTextArea = isTextArea;

  const actual = instance.getClassNames();

  expect(actual).toBe(expected);
});

test('\'getClassNamesFloatingLabel()\' returns the classNames for the floating label', () => {
  const wrapper = shallow(
    <TextField label={LABEL} value="value" />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 'mdc-floating-label mdc-floating-label--float-above';

  const actual = instance.getClassNamesFloatingLabel();

  expect(actual).toBe(expected);
});

test('\'getClassNamesHelperText()\' returns the classNames for the helper text', () => {
  const wrapper = shallow(
    <TextField helperTextPersistent helperTextValidationMessage label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 'mdc-text-field-helper-text mdc-text-field-helper-text--persistent ' +
    'mdc-text-field-helper-text--validation-msg mdc-typography';

  const actual = instance.getClassNamesHelperText();

  expect(actual).toBe(expected);
});

test('\'getId()\' returns the id from props', () => {
  const ID = 'ID';
  const wrapper = shallow(<TextField id={ID} label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = ID;

  const actual = instance.getId();

  expect(actual).toBe(expected);
});

test('\'getId()\' returns the id from state as a backup', () => {
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = instance.state.id;

  const actual = instance.getId();

  expect(actual).toBe(expected);
});

test('\'hasFloatingLabel()\' returns true when label exists and not full width', () => {
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = true;

  const actual = instance.hasFloatingLabel();

  expect(actual).toBe(expected);
});

test('\'hasFloatingLabel()\' returns true when label exists and full width and is textarea', () => {
  const isTextArea = jest.fn();
  const wrapper = shallow(
    <TextField fullWidth label={LABEL} type="textarea" />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = true;
  isTextArea.mockReturnValue(true);
  instance.isTextArea = isTextArea;

  const actual = instance.hasFloatingLabel();

  expect(actual).toBe(expected);
});

test('\'hasIcon()\' returns true when icon and box', () => {
  const wrapper = shallow(
    <TextField box icon="icon" label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = true;

  const actual = instance.hasIcon();

  expect(actual).toBe(expected);
});

test('\'hasIcon()\' returns true when icon and outlined', () => {
  const wrapper = shallow(
    <TextField icon="icon" label={LABEL} outlined />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = true;

  const actual = instance.hasIcon();

  expect(actual).toBe(expected);
});

test('\'hasIcon()\' returns false when no icon', () => {
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = false;

  const actual = instance.hasIcon();

  expect(actual).toBe(expected);
});

test('\'iconAddOnClick()\' adds an onClick listener to the icon', () => {
  const ON_ICON_CLICK = () => 'ON_ICON_CLICK';
  const addEventListener = jest.fn();
  const hasIcon = jest.fn();
  const wrapper = shallow(
    <TextField icon="icon" label={LABEL} onIconClick={ON_ICON_CLICK} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedFirst = 'MDCTextField:icon';
  const expectedSecond = ON_ICON_CLICK;
  hasIcon.mockReturnValue(true);
  instance.hasIcon = hasIcon;
  instance.elementIcon = { addEventListener };

  instance.iconAddOnClick();
  const addEventListenerParameters = addEventListener.mock.calls[0];
  const actualFirst = addEventListenerParameters[0];
  const actualSecond = addEventListenerParameters[1];

  expect(actualFirst).toBe(expectedFirst);
  expect(actualSecond).toBe(expectedSecond);
});

test('\'iconAddOnClick()\' adds an onClick listener to the icon (default)', () => {
  const addEventListener = jest.fn();
  const hasIcon = jest.fn();
  const wrapper = shallow(
    <TextField icon="icon" label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedFirst = 'MDCTextField:icon';
  const expectedSecond = empty;
  hasIcon.mockReturnValue(true);
  instance.hasIcon = hasIcon;
  instance.elementIcon = { addEventListener };

  instance.iconAddOnClick();
  const addEventListenerParameters = addEventListener.mock.calls[0];
  const actualFirst = addEventListenerParameters[0];
  const actualSecond = addEventListenerParameters[1];
  actualSecond();

  expect(actualFirst).toBe(expectedFirst);
  expect(actualSecond).toBe(expectedSecond);
});

test('\'iconAddOnClick()\' does not add an onClick listener to the icon', () => {
  const ON_ICON_CLICK = () => 'ON_ICON_CLICK';
  const addEventListener = jest.fn();
  const hasIcon = jest.fn();
  const wrapper = shallow(
    <TextField icon="icon" label={LABEL} onIconClick={ON_ICON_CLICK} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 0;
  hasIcon.mockReturnValue(false);
  instance.hasIcon = hasIcon;
  instance.elementIcon = { addEventListener };

  instance.iconAddOnClick();
  const actual = addEventListener.mock.calls.length;

  expect(actual).toBe(expected);
});

test('\'isBox()\' returns true when box and not full width and not outlined', () => {
  const isOutlined = jest.fn();
  const wrapper = shallow(<TextField box label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = true;
  isOutlined.mockReturnValue(false);
  instance.isOutlined = isOutlined;

  const actual = instance.isBox();

  expect(actual).toBe(expected);
});

test('\'isBox()\' returns false when box and not full width and outlined', () => {
  const isOutlined = jest.fn();
  const wrapper = shallow(<TextField box label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = false;
  isOutlined.mockReturnValue(true);
  instance.isOutlined = isOutlined;

  const actual = instance.isBox();

  expect(actual).toBe(expected);
});

test('\'isBox()\' returns false when box and full width and not outlined', () => {
  const isOutlined = jest.fn();
  const wrapper = shallow(
    <TextField box fullWidth label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = false;
  isOutlined.mockReturnValue(false);
  instance.isOutlined = isOutlined;

  const actual = instance.isBox();

  expect(actual).toBe(expected);
});

test('\'isBox()\' returns false when not box and not full width and not outlined', () => {
  const isOutlined = jest.fn();
  const wrapper = shallow(
    <TextField label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = false;
  isOutlined.mockReturnValue(false);
  instance.isOutlined = isOutlined;

  const actual = instance.isBox();

  expect(actual).toBe(expected);
});

test('\'isOutlined()\' returns true when outlined and not full width', () => {
  const wrapper = shallow(
    <TextField outlined label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = true;

  const actual = instance.isOutlined();

  expect(actual).toBe(expected);
});

test('\'isOutlined()\' returns false when outlined and full width', () => {
  const wrapper = shallow(
    <TextField fullWidth outlined label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = false;

  const actual = instance.isOutlined();

  expect(actual).toBe(expected);
});

test('\'isOutlined()\' returns false when not outlined', () => {
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = false;

  const actual = instance.isOutlined();

  expect(actual).toBe(expected);
});

test('\'isTextArea()\' returns true when the type is \'textarea\'', () => {
  const wrapper = shallow(
    <TextField label={LABEL} type="textarea" />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = true;

  const actual = instance.isTextArea();

  expect(actual).toBe(expected);
});

test('\'isTextArea()\' returns false when the type is not \'textarea\'', () => {
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = false;

  const actual = instance.isTextArea();

  expect(actual).toBe(expected);
});

test('\'textFieldSetValid()\' sets the text field as valid when not undefined', () => {
  const wrapper = shallow(
    <TextField valid label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = true;
  instance.textField = { valid: undefined };

  instance.textFieldSetValid();
  const actual = instance.textField.valid;

  expect(actual).toBe(expected);
});

test('\'textFieldSetValid()\' sets the text field as valid when not undefined', () => {
  const wrapper = shallow(<TextField label={LABEL} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = undefined;
  instance.textField = { valid: undefined };

  instance.textFieldSetValid();
  const actual = instance.textField.valid;

  expect(actual).toBe(expected);
});

test('Reners the correct elements', () => {
  const wrapper = mount(<TextField box helperText="helperText" icon="icon" label={LABEL} />);
  const expected = true;

  const actual = wrapper.exists();

  expect(actual).toBe(expected);
});

test('Focuses the input field', () => {
  const focus = jest.fn();
  const wrapper = mount(<TextField label={LABEL} />);
  const instance = wrapper.instance();
  const { elementField } = instance;
  const expected = 1;
  elementField.focus = focus;

  instance.focus();
  const actual = focus.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Reners the correct elements', () => {
  const wrapper = mount(
    <TextField box helperText="helperText" icon="icon" label={LABEL} type="textarea" />,
  );
  const expected = true;

  const actual = wrapper.exists();

  expect(actual).toBe(expected);
});

test('Adds extra properties that are passed in', () => {
  const DATA_QA = 'DATA_QA';
  const wrapper = shallow(
    <TextField data-qa={DATA_QA} label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const expected = DATA_QA;

  const actual = wrapper.find('div').at(0).props()['data-qa'];

  expect(actual).toBe(expected);
});
