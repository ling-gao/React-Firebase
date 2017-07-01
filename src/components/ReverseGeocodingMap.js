import React, { Component, PropTypes } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import Script from 'react-load-script'
import { Button } from 'antd'

import markerImage from '../assets/mapMarker.png'

const mapCenter = {
  lat: 34.0522342,
  lng: -118.2436849
}

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={mapCenter}
    //  onClick={props.onMapClick}
    onBoundsChanged={props.onBoundsChanged}
  >
    <img src={markerImage} style={styles.markerImage} />
    <Button
      onClick={props.setAddress}
      style={styles.setAddressButton}
      type={'primary'}
      size={'large'}
    >
      Select this location
    </Button>
  </GoogleMap>
))

class ReverseGeocodingMap extends Component {

  constructor (props) {
    super(props)
    this.state = {
      center: mapCenter,
      googleLoaded: false
    }
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this)
  }

  handleBoundsChanged () {
    const center = this.map.getCenter()
    this.setState({
      center: {
        lat: center.lat(),
        lng: center.lng()
      }
    })
  }

  handleScriptCreate () {
    // console.log('handleScriptCreate')
  }

  handleScriptLoad () {
    // console.log('handleScriptLoad')
    this.google = window.google
    this.geocoder = new this.google.maps.Geocoder()
    this.setState({
      googleLoaded: true
    })
  }

  handleScriptError (e) {
    // console.log('handleScriptError', e)
  }

  onMapLoad (map) {
    // console.log('onMapLoad', map)
    this.map = map
  }

  setAddress () {
    // console.log('setAddress', this.state.center)
    this.geocoder.geocode({'location': this.state.center}, (results, status) => {
      if (status === 'OK') {
        // console.log('geocode results', results)
        if (results[0]) {
          // console.log('address', results[0].formatted_address)
          const res = {
            address: results[0].formatted_address,
            lat: this.state.center.lat,
            lng: this.state.center.lng
          }
          this.props.onSetAddress(res)
        } else {
          console.log('No results found')
        }
      } else {
        console.log('Geocoder failed due to: ' + status)
      }
    })
  }

  renderMap () {
    if (this.state.googleLoaded) {
      return (
        <GettingStartedGoogleMap
          containerElement={<div style={styles.containerElement} />}
          mapElement={<div style={styles.mapElement} />}
          markers={[]}
          onBoundsChanged={this.handleBoundsChanged.bind(this)}
          onMapLoad={this.onMapLoad.bind(this)}
          setAddress={this.setAddress.bind(this)}
        />
      )
    } else {
      return <div>Loading</div>
    }
  }

  render () {
    return (
      <div style={styles.conatiner}>
        <Script
          url={'https://maps.googleapis.com/maps/api/js'}
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        {this.renderMap()}

      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
  },
  containerElement: {
    width: 600,
    height: 600,
    position: 'relative',
  },
  mapElement: {
    border: '1px solid white',
    borderRadius: '20px',
    height: '100%'
  },
  markerImage: {
    position: 'absolute',
    top: 250,
    left: 275,
    width: 50,
    height: 50
  },
  setAddressButton: {
    position: 'absolute',
    top: 610,
    left: 200
  }
}

ReverseGeocodingMap.propTypes = {
  onSetAddress: PropTypes.func.isRequired
}

export default ReverseGeocodingMap
