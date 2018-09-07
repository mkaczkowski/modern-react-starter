// @flow
import React from 'react';
import Button from '../../common/button/Button';
import type { ActionButtonsType } from '../../complex/actionButtons/ActionButtons';
import {} from './FormButtons.css';

export type FormButtonsType = ActionButtonsType & {
  isSubmitting: boolean,
};

const FormButtons = ({ airbnbId, isSubmitting, onCancel }: FormButtonsType) => (
  <div styleName="wrapper">
    <div className="group gap">
      <Button type="button" disabled={isSubmitting} onClick={() => onCancel({ airbnbId })}>
        Cancel
      </Button>
      <Button type="submit" primary disabled={isSubmitting}>
        Save
      </Button>
    </div>
  </div>
);

export default FormButtons;
