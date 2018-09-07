// @flow
/**
 * Properties Context responsible for storing and passing properties together with public methods to manage it
 */
import * as React from 'react';
import _findIndex from 'lodash/findIndex';
import update from 'immutability-helper';
import type { Property } from '../model/Property';

export type PropertiesProviderState = {
  properties: Property[],
};

type PropertiesProviderProps = {
  children: any,
};

export type ActionType = {
  values?: any,
  airbnbId: number,
  callback?: any,
};

export type PropertiesContextProps = {
  +properties: Property[],
  +update: (params: ActionType) => void,
};

const DEFAULT_DATA: Property[] = [
  {
    owner: 'carlos',
    address: {
      line1: 'Flat 5',
      line4: '7 Westbourne Terrace',
      postCode: 'W2 3UL',
      city: 'London',
      country: 'U.K.',
    },
    airbnbId: 3512500,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    incomeGenerated: 2000.34,
  },
  {
    owner: 'ankur',
    address: {
      line1: '4',
      line2: 'Tower Mansions',
      line3: 'Off Station road',
      line4: '86-87 Grange Road',
      postCode: 'SE1 3BW',
      city: 'London',
      country: 'U.K.',
    },
    airbnbId: 1334159,
    numberOfBedrooms: 3,
    numberOfBathrooms: 1,
    incomeGenerated: 10000,
  },
  {
    owner: 'elaine',
    address: {
      line1: '4',
      line2: '332b',
      line4: 'Goswell Road',
      postCode: 'EC1V 7LQ',
      city: 'London',
      country: 'U.K.',
    },
    airbnbId: 12220057,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    incomeGenerated: 1200,
  },
];

//$FlowIssue
export const PropertiesContext = React.createContext();

class PropertiesProvider extends React.Component<PropertiesProviderProps, PropertiesProviderState> {
  state = {
    properties: [],
  };

  componentDidMount() {
    this.setState({ properties: DEFAULT_DATA });
  }

  /**
   * Save properties to storage
   * @param properties
   * @param callback
   */
  persistProperties = (properties: Property[], callback?: () => void) => {
    this.setState(() => ({ properties }), callback);
    // Storage.save(properties);
  };

  /**
   * Update properties entry
   * @param itemId
   * @param values
   * @param callback
   */
  update = ({ airbnbId, values, callback }: ActionType) => {
    let resultProperties;
    if (airbnbId !== undefined) {
      resultProperties = this.updateItem({ airbnbId, values });
    } else {
      resultProperties = this.updateSection({ values });
    }

    this.persistProperties(resultProperties, callback);
  };

  updateItem = ({ airbnbId, values }: Object) => {
    const itemIndex = this.findItemIndex(airbnbId);
    const id = airbnbId === -1 ? Math.floor(Math.random() * 100000) : airbnbId;
    const newItem = { ...values, id };
    return update(this.state.properties, { [itemIndex]: { $set: newItem } });
  };

  updateSection = ({ values }: Object) => update(this.state.properties, { $merge: { ...values } });

  /**
   * Utils
   */
  findItemIndex = (airbnbId: number) => _findIndex(this.state.properties, { airbnbId });

  render() {
    //context properties available from all subscribed consumers
    const value: PropertiesContextProps = {
      properties: this.state.properties,
      update: this.update,
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
