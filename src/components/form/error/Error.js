import React from 'react';

import {} from './Error.css';

const Error = ({ touched, errors, field }) =>
  (touched[field] && errors[field] && <div styleName="error">{errors[field]}</div>) || false; /**/

export default Error;
