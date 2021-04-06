import React, {useEffect, useState} from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import AppDrawer from "../components/AppDrawer";
import {CssBaseline} from "@material-ui/core";
import {styles} from '../css/CustomStyles'
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";


function Map() {
    const [currentPosition, setCurrentPosition] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: -22.5947, lng: 27.1239}}
        >
            {
                currentPosition.lat &&
                (
                    <Marker position={currentPosition}/>
                )
            }

        </GoogleMap>
    );
}


const Dashboard = (props) => {

    const {classes} = props

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppDrawer/>
            <div className="map-container">
                <WrappedMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBhdv6C6ZtgNOvTsdmkAAZicXHTqSdqAoU"
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `100%`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                >

                </WrappedMap>
          </div>
      </div>
  )
}

export default withRouter(withStyles(styles)(Dashboard))
