// @flow
/**
 * Properties Context responsible for storing and passing properties together with public methods to manage it
 */
import * as React from 'react';
import _findIndex from 'lodash/findIndex';
import updateImmutable from 'immutability-helper';
import * as PropertyApi from '../api/property';
import type { Property } from '../model/Property';
import type { GetPropertiesAPI, UpdatePropertyAPI } from '../api/property';

export type PropertiesProviderState = { isLoading: boolean, properties: Property[] };

type PropertiesProviderProps = {
  children: any,
};

export type ActionType = {
  values?: Property,
  onSuccess: () => void,
  onError: (err: any) => void,
};

export type PropertiesContextProps = {
  +isLoading: boolean,
  +properties: Property[],
  api: {
    +update: (params: ActionType) => Promise<any>,
    +fetchAll: () => Promise<any>,
    +fetchByCoordinates: () => Promise<any>,
  },
};

//$FlowIssue
export const PropertiesContext = React.createContext();

class PropertiesProvider extends React.Component<PropertiesProviderProps, PropertiesProviderState> {
  state = {
    isLoading: true,
    properties: [],
  };

  fetch = async (query?: GetPropertiesAPI) => {
    this.setState(() => ({ properties: [], isLoading: true }));
    const properties = await PropertyApi.getProperties(query);
    this.setState(() => ({ properties, isLoading: false }));
  };

  fetchAll = async () => this.fetch();

  fetchByCoordinates = async () => {
    // read coordinates from env variables
    const coordinatesString = process.env.RESTRICT_COORDINATES;
    const [latitude, longitude] = coordinatesString.split(' ');
    const data: GetPropertiesAPI = {
      latitude,
      longitude,
    };
    return this.fetch(data);
  };

  update = async ({ values, onSuccess, onError }: ActionType) => {
    const data: UpdatePropertyAPI = {
      property: values,
    };
    try {
      const updatedProperty = await PropertyApi.updateProperty(data);
      this.refreshUpdatedProperty(updatedProperty);
      onSuccess();
    } catch (err) {
      debugger;
      onError(err);
    }
  };

  refreshUpdatedProperty = (property: Property) => {
    const itemIndex = _findIndex(this.state.properties, { airbnbId: property.airbnbId });
    this.setState(state => ({ properties: updateImmutable(state.properties, { [itemIndex]: { $set: property } }) }));
  };

  render() {
    //context properties available from all subscribed consumers
    const value: PropertiesContextProps = {
      isLoading: this.state.isLoading,
      properties: this.state.properties,
      api: {
        fetchAll: this.fetchAll,
        fetchByCoordinates: this.fetchByCoordinates,
        update: this.update,
      },
    };
    //prettier-ignore
    return (
      <PropertiesContext.Provider value={value}>
        {this.props.children}
      </PropertiesContext.Provider>
    );
  }
}

export default PropertiesProvider;
