import React from 'react'
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps"
import AppDrawer from "../components/AppDrawer";
import {CssBaseline} from "@material-ui/core";
import {styles} from '../css/CustomStyles'
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";


function Map(){
    return(
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: -22.556160, lng: 27.130541}}/>
    );
}

const WrappedMap= withScriptjs(withGoogleMap(Map));

const dashboard = (props) => {
    const { classes } = props
  return (
      <div className="root">
          <CssBaseline/>
          <AppDrawer/>
          <div className="map-container">
              <WrappedMap
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBhdv6C6ZtgNOvTsdmkAAZicXHTqSdqAoU"
                  loadingElement={<div style={{height: `100%`}}/>}
                  containerElement={<div style={{height: `100%`}}/>}
                  mapElement={<div style={{height: `100%`}}/>}
              />
          </div>
      </div>
  )
}

export default withRouter(withStyles(styles)(dashboard))
