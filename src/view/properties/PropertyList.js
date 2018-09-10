// @flow
import * as React from 'react';
import Editable from '../../components/complex/editable/Editable';
import PropertyItemEditable from './PropertyItemEditable';
import PropertyItemPreview from './PropertyItemPreview';
import ButtonBar from '../../components/common/buttonbar';
import Map from '../../components/complex/map';

import type { PropertiesContextProps } from '../../providers/Properties';
import type { Property } from '../../model/Property';

import {} from './PropertyList.css';

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

type PropertyListState = {
  isRestricted: boolean,
};

class PropertyList extends React.PureComponent<PropertiesContextProps, PropertyListState> {
  state = {
    isRestricted: false,
  };

  componentDidMount() {
    this.fetchProperties();
  }

  fetchProperties = async () => {
    this.props.api.fetchAll();
  };

  componentDidUpdate(prevProps: PropertiesContextProps, prevState: PropertyListState) {
    if (prevState.isRestricted !== this.state.isRestricted) {
      if (this.state.isRestricted) {
        this.props.api.fetchByCoordinates();
      } else {
        this.props.api.fetchAll();
      }
    }
  }

  showAll = () => {
    this.setState(() => ({ isRestricted: false }));
  };

  showRestricted = () => {
    this.setState(() => ({ isRestricted: true }));
  };

  renderLoading = () => <div>Loading...</div>;

  renderList = (properties: Property[]) =>
    properties.length > 0 ? (
      properties.map((property: Property) => <PropertyItem property={property} key={property.airbnbId} />)
    ) : (
      <h2>No properties were found.</h2>
    );

  getRestrictedCoordinates = () => {
    const coordinatesString = process.env.RESTRICT_COORDINATES;
    const [latitude, longitude] = coordinatesString.split(' ');
    return { latitude, longitude };
  };

  render() {
    const { isLoading, properties } = this.props;
    const { isRestricted } = this.state;
    const navigationButtons = [
      { label: 'Show all', action: this.showAll },
      { label: 'Show near', action: this.showRestricted },
    ];

    return (
      <div styleName="wrapper">
        <Map center={this.getRestrictedCoordinates()} properties={properties} isRestricted={isRestricted} />
        <ButtonBar buttons={navigationButtons} />
        <h2>Properties found ({properties.length})</h2>
        <hr />
        {isLoading ? this.renderLoading() : this.renderList(properties)}
      </div>
    );
  }
}

export default PropertyList;
