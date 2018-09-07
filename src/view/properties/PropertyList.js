// @flow
import * as React from 'react';
import Editable from '../../components/complex/editable/Editable';
import PropertyItemEditable from './PropertyItemEditable';
import PropertyItemPreview from './PropertyItemPreview';

import type { PropertiesContextProps } from '../../providers/Properties';
import type { Property } from '../../model/Property';

export type PropertyItemProps = {
  property: Property,
};

const PropertyItem = (props: PropertyItemProps) => (
  <Editable {...props}>
    {({ isEdited, ...restProps }) =>
      //prettier-ignore
      isEdited ?
        <PropertyItemEditable {...restProps} /> :
        <PropertyItemPreview {...restProps} />
    }
  </Editable>
);

const PropertyList = ({ properties, ...restProps }: PropertiesContextProps) => (
  <div>
    <h4>Properties found ({properties.length})</h4>
    <hr />
    {properties.length > 0 ? (
      properties.map((property: Property) => <PropertyItem property={property} {...restProps} />)
    ) : (
      <h2>No properties were found for a selected locaton. Please try with another location.</h2>
    )}
  </div>
);

export default PropertyList;
