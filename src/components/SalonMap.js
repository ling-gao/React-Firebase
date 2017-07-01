import React, { Component, PropTypes } from 'react'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'
import SearchBox from 'react-google-maps/lib/places/SearchBox'
import Script from 'react-load-script'

const mapCenter = {
  lat: 34.0522342,
  lng: -118.2436849
}

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={mapCenter}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      ref={props.onSearchBoxMounted}
      inputPlaceholder={'Enter address'}
      inputStyle={styles.inputStyle}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
))

export default class SalonMap extends Component {
  constructor (props) {
    super (props)

    this.state = {
      bounds: null,
      center: mapCenter,
      markers: [],
      googleLoaded: false
    }

    if (this.props.location) {
      // console.log('Add salon map location', this.props.location)
      this.state.center = {
        lat: parseFloat(this.props.location.lat),
        lng: parseFloat(this.props.location.lng)
      }
      this.state.markers.push({
        position: this.state.center,
        address: this.props.location.address
      })
    }

    this.handleBoundsChanged = this.handleBoundsChanged.bind(this)
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this)
    this.google = window.google
  }

  findAreaZipCode (ga) {
    let area = ''
    let zipcode = ''
    if (ga) {
      for (const a of ga) {
        if (a.types[0] === 'postal_code') {
          zipcode = a.long_name
        } else if (a.types[0] === 'locality' && a.types[1] === 'political') {
          area = a.long_name
        }
      }
    }
    return {
      area,
      zipcode
    }
  }

  onButton () {
    const { center } = this.state
    console.log('center', center)
    const location = {
      lat: center.lat,
      lng: center.lng
    }
    console.log('location', location)
    this.geocoder.geocode({'location': location}, (results, status) => {
      // console.log('geocoder results', results, 'status', status)
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


  handleBoundsChanged () {
    console.log('handleBoundsChanged')
    this.setState({
      bounds: this.map.getBounds(),
      center: this.map.getCenter()
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

  handlePlacesChanged () {
    const places = this._searchBox.getPlaces()
    const markers = []
    console.log('places', places)

    // Add a marker for each place returned from search bar
    for (const place of places) {
      const az = this.findAreaZipCode(place.address_components)
      console.log('area zip code res', az)
      // console.log(place.geometry.location.lat(), place.geometry.location.lng())
      markers.push({
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        address: place.formatted_address,
        az
      })
    }
    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center

    this.setState({
      center: mapCenter,
      markers
    })
    this.props.onSelectMarker(markers)
  }

  onMapLoad (map) {
    this.map = map
  }

  handleSearchBoxMounted (searchBox) {
    this._searchBox = searchBox
  }

  renderMap () {
    if (this.state.googleLoaded) {
      return (
        <GettingStartedGoogleMap
          containerElement={<div style={styles.container} />}
          mapElement={<div style={styles.mapElement} />}
          markers={this.state.markers}
          onBoundsChanged={this.handleBoundsChanged.bind(this)}
          onMapLoad={this.onMapLoad.bind(this)}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged.bind(this)}
          onSearchBoxMounted={this.handleSearchBoxMounted.bind(this)}
        />
      )
    } else {
      return <div />
    }
  }

  render () {
    return (
      <div style={styles.conatiner}>
        <Script
          url={'https://maps.googleapis.com/maps/api/js?v=3&libraries=places,geometry'}
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
    float: 'left',
    width: '512px',
    height: '384px',
    marginLeft: '10px'
  },
  inputStyle: {
    border: '1px solid transparent',
    borderRadius: '1px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    fontSize: '14px',
    height: '32px',
    marginTop: '10px',
    marginLeft: '28px',
    outline: 'none',
    paddingLeft: '12px',
    textOverflow: 'ellipses',
    width: '360px'
  },
  mapElement: {
    border: '1px solid white',
    height: '100%'
  }
}

SalonMap.propTypes = {
  onSelectMarker: PropTypes.func,
  location: PropTypes.object
}

