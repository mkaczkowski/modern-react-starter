// @flow
/**
 * Section wrapper for switching between preview and editable form using data context
 */
import React, { Component } from 'react';
import _isEqual from 'lodash/isEqual';

import type { Property } from '../../../model/Property';

import './Map.css';

export type MapProps = {
  isRestricted: Property[],
  properties: Property[],
  center: {
    latitude: string,
    longitude: string,
  },
};

const googleMaps = window.google.maps;

class Map extends Component<MapProps> {
  //$FlowIssue
  mapRef = React.createRef();
  map: any;
  centerPoint: any;
  infoWindow: any;
  circle: any;
  markers = [];

  componentDidMount() {
    this.initialize();
  }

  shouldComponentUpdate(nextProps: MapProps) {
    return !_isEqual(nextProps.properties, this.props.properties) || nextProps.isRestricted !== this.props.isRestricted;
  }

  componentDidUpdate(prevProps: MapProps) {
    if ((!prevProps.properties && this.props.properties) || !_isEqual(prevProps.properties, this.props.properties)) {
      this.clearMarkers();
      this.props.properties.map(this.drawMarkerForProperty);
    }

    if (prevProps.isRestricted !== this.props.isRestricted) {
      if (this.props.isRestricted) {
        this.drawCircle();
      } else {
        this.removeCircle();
      }
    }
  }

  initialize = () => {
    const { latitude, longitude } = this.props.center;
    this.centerPoint = new googleMaps.LatLng(parseFloat(latitude), parseFloat(longitude));

    const mapOptions = {
      center: this.centerPoint,
      zoom: 9,
      mapTypeId: googleMaps.MapTypeId.ROADMAP,
    };

    const htmlElement = this.mapRef.current;
    this.map = new googleMaps.Map(htmlElement, mapOptions);
    this.infoWindow = new googleMaps.InfoWindow();
  };

  drawMarkerForProperty = (property: Property) => {
    const icon = {
      //TODO replace with our own image/svg
      // eslint-disable-next-line quotes,max-len
      url: 'https://images.vexels.com/media/users/3/142675/isolated/preview/84e468a8fff79b66406ef13d3b8653e2-house-location-marker-icon-by-vexels.png',
      anchor: new googleMaps.Point(25, 50),
      scaledSize: new googleMaps.Size(50, 50),
      optimized: false,
    };

    const [latitude, longitude] = property.location;
    const point = new googleMaps.LatLng(parseFloat(latitude), parseFloat(longitude));
    const marker = new googleMaps.Marker({
      position: point,
      map: this.map,
      draggable: false,
      icon,
    });

    googleMaps.event.addListener(marker, 'click', () => {
      this.infoWindow.setContent(
        `<p><b>${property.owner}</b><br/>
        ${property.address.line1}<br/>
        ${property.incomeGenerated}£</p>`
      );
      this.infoWindow.open(this.map, marker);
    });

    this.markers.push(marker);
  };

  clearMarkers = () => {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  };

  drawCircle = () => {
    this.circle = new googleMaps.Circle({
      radius: 20000,
      center: this.centerPoint,
      map: this.map,
      fillColor: '#94ff74',
      fillOpacity: 0.3,
      strokeColor: '#94ff74',
      strokeOpacity: 0.6,
    });
  };

  removeCircle = () => this.circle && this.circle.setMap(null);

  render() {
    return <div styleName="map" ref={this.mapRef} />;
  }
}

export default Map;
