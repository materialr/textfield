# MaterialR TextField

**@materialr/textfield**

[![Build Status](https://travis-ci.org/materialr/textfield.svg?branch=master)](https://travis-ci.org/materialr/textfield)
[![Coverage Status](https://coveralls.io/repos/github/materialr/textfield/badge.svg?branch=master)](https://coveralls.io/github/materialr/textfield?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/781e1159-7da9-4317-87ca-bffa2b49d70b/badge)](https://nodesecurity.io/orgs/materialr/projects/781e1159-7da9-4317-87ca-bffa2b49d70b)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Material textfield implementation for React

## Installation

```sh
$ npm install --save @materialr/textfield
```

## Demo

A full demo is available on the
[MaterialR website](https://materialr.github.io/components/textfield) showcasing all variants.

## Components

### Default export

```js
import TextField from '@materialr/textfield';
```

**Props**

| Prop                          | Type            | Required | Default    | Description                                                    |
| ----------------------------- | --------------- | -------- | ---------- | -------------------------------------------------------------- |
| `box`                         | bool            | No       | false      | Whether to render a box outline                                |
| `className`                   | string          | No       | undefined  | Additional classNames to add                                   |
| `disabled`                    | bool            | No       | false      | Whether the input is disabled                                  |
| `fullWidth`                   | bool            | No       | false      | Whether the input is the full width of it's parent             |
| `helperText`                  | string          | No       | undefined  | The helper text to render beneath the field                    |
| `helperTextPersistent`        | bool            | No       | false      | Whether the helper text is always visible                      |
| `helperTextValidationMessage` | bool            | No       | false      | Whether the helper text is for a validation message            |
| `icon`                        | string          | No       | undefined  | The material icon to render to the start of the field          |
| `iconAlignEnd`                | bool            | No       | false      | Whether the icon is aligned to the end of the field            |
| `id`                          | string          | No       | `uuidv1()` | The id attribute of the field                                  |
| `label`                       | string          | Yes      | N/A        | The field's label                                              |
| `lengthMaximum`               | number          | No       | undefined  | The maximum length of the field (HTML5 validation)             |
| `lengthMinimum`               | number          | No       | undefined  | The minimum length of the field (HTML5 validation)             |
| `onBlur`                      | func            | No       | undefined  | The `blur` event handler                                       |
| `onChange`                    | func            | No       | undefined  | The `change` event handler                                     |
| `onDragStart`                 | func            | No       | undefined  | The `dragstart` event handler                                  |
| `onDrop`                      | func            | No       | undefined  | The `drop` event handler                                       |
| `onFocus`                     | func            | No       | undefined  | The `focus` event handler                                      |
| `onIconClick`                 | func            | No       | undefined  | The event handler when clicking on the `icon`                  |
| `outlined`                    | bool            | No       | false      | Whether to display the outline style field                     |
| `required`                    | bool            | No       | false      | Whether the field is required (HTML5 validation)               |
| `type`                        | string          | No       | text       | The field's type attribute (use `textarea` for a `<textarea>`) |
| `valid`                       | bool            | No       | undefined  | Whether the field is valid or not (manual validation)          |
| `value`                       | string          | No       | undefined  | the value of the field                                         |
