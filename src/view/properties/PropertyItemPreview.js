// @flow
import React from 'react';
import Hover from '../../components/common/hover/Hover';
import ActionButtons from '../../components/complex/actionButtons/ActionButtons';
import type { PropertiesContextProps } from '../../providers/Properties';
import type { PropertyItemProps } from './PropertyList';
import type { ActionButtonsType } from '../../components/complex/actionButtons/ActionButtons';
import type { Property } from '../../model/Property';

import {} from './PropertyItemPreview.css';

export type PropertyItemPreviewProps = PropertyItemProps & PropertiesContextProps & ActionButtonsType;

const OwnerColumn = ({ property: { owner } }: Property) => <div>{owner}</div>;

const AddressColumn = ({ property: { address } }: Property) => (
  <div>
    <div>{address.line1}</div>
    <div>{address.line2}</div>
    <div>{address.line3}</div>
    <div>{address.line4}</div>
    <div>{address.postCode}</div>
    <div>{address.city}</div>
    <div>{address.country}</div>
  </div>
);

const IncomeColumn = ({ property: { incomeGenerated } }: Property) => <div>{incomeGenerated}</div>;

const PropertyItemPreview = ({ property, api, defaultItem, ...actionProps }: PropertyItemPreviewProps) => (
  <Hover>
    {isHovered => (
      <div styleName="wrapper">
        <div styleName="row">
          <OwnerColumn property={property} />
          <AddressColumn property={property} />
          <IncomeColumn property={property} />
        </div>
        {isHovered && <ActionButtons edit airbnbId={property.airbnbId} defaultItem={defaultItem} {...actionProps} />}
      </div>
    )}
  </Hover>
);

export default PropertyItemPreview;
