// @flow
import * as React from 'react';
import { Formik } from 'formik';
import Error from '../../components/form/error/Error';
import FormButtons from '../../components/form/formButtons/FormButtons';
import DisplayFormikState from '../../components/form/helpers/DisplayFormikState';
import type { PropertiesContextProps } from '../../providers/Properties';
import type { PropertyItemProps } from './PropertyList';

import './PropertyItemEditable.css';

const inputs = [
  { title: 'Owner', name: 'owner', required: true },
  { title: 'Address (1)', name: 'line1', required: true },
  { title: 'Address (2)', name: 'line2', required: false },
  { title: 'Address (3)', name: 'line3', required: false },
  { title: 'Address (4)', name: 'line4', required: true },
  { title: 'City', name: 'city', required: true },
  { title: 'Post Code', name: 'postCode', required: true },
  { title: 'Country', name: 'country', required: true },
  { title: 'Income Generated', name: 'incomeGenerated', required: true, isNumber: true },
];

const renderField = ({ title, required, name }, { values, errors, touched, handleBlur, handleChange }) => (
  <div key={name}>
    <label htmlFor={name}>
      {title} {required && <span styleName="required">*</span>}
    </label>
    <input
      id={name}
      name={name}
      placeholder={title}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[name]}
    />
    <Error field={name} touched={touched} errors={errors} />
  </div>
);

const PropertyItemEditable = (props: PropertyItemProps & PropertiesContextProps) => {
  const { property, ...actionProps } = props;
  return (
    <div styleName="box">
      <h3>Edit #{property.airbnbId}</h3>
      <Formik
        initialValues={{ ...property }}
        validate={values => {
          const errors = {};
          inputs.forEach(({ name, required }) => {
            if (required && !values[name]) errors[name] = 'Field is required';
          });
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const onSuccess = extraCallback => {
            setSubmitting(false);
            if (extraCallback) extraCallback();
          };
          const onError = () => {
            setSubmitting(false);
          };
          setSubmitting(true);
          actionProps.onUpdate({ property, values, onSuccess, onError });
        }}
        render={formProps => {
          const { handleSubmit } = formProps;
          const { onCancel } = actionProps;
          return (
            <form onSubmit={handleSubmit}>
              {inputs.map(input => renderField(input, formProps))}
              <div styleName="field" className="group-item">
                <FormButtons {...formProps} onCancel={onCancel} />
              </div>
              <DisplayFormikState {...formProps} debug={true} />
            </form>
          );
        }}
      />
    </div>
  );
};

export default PropertyItemEditable;
