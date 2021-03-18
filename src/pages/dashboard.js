import React from 'react'
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"

function Map(){
    return(
        <GoogleMap
            defaultZoom={18}
            defaultCenter={{lat:-22.328474 , lgn:24.684866}}/>
    );
}

const WrappedMap= withScriptjs(withGoogleMap(Map));

const dashboard = () => {
  return (
    <div className="map-container">
       <WrappedMap
           //googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
           googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBhdv6C6ZtgNOvTsdmkAAZicXHTqSdqAoU"
           loadingElement={<div style={{ height: `100%` }} />}
           containerElement={<div style={{ height: `100%` }} />}
           mapElement={<div style={{ height: `100%` }} />}
       />
    </div>
  )
}

export default dashboard
