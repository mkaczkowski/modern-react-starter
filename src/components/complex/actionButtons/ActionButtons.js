// @flow
/**
 * Configurable action buttons toolbox with access to data context
 */
import React from 'react';
import { Icon } from 'react-icons-kit';
import { edit } from 'react-icons-kit/feather/edit';
import ReactTooltip from 'react-tooltip';
import Button from '../../common/button/Button';

import type { PropertiesContextProps } from '../../../providers/Properties';

import {} from './ActionButtons.css';

export type ActionButtonsType = PropertiesContextProps & {
  airbnbId?: number,
  edit?: boolean,
  onShowEdit: () => void,
  onCancel: (params: any) => void,
  defaultItem?: Object,
};

const ActionButtons = (props: ActionButtonsType) => (
  <div styleName="wrapper">
    <div className="group gap">
      <Button type="button" data-tip="Edit" onClick={props.onShowEdit}>
        <Icon icon={edit} />
      </Button>
    </div>
    <ReactTooltip effect="solid" delayShow={300} />
  </div>
);

export default ActionButtons;
