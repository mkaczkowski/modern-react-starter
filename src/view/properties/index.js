import React from 'react';
import { PropertiesContext } from '../../providers/Properties';
import PropertyList from './PropertyList';

//prettier-ignore
export default () => (
  <PropertiesContext.Consumer>
    { context => <PropertyList {...context} />}
  </PropertiesContext.Consumer>
);
