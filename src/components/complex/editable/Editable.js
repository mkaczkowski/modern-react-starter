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
    isEdited: this.props.property.airbnbId === -1,
  };

  onShowEdit = () => this.setState(() => ({ isEdited: true }));

  onHideEdit = () => this.setState(() => ({ isEdited: false }));

  render() {
    const { isEdited } = this.state;
    return (
      <PropertiesContext.Consumer>
        {context => {
          const combinedProps = context && {
            ...this.props,
            properties: context.properties,
            onShowEdit: this.onShowEdit,
            onCancel: params => this.onHideEdit({ ...params, context }),
            onUpdate: params => context.update({ ...params, callback: this.onHideEdit }),
            isEdited,
          };
          return this.props.children(combinedProps);
        }}
      </PropertiesContext.Consumer>
    );
  }
}

export default Editable;
