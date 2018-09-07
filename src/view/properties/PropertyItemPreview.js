// @flow
import React from 'react';
import Hover from '../../components/common/hover/Hover';
import ActionButtons from '../../components/complex/actionButtons/ActionButtons';
import type { PropertiesContextProps } from '../../providers/Properties';
import type { PropertyItemProps } from './PropertyList';
import type { ActionButtonsType } from '../../components/complex/actionButtons/ActionButtons';

import {} from './PropertyItemPreview.css';

export type PropertyItemPreviewProps = PropertyItemProps & PropertiesContextProps & ActionButtonsType;

const PropertyItemPreview = ({
  property: { airbnbId, owner, numberOfBedrooms },
  defaultItem,
  ...actionProps
}: PropertyItemPreviewProps) => (
  <Hover>
    {isHovered => (
      <div styleName="wrapper">
        <div styleName="header">
          {owner} : <i>{airbnbId}</i>
        </div>
        <div>{numberOfBedrooms}</div>
        {isHovered && <ActionButtons edit airbnbId={airbnbId} defaultItem={defaultItem} {...actionProps} />}
      </div>
    )}
  </Hover>
);

export default PropertyItemPreview;
