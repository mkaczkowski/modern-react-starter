// @flow
/**
 * Section wrapper for switching between preview and editable form using data context
 */
import React from 'react';
import { PropertiesContext } from '../../../providers/Properties';
import type { Property } from '../../../model/Property';

export type EditableItemProps = {
  children: any,
  property?: Property,
};

export type EditableItemState = {|
  isEdited: boolean,
|};

class Editable extends React.PureComponent<EditableItemProps, EditableItemState> {
  state = {
    isEdited: false,
  };

  onShowEdit = () => this.setState(() => ({ isEdited: true }));

  onHideEdit = () => this.setState(() => ({ isEdited: false }));

  render() {
    const { isEdited } = this.state;
    const enchantSuccessCallback = params => () => params.onSuccess(this.onHideEdit);
    return (
      <PropertiesContext.Consumer>
        {context => {
          const combinedProps = context && {
            ...this.props,
            properties: context.properties,
            onShowEdit: this.onShowEdit,
            onCancel: this.onHideEdit,
            onUpdate: params => context.api.update({ ...params, onSuccess: enchantSuccessCallback(params) }),
            isEdited,
          };
          return this.props.children(combinedProps);
        }}
      </PropertiesContext.Consumer>
    );
  }
}

export default Editable;
