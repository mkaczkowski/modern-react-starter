// @flow
import React from 'react';
import { Formik } from 'formik';
import Error from '../../components/form/error/Error';
import FormButtons from '../../components/form/formButtons/FormButtons';
import type { PropertiesContextProps } from '../../providers/Properties';
import type { PropertyItemProps } from './PropertyList';

import {} from './PropertyItemEditable.css';

const PropertyItemEditable = (props: PropertyItemProps & PropertiesContextProps) => {
  const { property, ...actionProps } = props;
  return (
    <div styleName="box">
      <Formik
        initialValues={{ ...property }}
        onSubmit={values => actionProps.onUpdate({ property, values })}
        validate={values => {
          const errors = {};
          if (!values.owner) errors.owner = 'Field is required';
          return errors;
        }}
        render={({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div styleName="field" className="group-item">
              <label styleName="label" htmlFor="owner">
                Owner *
              </label>
              <input
                styleName="input"
                id="owner"
                name="owner"
                placeholder="Owner"
                onChange={handleChange}
                value={values.owner}
              />
              <Error field="owner" touched={touched} errors={errors} />
            </div>
            <div styleName="field" className="group-item">
              <label styleName="label" htmlFor="numberOfBedrooms">
                Number Of Bedrooms
              </label>
              <select
                styleName="input"
                id="numberOfBedrooms"
                name="numberOfBedrooms"
                placeholder="Number of Bedrooms"
                onChange={handleChange}
                value={values.numberOfBedrooms}
              >
                <option value="" disabled>
                  Number of Bedrooms
                </option>
                {Array.from({ length: 5 }).map(value => (
                  <option key={value}>{value}</option>
                ))}
              </select>
              <Error field="numberOfBedrooms" touched={touched} errors={errors} />
            </div>
            <div styleName="field" className="group-item">
              <FormButtons {...actionProps} id={values.airbnbId} />
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default PropertyItemEditable;
